import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import path from "path";
import fs from "fs/promises";

// GET all projects with pagination
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.project.count()
    ]);

    return NextResponse.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("GET projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST new project
export async function POST(req) {
  try {
    const formData = await req.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const githubLink = formData.get("githubLink");
    const liveDemo = formData.get("liveDemo");
    const imageFile = formData.get("image");

    if (!title || !description || !githubLink || !imageFile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert File (Blob) to Buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Create unique file name
    let fileName = `${Date.now()}-${imageFile.name}`;
    fileName = fileName.replace(/\s+/g, '-');
    const filePath = path.join(uploadsDir, fileName);

    // Save file to disk
    await fs.writeFile(filePath, buffer);
    const imageUrl = `/uploads/${fileName}`;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        githubLink,
        liveDemo: liveDemo || null,
        imageUrl,
        imageName: fileName
      },
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 