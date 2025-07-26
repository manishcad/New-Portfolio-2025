import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Get basic stats
    const [projectCount, skillCount] = await Promise.all([
      prisma.project.count(),
      prisma.skill.count()
    ]);

    return NextResponse.json({
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
      stats: {
        projects: projectCount,
        skills: skillCount
      }
    });
  } catch (error) {
    console.error("Health check error:", error);
    return NextResponse.json({
      status: "unhealthy",
      database: "disconnected",
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 