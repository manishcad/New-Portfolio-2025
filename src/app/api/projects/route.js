import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import { writeFile, mkdir } from 'fs/promises'
import fs from "fs/promises";
import path from "path";

import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    // Check if the request is JSON or FormData
    const contentType = req.headers.get('content-type');
    
    let title, description, githubLink, liveDemo, imageUrl;

    if (contentType && contentType.includes('application/json')) {
      // Handle JSON request (from new admin panel)
      const body = await req.json();
      title = body.title;
      description = body.description;
      githubLink = body.githubLink;
      liveDemo = body.liveDemo;
      imageUrl = body.imageUrl;
    } else {
      // Handle FormData request (backward compatibility)
      const formData = await req.formData();
      title = formData.get("title");
      description = formData.get("description");
      githubLink = formData.get("githubLink");
      liveDemo = formData.get("liveDemo");
      const imageFile = formData.get("image");

      if (imageFile) {
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
        imageUrl = `/uploads/${fileName}`;
      }
    }

    if (!title || !description || !githubLink || !imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        githubLink,
        liveDemo: liveDemo || null,
        imageUrl,
        imageName: imageUrl.split('/').pop() // Extract filename from URL
      },
    });

    return NextResponse.json({ success: true, project }, { status: 201 });
  } catch (error) {
    // console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    
    
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });

    // Map projects to add base64 string for image
    const projectsWithImages = projects.map(project => {
      let base64Image = null;

      if (project.imageData) {
        const base64 = project.imageData.toString('base64'); // convert Buffer to base64 string
        base64Image = `data:${project.imageType};base64,${base64}`;
      }

      return {
        ...project,
        imageData: base64Image,
      };
    });

    return NextResponse.json(projectsWithImages);
  } catch (error) {
    // console.error("GET error:", error);
    return NextResponse.json({ error: "Failed to fetch projects", error }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const formData = await req.formData();
    const id = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");
    const githubLink = formData.get("githubLink");
    const liveDemo = formData.get("liveDemo");
    const imageFile = formData.get("image");

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData = {
      title: title || existingProject.title,
      description: description || existingProject.description,
      githubLink: githubLink || existingProject.githubLink,
      liveDemo: liveDemo || existingProject.liveDemo,
    };

    // Handle image update if new image is provided
    if (imageFile) {
      // Delete old image file
      if (existingProject.imageName) {
        const oldImagePath = path.join(process.cwd(), 'public/uploads', existingProject.imageName);
        try {
          await fs.unlink(oldImagePath);
              } catch (error) {
        // console.error("Error deleting old image file:", error);
      }
      }

      // Save new image
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadsDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadsDir, { recursive: true });

      let fileName = `${Date.now()}-${imageFile.name}`;
      fileName = fileName.replace(/\s+/g, '-');
      const filePath = path.join(uploadsDir, fileName);

      await fs.writeFile(filePath, buffer);
      const imageUrl = `/uploads/${fileName}`;

      updateData.imageUrl = imageUrl;
      updateData.imageName = fileName;
    }

    // Update project in database
    const updatedProject = await prisma.project.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    return NextResponse.json({
      success: true,
      project: updatedProject,
      message: "Project updated successfully"
    });

  } catch (error) {
    // console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    // First, get the project to find the image path
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) }
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Delete the image file if it exists
    if (project.imageName) {
      const imagePath = path.join(process.cwd(), 'public/uploads', project.imageName);
      try {
        await fs.unlink(imagePath);
      } catch (error) {
        // console.error("Error deleting image file:", error);
        // Continue with project deletion even if image deletion fails
      }
    }

    // Delete the project from the database
    await prisma.project.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully"
    });

  } catch (error) {
    // console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
