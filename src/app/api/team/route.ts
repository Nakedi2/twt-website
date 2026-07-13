import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";
import { verifyAuth } from "@/lib/auth";

export async function GET() {
  try {
    await connectToDatabase();

    const members = await TeamMember.find({}).sort({ order: 1 }).lean();

    return NextResponse.json({ data: members }, { status: 200 });
  } catch (error) {
    console.error("Team fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = await verifyAuth(request);
    if (!authUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const body = await request.json();
    const { name, role, bio, avatar, email, socialLinks, order } = body;

    if (!name || !role) {
      return NextResponse.json(
        { error: "Name and role are required" },
        { status: 400 }
      );
    }

    const member = await TeamMember.create({
      name,
      role,
      bio,
      avatar,
      email,
      socialLinks,
      order: order || 0,
    });

    return NextResponse.json(
      { message: "Team member added successfully", data: member },
      { status: 201 }
    );
  } catch (error) {
    console.error("Team creation error:", error);
    return NextResponse.json(
      { error: "Failed to add team member" },
      { status: 500 }
    );
  }
}
