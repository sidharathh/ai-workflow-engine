const axios = require("axios");

const API_KEY = process.env.GEMINI_API_KEY;

const summarize = async (text) => {
  try {
    return retry(async () => {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Summarize this text in 2-3 lines:\n\n${text}`,
              },
            ],
          },
        ],
      }
    );

    return res.data.candidates[0].content.parts[0].text;
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    throw new Error("AI request failed");
  }
};

const rewrite = async (text) => {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Rewrite this text professionally:\n\n${text}`,
              },
            ],
          },
        ],
      } 
    );

    return res.data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error(err.response?.data || err.message);
    throw new Error("AI request failed");
  }
};

const retry = async (fn, retries = 2) => {
  try {
    return await fn();
  } catch (err) {
    if (retries > 0) {
      console.log("Retrying...");
      return retry(fn, retries - 1);
    }
    throw err;
  }
};

module.exports = {
  summarize,
  rewrite,
};