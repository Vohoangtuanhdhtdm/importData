// const admin = require("firebase-admin");

// const serviceAccount = require("./NodeJS_key.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();

// // --- PHẦN 1: DỮ LIỆU DANH MỤC (CATEGORIES) ---
// const categoriesData = [
//   {
//     id: "Nature",
//     name: "Thiên Nhiên",
//     description: "Âm thanh tự nhiên giúp thư giãn tâm trí",
//     iconName:
//       "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80",
//   },
//   {
//     id: "Anxiety",
//     name: "Giảm Lo Âu",
//     description: "Các bài tập giúp xoa dịu nỗi lo lắng tức thì",
//     iconName:
//       "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=500&q=80",
//   },
//   {
//     id: "Breathing",
//     name: "Tập Thở",
//     description: "Kỹ thuật thở để điều hòa nhịp tim và cảm xúc",
//     iconName:
//       "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80",
//   },
//   {
//     id: "Stories",
//     name: "Truyện Ngủ",
//     description: "Những câu chuyện nhẹ nhàng đưa bạn vào giấc ngủ",
//     iconName:
//       "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=500&q=80",
//   },
//   {
//     id: "Motivation",
//     name: "Động Lực",
//     description: "Nạp năng lượng tích cực cho ngày mới",
//     iconName:
//       "https://images.unsplash.com/photo-1494178270175-e96de2971df9?w=500&q=80",
//   },
//   {
//     id: "Healing",
//     name: "Chữa Lành",
//     description: "Phục hồi tổn thương cảm xúc bên trong",
//     iconName:
//       "https://images.unsplash.com/photo-1515023115689-589c33041697?w=500&q=80",
//   },
//   {
//     id: "Yoga",
//     name: "Yoga & Giãn Cơ",
//     description: "Thư giãn cơ thể để tâm trí nhẹ nhàng hơn",
//     iconName:
//       "https://images.unsplash.com/photo-1544367563-12123d8966cd?w=500&q=80",
//   },
// ];

