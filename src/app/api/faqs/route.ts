import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import FAQ from "@/models/FAQ";
import { verifyAuth } from "@/lib/auth";

export async function GET() {
  try {
    await connectToDatabase();

    const faqs = await FAQ.find({}).sort({ order: 1 }).lean();

    return NextResponse.json({ data: faqs }, { status: 200 });
  } catch (error) {
    console.error("FAQs fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch FAQs" },
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
    const { question, answer, category, order } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required" },
        { status: 400 }
      );
    }

    const faq = await FAQ.create({
      question,
      answer,
      category,
      order: order || 0,
    });

    return NextResponse.json(
      { message: "FAQ created successfully", data: faq },
      { status: 201 }
    );
  } catch (error) {
    console.error("FAQ creation error:", error);
    return NextResponse.json(
      { error: "Failed to create FAQ" },
      { status: 500 }
    );
  }
}
