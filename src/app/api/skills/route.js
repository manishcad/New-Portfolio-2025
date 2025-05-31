import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.skill.findMany();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "failed fetching data" }, { status: 500 });
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

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadsDir = path.join(process.cwd(), "public/skills");
    await fs.mkdir(uploadsDir, { recursive: true });

    let fileName = `${Date.now()}-${image.name}`;
    fileName = fileName.replace(/\s+/g, '-');
    const filePath = path.join(uploadsDir, fileName);

    await fs.writeFile(filePath, buffer);
    console.log(fileName, "This is the file name");

    const imageUrl = `/skills/${fileName}`;

    const skill = await prisma.skill.create({
      data: {
        name,
        description,
        image: imageUrl,
      },
    });

    return NextResponse.json({ success: true, skill }, { status: 201 });

  } catch (error) {
    console.error("Error in POST /api/skill:", error);
    return NextResponse.json({ error: "Failed to upload skill" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Skill ID is required" }, { status: 400 });
    }

    // First, get the skill to find the image path
    const skill = await prisma.skill.findUnique({
      where: { id: parseInt(id) }
    });

    if (!skill) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    // Delete the image file if it exists
    if (skill.image) {
      const imagePath = path.join(process.cwd(), 'public', skill.image);
      try {
        await fs.unlink(imagePath);
      } catch (error) {
        console.error("Error deleting image file:", error);
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
    console.error("Error in DELETE /api/skills:", error);
    return NextResponse.json({ 
      error: "Failed to delete skill" 
    }, { status: 500 });
  }
}


