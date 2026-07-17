import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Application from "@/models/Application";
import { sendApplicationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { name, email, phone, position, coverLetter, cvFileName } = body;

    if (!name || !email || !position || !coverLetter) {
      return NextResponse.json(
        { error: "Name, email, position, and cover letter are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const newApplication = await Application.create({
      name,
      email,
      phone,
      position,
      coverLetter,
      cvFileName,
    });

    try {
      await sendApplicationEmail({
        name,
        email,
        phone,
        position,
        coverLetter,
        cvFileName,
      });
    } catch (emailError) {
      console.error("Failed to send application email:", emailError);
    }

    return NextResponse.json(
      { message: "Application submitted successfully", data: newApplication },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application form error:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}
