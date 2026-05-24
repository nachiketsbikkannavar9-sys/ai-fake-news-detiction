import { NextResponse } from "next/server";

export async function GET() {
  const analyticsData = {
    dailyTrends: [
      { name: "Mon", fake: 4000, real: 2400 },
      { name: "Tue", fake: 3000, real: 1398 },
      { name: "Wed", fake: 2000, real: 9800 },
      { name: "Thu", fake: 2780, real: 3908 },
      { name: "Fri", fake: 1890, real: 4800 },
      { name: "Sat", fake: 2390, real: 3800 },
      { name: "Sun", fake: 3490, real: 4300 },
    ],
    categories: [
      { name: "Politics", value: 400 },
      { name: "Health", value: 300 },
      { name: "Science", value: 300 },
      { name: "Entertainment", value: 200 },
    ]
  };

  return NextResponse.json(analyticsData);
}
