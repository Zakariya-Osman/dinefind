import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Restaurant from "@/lib/Restaurant";

// POST = Create a restaurant
export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();

  const created = await Restaurant.create({
    name: body.name,
    costTier: body.costTier,
    kidFriendly: body.kidFriendly,
    dietary: body.dietary || [],
  });

  return NextResponse.json(created, { status: 201 });
}

// DELETE = Delete a restaurant by ID
export async function DELETE(req: NextRequest) {
  await dbConnect();

  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  console.log("🗑️ Deleting restaurant with ID:", id);

  if (!id) {
    return NextResponse.json(
      { error: "Missing restaurant ID" },
      { status: 400 }
    );
  }

  const deleted = await Restaurant.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json(
      { error: "Restaurant not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}