// // --- PHẦN 2: DỮ LIỆU BÀI HỌC (contents) ---
// const contentsData = [
//   // --- NHÓM TẬP TRUNG ---
//   {
//     title: "Deep Work Flow",
//     author: "Dr. Brain",
//     categoryIds: ["Focus", "Motivation"],
//     description:
//       "Nhạc sóng Alpha giúp duy trì sự tập trung sâu trong công việc.",
//     duration: "45 min",
//     isPremium: true,
//     section: "morning",
//     imageUrl:
//       "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//   },
//   {
//     title: "Coffee Shop Ambience",
//     author: "Urban Sound",
//     categoryIds: ["Focus"],
//     description: "Tiếng ồn trắng tại quán cà phê giúp tăng sáng tạo.",
//     duration: "30 min",
//     isPremium: false,
//     section: "morning",
//     imageUrl:
//       "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
//   },
//   {
//     title: "Morning Boost",
//     author: "Sarah Jones",
//     categoryIds: ["Motivation", "Focus"],
//     description: "Những lời khẳng định tích cực để bắt đầu ngày mới.",
//     duration: "10 min",
//     isPremium: false,
//     section: "morning",
//     imageUrl:
//       "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
//   },
//   {
//     title: "Pomodoro Beats",
//     author: "Lo-fi Studio",
//     categoryIds: ["Focus"],
//     description: "Nhạc Lo-fi nhẹ nhàng cho phiên làm việc 25 phút.",
//     duration: "25 min",
//     isPremium: false,
//     section: "afternoon",
//     imageUrl:
//       "https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
//   },
//   // --- NHÓM GIẤC NGỦ ---
//   {
//     title: "Chuyến Tàu Đêm",
//     author: "Storyteller Mike",
//     categoryIds: ["sleep", "Stories"],
//     description: "Câu chuyện về chuyến tàu xuyên qua dải ngân hà tĩnh lặng.",
//     duration: "20 min",
//     isPremium: true,
//     section: "night",
//     imageUrl:
//       "https://images.unsplash.com/photo-1499578124509-1611b77778c8?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
//   },
//   {
//     title: "Mưa Rào Mùa Hạ",
//     author: "Nature Sounds",
//     categoryIds: ["sleep", "Nature"],
//     description: "Tiếng mưa rơi trên mái hiên đưa bạn vào giấc ngủ sâu.",
//     duration: "60 min",
//     isPremium: false,
//     section: "night",
//     imageUrl:
//       "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
//   },
//   {
//     title: "Khu Rừng Bí Ẩn",
//     author: "Luna Voice",
//     categoryIds: ["Stories", "sleep"],
//     description: "Kể chuyện đêm khuya về khu rừng đom đóm.",
//     duration: "15 min",
//     isPremium: false,
//     section: "night",
//     imageUrl:
//       "https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
//   },
//   {
//     title: "Delta Waves Sleep",
//     author: "Sleep Science",
//     categoryIds: ["sleep"],
//     description: "Sóng âm Delta tần số thấp hỗ trợ giấc ngủ không mộng mị.",
//     duration: "90 min",
//     isPremium: true,
//     section: "night",
//     imageUrl:
//       "https://images.unsplash.com/photo-1541781777265-3958e665880e?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
//   },
//   // --- NHÓM THIỀN & THỞ ---
//   {
//     title: "5 Phút Hít Thở",
//     author: "Guru An",
//     categoryIds: ["Breathing", "Relax"],
//     description: "Bài tập hít thở 4-7-8 giúp bình ổn nhịp tim nhanh chóng.",
//     duration: "5 min",
//     isPremium: false,
//     section: "anytime",
//     imageUrl:
//       "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
//   },
//   {
//     title: "Body Scan Meditation",
//     author: "Mindful Lee",
//     categoryIds: ["Meditation", "Relax"],
//     description: "Thiền quét cơ thể để thả lỏng từng nhóm cơ đang căng cứng.",
//     duration: "15 min",
//     isPremium: true,
//     section: "evening",
//     imageUrl:
//       "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
//   },
//   {
//     title: "Morning Gratitude",
//     author: "Sunrise Yoga",
//     categoryIds: ["Meditation", "Motivation"],
//     description: "Thiền biết ơn để khởi đầu ngày mới hạnh phúc.",
//     duration: "10 min",
//     isPremium: false,
//     section: "morning",
//     imageUrl:
//       "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
//   },
//   {
//     title: "Box Breathing",
//     author: "Tactical Calm",
//     categoryIds: ["Breathing", "Stress"],
//     description:
//       "Kỹ thuật thở hình hộp giúp lấy lại bình tĩnh trong tình huống căng thẳng.",
//     duration: "7 min",
//     isPremium: false,
//     section: "anytime",
//     imageUrl:
//       "https://images.unsplash.com/photo-1527203561188-dae1bc1a417f?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
//   },
//   // --- NHÓM GIẢM LO ÂU ---
//   {
//     title: "Vượt Qua Hoảng Loạn",
//     author: "Dr. Peace",
//     categoryIds: ["Anxiety", "Stress"],
//     description: "Hướng dẫn khẩn cấp khi bạn cảm thấy sắp bị panic attack.",
//     duration: "10 min",
//     isPremium: true,
//     section: "emergency",
//     imageUrl:
//       "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
//   },
//   {
//     title: "Buông Bỏ Suy Nghĩ",
//     author: "Zen Master",
//     categoryIds: ["Stress", "Meditation"],
//     description: "Học cách quan sát suy nghĩ trôi qua như những đám mây.",
//     duration: "12 min",
//     isPremium: false,
//     section: "evening",
//     imageUrl:
//       "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
//   },
//   {
//     title: "Walking in Nature",
//     author: "Forest Soul",
//     categoryIds: ["Relax", "Nature"],
//     description: "Âm thanh bước chân trên lá khô và tiếng chim hót.",
//     duration: "20 min",
//     isPremium: false,
//     section: "afternoon",
//     imageUrl:
//       "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
//   },
//   {
//     title: "Grounding Technique",
//     author: "Psych Safe",
//     categoryIds: ["Anxiety"],
//     description: "Kỹ thuật 5-4-3-2-1 giúp bạn kết nối lại với hiện tại.",
//     duration: "8 min",
//     isPremium: false,
//     section: "anytime",
//     imageUrl:
//       "https://images.unsplash.com/photo-1500699216719-247514d33431?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3",
//   },
//   // --- NHÓM CHỮA LÀNH ---
//   {
//     title: "Inner Child Healing",
//     author: "Soul Care",
//     categoryIds: ["Healing", "Meditation"],
//     description: "Trò chuyện và vỗ về đứa trẻ bên trong bạn.",
//     duration: "18 min",
//     isPremium: true,
//     section: "recommended",
//     imageUrl:
//       "https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
//   },
//   {
//     title: "Yoga Nidra",
//     author: "Yogi Mai",
//     categoryIds: ["Yoga", "sleep"],
//     description: "Giấc ngủ của Yogi - thư giãn sâu không cần ngủ.",
//     duration: "30 min",
//     isPremium: true,
//     section: "evening",
//     imageUrl: "https://images.unsplash.com/photo-1544367563-12123d8966cd?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
//   },
//   {
//     title: "Căng - Duỗi Cơ Vai",
//     author: "Fit Relax",
//     categoryIds: ["Yoga", "Relax"],
//     description: "Bài tập nhẹ nhàng cho dân văn phòng giảm đau mỏi vai gáy.",
//     duration: "10 min",
//     isPremium: false,
//     section: "afternoon",
//     imageUrl:
//       "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
//   },
//   {
//     title: "Self-Compassion",
//     author: "Kristin Neff Fan",
//     categoryIds: ["Healing", "Anxiety"],
//     description: "Học cách từ bi và yêu thương bản thân mình hơn.",
//     duration: "14 min",
//     isPremium: true,
//     section: "recommended",
//     imageUrl:
//       "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
//   },
//   // --- NHÓM NATURE & SOUNDS ---
//   {
//     title: "Ocean Waves",
//     author: "Earth Sounds",
//     categoryIds: ["Nature", "Relax", "sleep"],
//     description: "Sóng biển vỗ rì rào vào bờ cát trắng.",
//     duration: "45 min",
//     isPremium: false,
//     section: "night",
//     imageUrl:
//       "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
//   },
//   {
//     title: "Fireplace Sounds",
//     author: "Cozy Home",
//     categoryIds: ["Nature", "Relax"],
//     description: "Tiếng lửa trại tí tách ấm áp mùa đông.",
//     duration: "60 min",
//     isPremium: false,
//     section: "evening",
//     imageUrl: "https://images.unsplash.com/photo-1542259681-d77c4747ebc7?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
//   },
//   {
//     title: "Thunderstorm",
//     author: "Nature Power",
//     categoryIds: ["Nature", "sleep"],
//     description: "Tiếng sấm rền và mưa lớn từ xa.",
//     duration: "40 min",
//     isPremium: true,
//     section: "night",
//     imageUrl:
//       "https://images.unsplash.com/photo-1429554429301-1c7d5ae2d42e?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
//   },
//   {
//     title: "Singing Bowls",
//     author: "Tibetan Monk",
//     categoryIds: ["Meditation", "Healing"],
//     description: "Chuông xoay Tây Tạng giúp cân bằng năng lượng.",
//     duration: "25 min",
//     isPremium: true,
//     section: "recommended",
//     imageUrl:
//       "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
//   },
//   {
//     title: "Piano & Rain",
//     author: "Melody Rain",
//     categoryIds: ["Relax", "Focus"],
//     description: "Sự kết hợp hoàn hảo giữa piano buồn và mưa.",
//     duration: "35 min",
//     isPremium: false,
//     section: "afternoon",
//     imageUrl:
//       "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=500",
//     audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
//   },
// ];

