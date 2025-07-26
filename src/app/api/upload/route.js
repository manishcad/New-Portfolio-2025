import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");

    if (!image) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      );
    }

    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { error: "Image upload service not configured. Please check your Cloudinary settings." },
        { status: 500 }
      );
    }

    // Convert the image to base64
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = `data:${image.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: 'portfolio/projects',
      resource_type: 'auto',
      transformation: [
        { width: 1200, height: 630, crop: 'fill' },
        { quality: 'auto' }
      ]
    });

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
      width: uploadResponse.width,
      height: uploadResponse.height
    });

  } catch (error) {
    console.error("Error in POST /api/upload:", error);
    
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
      error: "Failed to upload image. Please try again." 
    }, { status: 500 });
  }
} 