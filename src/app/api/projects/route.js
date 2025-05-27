import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { writeFile,mkdir  } from 'fs/promises'
import path from 'path'

export async function POST(req) {
  const contentType = req.headers.get("content-type") || "";
  if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
          { error: "Content-Type must be multipart/form-data" },
          { status: 400 }
        );
    }
    
    try {
        const formData = await req.formData();
        
        const image = formData.get("image");
        const title = formData.get("title");
        const description = formData.get("description");
        const githubLink = formData.get("githubLink");
        const liveDemo = formData.get("liveDemo");
        
        if (!image || !title || !description || !githubLink) {
            return NextResponse.json(
                { msg: "All fields are required (image, title, description, githubLink)" },
                { status: 400 }
            );
        }
        
        // Read the image file into a buffer (optional depending on use case)
        const uploadDir = path.join(process.cwd(), 'public', 'uploads')
        await mkdir(uploadDir, { recursive: true })
        
        const imageBuffer = await image.arrayBuffer()
        const buffer = Buffer.from(imageBuffer)
        
        const originalName = image.name || `image-${Date.now()}.png` // fallback name
        const filePath = path.join(uploadDir, originalName)
        
        await writeFile(filePath, buffer)

const savedProject = await prisma.project.create({
  data: {
    title,
    description,
    githubLink,
    liveDemo,
    imageName:originalName,
    imageType: image.type,
    imageUrl: `/uploads/${image.originalName}`,
    
  },
});

    return NextResponse.json({
      msg: "Project saved successfully",
      data: savedProject,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
    try {
      const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
      });
  
      // You might want to exclude `imageData` if using Bytes
      return NextResponse.json(projects);
    } catch (error) {
      console.error("GET error:", error);
      return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
  }
