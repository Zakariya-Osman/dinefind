import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Restaurant from "@/lib/Restaurant";

export async function GET(request: Request) {
  await dbConnect();

  const url = new URL(request.url);
  const cost = url.searchParams.get("cost"); // like: "1,2,3"
  const q = url.searchParams.get("q"); // search by name

  const filter: any = {};

  if (cost) {
    filter.costTier = { $in: cost.split(",").map(Number) };
  }

  if (q) {
    filter.name = { $regex: q, $options: "i" };
  }

  const restaurants = await Restaurant.find(filter);
  return NextResponse.json(restaurants);
}
