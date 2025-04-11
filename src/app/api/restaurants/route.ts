import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Restaurant from "@/lib/Restaurant";

export async function GET() {
  await dbConnect();
  const restaurants = await Restaurant.find({});
  return NextResponse.json(restaurants);
}
