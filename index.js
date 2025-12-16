const express = require("express");
const admin = require("firebase-admin");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
const bodyParser = require("body-parser");

const serviceAccount = require("./NodeJS_key.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}
const db = admin.firestore();

const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");
