const axios = require("axios");
require("dotenv").config();

const test = async () => {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: "Say hello in one line" }],
          },
        ],
      }
    );

    console.log(res.data);
  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);
  }
};

test();

// curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent" \
//   -H 'Content-Type: application/json' \
//   -H 'X-goog-api-key: AIzaSyD5WRlmJC2gTH0UJLYmBgBPt-AaesJo3nw' \
//   -X POST \
//   -d '{
//     "contents": [
//       {
//         "parts": [
//           {
//             "text": "Explain how AI works in a few words"
//           }
//         ]
//       }
//     ]
//   }'