// // --- HÀM IMPORT DỮ LIỆU ---
// async function importData() {
//   // Firestore Batch chỉ cho phép tối đa 500 thao tác một lần.
//   // Ở đây tổng cộng là 7 + 25 = 32 items, nên dùng 1 batch là đủ.

//   const batch = db.batch();

//   console.log("Đang chuẩn bị import Categories...");

//   // 1. Import Categories
//   categoriesData.forEach((cat) => {
//     // Với Category, ta SET ID cụ thể (ví dụ "Nature") để dễ tham chiếu
//     const docRef = db.collection("categories").doc(cat.id);
//     batch.set(docRef, cat);
//   });

//   console.log("Đang chuẩn bị import contents...");

//   // 2. Import contents
//   contentsData.forEach((audio) => {
//     // Với Audio, ta để Firestore tự sinh ID (dùng .doc() trống)
//     // Lưu ý: Đổi tên collection là "contents" hay "songs" tùy theo code Flutter của bạn
//     const docRef = db.collection("contents").doc();
//     batch.set(docRef, audio);
//   });

//   // 3. Commit lên Server
//   try {
//     await batch.commit();
//     console.log(
//       `✅ THÀNH CÔNG! Đã import ${categoriesData.length} categories và ${contentsData.length} contents.`
//     );
//   } catch (error) {
//     console.error("❌ CÓ LỖI XẢY RA:", error);
//   }
// }

// importData();
