const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyD5tMiMuV2XXZz6j4l3BNJWChE5fEvBfc8");
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
    const result = await model.generateContent("Say hello");
    console.log("Success:", result.response.text());
  } catch (error) {
    console.error("Error:", error.message);
  }
}

test();
