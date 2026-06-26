import { NextResponse } from "next/server";
import { getMockSeries } from "@/features/events/mock";

export async function GET() {
  const series = await getMockSeries();
  return NextResponse.json({ data: series });
}
