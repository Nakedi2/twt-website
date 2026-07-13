import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";

export async function GET() {
  try {
    await connectToDatabase();

    const count = await Subscriber.countDocuments({ subscribed: true });

    return NextResponse.json({ subscriberCount: count }, { status: 200 });
  } catch (error) {
    console.error("Newsletter count error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscriber count" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
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

    const existingSubscription = await Subscriber.findOne({ email: email.toLowerCase() });

    if (existingSubscription) {
      if (existingSubscription.subscribed === true) {
        return NextResponse.json(
          { error: "Email is already subscribed" },
          { status: 409 }
        );
      }
      existingSubscription.subscribed = true;
      await existingSubscription.save();
      return NextResponse.json(
        { message: "Successfully resubscribed to newsletter" },
        { status: 200 }
      );
    }

    const subscriber = await Subscriber.create({
      email: email.toLowerCase(),
    });

    return NextResponse.json(
      { message: "Successfully subscribed to newsletter", data: subscriber },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter" },
      { status: 500 }
    );
  }
}
