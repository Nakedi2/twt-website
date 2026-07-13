import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";
import { verifyAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const authUser = await verifyAuth(request);
    if (!authUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const subscribers = await Subscriber.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ data: subscribers }, { status: 200 });
  } catch (error) {
    console.error("Subscribers fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}
