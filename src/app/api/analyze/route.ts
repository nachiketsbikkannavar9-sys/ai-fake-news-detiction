import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, type } = body;

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Expanded dummy AI analysis logic based on keywords
    const lowerContent = content.toLowerCase();
    
    // List of suspicious keywords for the mock demo
    const fakeKeywords = [
      "alien", "secret cure", "shocking truth", "miracle", "hoax", 
      "illuminati", "flat earth", "gravity", "drifting", "anomaly", 
      "microchip", "5g", "lizard", "unbelievable", "mind control",
      "reptilian", "fake", "conspiracy", "cern", "hollow earth",
      "time travel", "teleport", "perpetual motion"
    ];

    const isFake = fakeKeywords.some(keyword => lowerContent.includes(keyword));

    if (isFake) {
      // Generate randomized "fake" scores
      const baseFakeScore = Math.floor(Math.random() * 25) + 10; // 10 to 34
      return NextResponse.json({
        authenticityScore: baseFakeScore,
        fakeProbability: 100 - baseFakeScore,
        genuineProbability: baseFakeScore,
        sourceCredibilityScore: Math.floor(Math.random() * 20) + 5, // 5 to 24
        verdict: "High Probability of Misinformation",
        explanation: "This article may be misleading because: No trusted sources support the claim, emotional language detected, and statistics appear unverifiable.",
        evidence: [
          { title: "Snopes Fact Check", description: "No evidence found supporting these claims.", url: "#" },
          { title: "Reuters Verification", description: "Source has a history of publishing unverified rumors.", url: "#" }
        ],
        emotionalLanguage: true,
        clickbait: true,
      });
    }

    // Generate randomized "genuine" scores
    const baseGenuineScore = Math.floor(Math.random() * 15) + 82; // 82 to 96
    return NextResponse.json({
      authenticityScore: baseGenuineScore,
      fakeProbability: 100 - baseGenuineScore,
      genuineProbability: baseGenuineScore,
      sourceCredibilityScore: Math.floor(Math.random() * 15) + 80, // 80 to 94
      verdict: "Likely Genuine",
      explanation: "This content aligns with known facts from multiple verified sources. The tone is neutral and informative.",
      evidence: [
        { title: "AP News Match", description: "Similar claims verified by Associated Press.", url: "#" },
        { title: "WHO Database", description: "Statistics align with official WHO records.", url: "#" }
      ],
      emotionalLanguage: false,
      clickbait: false,
    });

  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
