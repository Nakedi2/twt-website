import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { verifyAuth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectToDatabase();

    const { slug } = await params;

    const post = await BlogPost.findOne({ slug })
      .populate("author", "name email")
      .lean();

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: post }, { status: 200 });
  } catch (error) {
    console.error("Blog fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authUser = await verifyAuth(request);
    if (!authUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const { slug } = await params;
    const body = await request.json();

    const post = await BlogPost.findOne({ slug });
    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    if (body.slug && body.slug !== slug) {
      const slugExists = await BlogPost.findOne({ slug: body.slug });
      if (slugExists) {
        return NextResponse.json(
          { error: "A post with this slug already exists" },
          { status: 409 }
        );
      }
    }

    if (body.published === true && post.published !== true) {
      body.published = true;
    }

    const updatedPost = await BlogPost.findOneAndUpdate(
      { slug },
      { $set: body },
      { new: true, runValidators: true }
    ).populate("author", "name email");

    return NextResponse.json(
      { message: "Blog post updated successfully", data: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error("Blog update error:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authUser = await verifyAuth(request);
    if (!authUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const { slug } = await params;

    const post = await BlogPost.findOneAndDelete({ slug });
    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Blog post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Blog deletion error:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
