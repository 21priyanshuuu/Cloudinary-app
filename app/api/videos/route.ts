// app/api/videos/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("Fetching videos...");

    // Fetch videos from the database ordered by creation date
    const videos = await prisma.video.findMany({
      orderBy: { createdAt: "desc" },
    });

    console.log("Videos fetched:", videos);

    if (videos.length === 0) {
      console.log("No videos found.");
      return NextResponse.json({ message: "No videos found" }, { status: 404 });
    }

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json({ error: "Error fetching videos" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
