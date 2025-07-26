import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";

export async function GET() {
  try {
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json({
        status: "error",
        message: "Cloudinary environment variables are missing",
        config: {
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "Set" : "Missing",
          api_key: process.env.CLOUDINARY_API_KEY ? "Set" : "Missing",
          api_secret: process.env.CLOUDINARY_API_SECRET ? "Set" : "Missing"
        }
      }, { status: 500 });
    }

    // Test Cloudinary connection by getting account info
    const result = await cloudinary.api.ping();
    
    return NextResponse.json({
      status: "success",
      message: "Cloudinary connection successful",
      cloudinary_response: result,
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY ? "Set" : "Missing",
        api_secret: process.env.CLOUDINARY_API_SECRET ? "Set" : "Missing"
      }
    });

  } catch (error) {
    console.error("Cloudinary test error:", error);
    
    return NextResponse.json({
      status: "error",
      message: "Cloudinary connection failed",
      error: error.message,
      http_code: error.http_code,
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY ? "Set" : "Missing",
        api_secret: process.env.CLOUDINARY_API_SECRET ? "Set" : "Missing"
      }
    }, { status: 500 });
  }
} 