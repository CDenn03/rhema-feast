import { NextResponse } from "next/server";
import { getMockDashboardEvents } from "@/features/events/mock";

export async function GET() {
  const result = await getMockDashboardEvents();
  return NextResponse.json(result);
}
