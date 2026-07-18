import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { verifyAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    const filter: Record<string, unknown> = {};
    if (featured === "true") {
      filter.featured = true;
    }

    const testimonials = await Testimonial.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ data: testimonials }, { status: 200 });
  } catch (error) {
    console.error("Testimonials fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
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
    const { name, role, company, content, avatar, rating, featured } = body;

    if (!name || !content) {
      return NextResponse.json(
        { error: "Name and content are required" },
        { status: 400 }
      );
    }

    const testimonial = await Testimonial.create({
      name,
      role,
      company,
      content,
      avatar,
      rating,
      featured: featured || false,
    });

    return NextResponse.json(
      { message: "Testimonial created successfully", data: testimonial },
      { status: 201 }
    );
  } catch (error) {
    console.error("Testimonial creation error:", error);
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    );
  }
}
