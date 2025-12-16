require("dotenv").config();
const express = require("express");
const admin = require("firebase-admin");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
const bodyParser = require("body-parser");

const serviceAccount = require("./NodeJS_key.json");

if (!admin.apps.length) {
  // Kiểm tra xem đã kết nối Firebase chưa, nếu chưa thì kết nối
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

// Kiểm tra API Key có tồn tại không
if (!process.env.Gemini_Api_Key) {
  console.error("LỖI: Chưa cấu hình Gemini_Api_Key trong file .env");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.Gemini_Api_Key);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/create-productivity-protocol", async (req, res) => {
  try {
    const {
      userId,
      workNature, // Tính chất công việc
      bedTime, // Giờ đi ngủ
      wakeUpTime, // Giờ thức dậy
      dietHabit, // Thói quen ăn uống
      activityHabit, // Thói quen vận động
      focusAbility, // Khả năng tập trung (Ví dụ: "Kém", "Tốt", "Chỉ tập trung được 30p")
    } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "Thiếu userId" });
    }

    const prompt = `
      Bạn là chuyên gia về Hiệu suất Bền vững (Sustainable Productivity) và Sức khỏe não bộ.
      Hãy thiết kế một "Giao thức sinh hoạt & làm việc" (Daily Protocol) dài hạn cho người dùng dựa trên dữ liệu sinh học và thói quen của họ.
      
      DỮ LIỆU ĐẦU VÀO:
      - Giờ thức: ${wakeUpTime} | Giờ ngủ: ${bedTime} (Hãy tính toán thời lượng ngủ xem có đủ hồi phục không)
      - Công việc: ${workNature}
      - Khả năng tập trung: ${focusAbility} (Rất quan trọng để chia nhỏ block làm việc)
      - Thói quen ăn: ${dietHabit}
      - Thói quen vận động: ${activityHabit}

      YÊU CẦU ĐẦU RA (JSON Only):
      Hãy tạo ra một bộ quy tắc (Framework) để họ áp dụng hàng ngày nhằm tối đa hóa sự tập trung nhưng không bị kiệt sức (Burnout).
      Cấu trúc JSON bắt buộc:
      {
        "analysis": "Đánh giá ngắn về thói quen hiện tại (Ví dụ: Bạn đang ngủ hơi ít, cần điều chỉnh...)",
        "work_strategy": {
            "method": "Phương pháp làm việc đề xuất (Ví dụ: Pomodoro 25/5 hay Deep Work 90/20)",
            "rationale": "Tại sao phương pháp này hợp với khả năng tập trung '${focusAbility}' của họ"
        },
        "daily_timeline": [ 
            // Lập lịch khung từ lúc thức đến lúc ngủ. KHÔNG cần chi tiết từng phút, mà là các "Block".
            // Type có thể là: "focus_block", "recharge_block", "physical_block", "nutrition_block"
            { "time_range": "07:00 - 08:00", "activity": "...", "type": "physical_block", "note": "..." }
        ],
        "burnout_prevention": [
            "Quy tắc 1 (Dựa trên tính chất công việc)",
            "Quy tắc 2"
        ],
        "nutrition_movement_advice": "Lời khuyên kết hợp ăn uống và vận động dựa trên thói quen cũ"
      }
    `;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.4, // lower temperature for more predictable outputs
        topP: 0.9,
        responseMimeType: "application/json",
      },
    });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // 4. Xử lý JSON (Lọc bỏ markdown)
    const cleanJson = responseText.replace(/```json|```/g, "").trim();
    const protocolData = JSON.parse(cleanJson);

    // 5. Lưu vào Firestore
    // Ta lưu vào collection "user_protocols" vì đây là Giao thức dùng lâu dài
    await db.collection("user_protocols").doc(userId).set({
      protocol: protocolData,
      userProfile: {
        workNature,
        bedTime,
        wakeUpTime,
        dietHabit,
        activityHabit,
        focusAbility,
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      version: 1, // Để sau này có thể cập nhật version 2, 3
    });

    // 6. Trả lời Vapi
    res.json({
      results: [
        {
          toolCallId: req.body.toolCallId,
          result:
            "Đã thiết lập giao thức làm việc hiệu quả thành công. Hãy mở ứng dụng để xem chi tiết.",
        },
      ],
    });
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).send("Lỗi Server xử lý");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server chạy tại port ${PORT}`);
});
