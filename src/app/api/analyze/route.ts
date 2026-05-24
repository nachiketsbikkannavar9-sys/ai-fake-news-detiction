import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content } = body;

    if (!content || content.trim().length < 15) {
      return NextResponse.json({
        authenticityScore: 50,
        fakeProbability: 50,
        genuineProbability: 50,
        sourceCredibilityScore: 0,
        verdict: "Inconclusive / Too Short",
        explanation: "The provided content is too short to accurately determine its authenticity. Please provide a full article, headline, or detailed claim.",
        evidence: [],
        emotionalLanguage: false,
        clickbait: false,
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_api_key_goes_here") {
      return NextResponse.json(
        { error: "Gemini API Key is missing. Please add it to your .env.local file." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Using gemini-1.5-flash as it's the fastest and highly capable for this analysis
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert AI fact-checker and cybersecurity analyst. Your job is to analyze the following news content/claim and determine if it is fake news, misinformation, misleading, or genuine.
    
Analyze the following text:
"""
${content}
"""

Return ONLY a JSON object exactly matching this structure. Do not use markdown blocks, just the raw JSON string:
{
  "authenticityScore": <number between 0 and 100, where 100 is perfectly genuine and 0 is completely fake>,
  "fakeProbability": <number between 0 and 100>,
  "genuineProbability": <number between 0 and 100>,
  "sourceCredibilityScore": <number between 0 and 100>,
  "verdict": "<Short string like 'High Probability of Misinformation', 'Likely Genuine', 'Mixed / Unverified', etc.>",
  "explanation": "<A clear 2-3 sentence explanation of why this is true or fake based on your knowledge base. Cite real-world facts if applicable.>",
  "evidence": [
    { "title": "<Source or Evidence Name>", "description": "<Brief description of what this source says about the claim>", "url": "#" }
  ],
  "emotionalLanguage": <boolean>,
  "clickbait": <boolean>
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up potential markdown formatting from Gemini response
    const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    try {
      const parsedData = JSON.parse(cleanedText);
      return NextResponse.json(parsedData);
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", cleanedText);
      return NextResponse.json({ error: "AI returned an invalid format. Try again." }, { status: 500 });
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to process request with AI. Check API Key or try again." }, { status: 500 });
  }
}
