import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import cloudinary from "../../../../lib/cloudinary";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const data = await prisma.skill.findMany();
    
    if (!data) {
      return NextResponse.json(
        { error: "No skills found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Error fetching skills:", err);
    
    // Check for specific error types
    if (err.code === 'P1001') {
      return NextResponse.json(
        { error: "Database connection failed. Please check your database configuration." },
        { status: 500 }
      );
    }
    
    if (err.code === 'P2025') {
      return NextResponse.json(
        { error: "Database record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to fetch skills", details: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const image = formData.get("image");
    const description = formData.get("description");

    if (!name || !image) {
      return NextResponse.json({ error: "name and image field is required" }, { status: 400 });
    }

    let imageUrl = '';

    // Check if Cloudinary is configured
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      try {
        // Convert the image to base64
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = `data:${image.type};base64,${buffer.toString('base64')}`;

        // Upload to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(base64Image, {
          folder: 'portfolio/skills',
          resource_type: 'auto'
        });

        imageUrl = uploadResponse.secure_url;
      } catch (cloudinaryError) {
        // console.error("Cloudinary upload failed:", cloudinaryError);
        // Fallback to local storage
        imageUrl = await saveImageLocally(image);
      }
    } else {
      // Use local storage when Cloudinary is not configured
      imageUrl = await saveImageLocally(image);
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        description,
        image: imageUrl,
      },
    });

    return NextResponse.json({ success: true, skill }, { status: 201 });

  } catch (error) {
    // console.error("Error in POST /api/skills:", error);
    
    // Handle specific Cloudinary errors
    if (error.http_code === 401) {
      return NextResponse.json({ 
        error: "Cloudinary authentication failed. Please check your API credentials." 
      }, { status: 500 });
    }
    
    if (error.http_code === 400) {
      return NextResponse.json({ 
        error: "Invalid image format or size. Please try a different image." 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      error: "Failed to upload skill. Please try again." 
    }, { status: 500 });
  }
}

// Helper function to save image locally
async function saveImageLocally(imageFile) {
  try {
    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), "public/uploads/skills");
    await fs.mkdir(uploadsDir, { recursive: true });

    // Create unique file name
    let fileName = `${Date.now()}-${imageFile.name}`;
    fileName = fileName.replace(/\s+/g, '-');
    const filePath = path.join(uploadsDir, fileName);

    // Convert File (Blob) to Buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save file to disk
    await fs.writeFile(filePath, buffer);
    
    // Return relative URL
    return `/uploads/skills/${fileName}`;
  } catch (error) {
    // console.error("Error saving image locally:", error);
    throw new Error("Failed to save image");
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Skill ID is required" }, { status: 400 });
    }

    // First, get the skill to find the image URL
    const skill = await prisma.skill.findUnique({
      where: { id: parseInt(id) }
    });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    // Delete the image from Cloudinary if it exists and is a Cloudinary URL
    if (skill.image && skill.image.includes('cloudinary.com')) {
      try {
        const publicId = skill.image.split('/').slice(-1)[0].split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        // console.error("Error deleting image from Cloudinary:", error);
        // Continue with skill deletion even if image deletion fails
      }
    }

    // Delete local image if it exists
    if (skill.image && skill.image.startsWith('/uploads/')) {
      try {
        const imagePath = path.join(process.cwd(), 'public', skill.image);
        await fs.unlink(imagePath);
      } catch (error) {
        // console.error("Error deleting local image:", error);
        // Continue with skill deletion even if image deletion fails
      }
    }

    // Delete the skill from the database
    await prisma.skill.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Skill deleted successfully" 
    });

  } catch (error) {
    // console.error("Error in DELETE /api/skills:", error);
    return NextResponse.json({ 
      error: "Failed to delete skill" 
    }, { status: 500 });
  }
}


