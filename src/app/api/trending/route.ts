import { NextResponse } from "next/server";

export async function GET() {
  const trendingReports = [
    {
      id: 1,
      claim: "NASA found evidence of ancient civilization on Mars.",
      status: "Fake",
      score: 15,
      sources: ["Snopes", "Reuters"],
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      category: "Science"
    },
    {
      id: 2,
      claim: "New global health policy restricts international travel starting next week.",
      status: "Misleading",
      score: 45,
      sources: ["WHO", "AP News"],
      timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      category: "Health"
    },
    {
      id: 3,
      claim: "Tech CEO resigns unexpectedly after board meeting.",
      status: "Verified",
      score: 95,
      sources: ["Bloomberg", "TechCrunch"],
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      category: "Business"
    },
    {
      id: 4,
      claim: "Leaked document reveals secret tax plan for middle class.",
      status: "Fake",
      score: 10,
      sources: ["FactCheck.org"],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      category: "Politics"
    }
  ];

  return NextResponse.json(trendingReports);
}
