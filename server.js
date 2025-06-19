const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

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

    const imageUrl = response.data.photos[0]?.src?.large;

    if (imageUrl) {
      res.json({ imageUrl });
    } else {
      res.json({
        imageUrl: "https://via.placeholder.com/512x768.png?text=No+Image+Found",
      });
    }
  } catch (err) {
    console.error("❌ Pexels API error:", err.message);
    res.json({
      imageUrl: "https://via.placeholder.com/512x768.png?text=Poster+Error",
    });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
