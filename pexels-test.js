// pexels-test.js
const axios = require("axios");
require("dotenv").config();

const prompt = "mystery cinematic neon girl";

async function testPexelsImage() {
  try {
    const response = await axios.get("https://api.pexels.com/v1/search", {
      params: {
        query: prompt,
        per_page: 1,
      },
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
    });

    const photo = response.data.photos[0];
    if (photo) {
      console.log("✅ Image Found:");
      console.log("URL:", photo.src.large);
    } else {
      console.log("❌ No images found for prompt:", prompt);
    }
  } catch (error) {
    console.error("🔥 Error connecting to Pexels:", error.message);
  }
}

testPexelsImage();
