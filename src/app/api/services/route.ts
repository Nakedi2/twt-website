import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Service from "@/models/Service";
import { verifyAuth } from "@/lib/auth";

export async function GET() {
  try {
    await connectToDatabase();

    const services = await Service.find({}).sort({ order: 1 }).lean();

    return NextResponse.json({ data: services }, { status: 200 });
  } catch (error) {
    console.error("Services fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
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
    const { title, description, icon, features, order, isActive } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: "Title and description are required" },
        { status: 400 }
      );
    }

    const service = await Service.create({
      title,
      description,
      icon,
      features,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json(
      { message: "Service created successfully", data: service },
      { status: 201 }
    );
  } catch (error) {
    console.error("Service creation error:", error);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
