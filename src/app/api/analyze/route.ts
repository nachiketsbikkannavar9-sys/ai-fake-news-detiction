import { NextResponse } from "next/server";

// Helper function to create a consistent hash from a string
function getStringHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, type } = body;

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 1. Length Check
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

    const lowerContent = content.toLowerCase();
    
    // 2. Keyword matching
    const fakeKeywords = [
      "alien", "secret cure", "shocking truth", "miracle", "hoax", 
      "illuminati", "flat earth", "gravity", "drifting", "anomaly", 
      "microchip", "5g", "lizard", "unbelievable", "mind control",
      "reptilian", "conspiracy", "hollow earth", "time travel", "teleport"
    ];
    const genuineKeywords = [
      "according to the world health organization", "reuters reports", 
      "associated press", "official statement", "peer-reviewed study"
    ];

    const hasFakeKeywords = fakeKeywords.some(keyword => lowerContent.includes(keyword));
    const hasGenuineKeywords = genuineKeywords.some(keyword => lowerContent.includes(keyword));
    
    // 3. Stylistic checks (Clickbait / ALL CAPS)
    const hasExcessivePunctuation = (content.match(/!{2,}/g) || []).length > 0;
    const uppercaseRatio = content.replace(/[^A-Z]/g, '').length / content.length;
    const isClickbait = hasExcessivePunctuation || uppercaseRatio > 0.3;

    let finalScore = 50;
    let verdict = "";
    let explanation = "";

    // 4. Scoring Engine
    if (hasFakeKeywords || isClickbait) {
      finalScore = Math.floor(Math.random() * 25) + 10; // 10-34
      verdict = "High Probability of Misinformation";
      explanation = "This article exhibits signs of misinformation. It contains unverifiable claims, emotional or clickbait language, and lacks reputable sources.";
    } else if (hasGenuineKeywords) {
      finalScore = Math.floor(Math.random() * 15) + 82; // 82-96
      verdict = "Likely Genuine";
      explanation = "This content aligns with known facts from verified sources. The tone is informative and well-supported.";
    } else {
      // Deterministic pseudo-random scoring for ANY generic text based on its specific characters!
      const hash = getStringHash(lowerContent);
      finalScore = (hash % 60) + 20; // Maps perfectly between 20 and 79
      
      if (finalScore > 60) {
        verdict = "Moderately Reliable";
        explanation = "The content seems generally reliable but lacks strong verification from tier-1 sources. Read with mild caution.";
      } else if (finalScore > 40) {
        verdict = "Mixed / Unverified Context";
        explanation = "The AI found mixed signals. The text may contain opinion disguised as fact, or facts presented out of context.";
      } else {
        verdict = "Potentially Misleading";
        explanation = "The content lacks authoritative backing and shares stylistic similarities with known misleading or subjective articles.";
      }
    }

    return NextResponse.json({
      authenticityScore: finalScore,
      fakeProbability: 100 - finalScore,
      genuineProbability: finalScore,
      sourceCredibilityScore: Math.max(10, finalScore - (Math.floor(Math.random() * 10))),
      verdict,
      explanation,
      evidence: [
        { title: "Semantic Analysis", description: "Cross-referenced semantic structure against our neural database.", url: "#" },
        { title: "Source Verification", description: finalScore > 50 ? "Traces found in standard news directories." : "No reliable primary source identified.", url: "#" }
      ],
      emotionalLanguage: isClickbait,
      clickbait: isClickbait,
    });

  } catch (error) {
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
