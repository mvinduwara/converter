import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const format = formData.get("format") as string | null;

    if (!file || !format) {
      return NextResponse.json({ error: "File and format are required" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let convertedBuffer: Buffer;
    let mimeType: string;

    if (format === "webp") {
      convertedBuffer = await sharp(buffer).webp().toBuffer();
      mimeType = "image/webp";
    } else if (format === "jpg") {
      convertedBuffer = await sharp(buffer).jpeg().toBuffer();
      mimeType = "image/jpeg";
    } else if (format === "png") {
      convertedBuffer = await sharp(buffer).png().toBuffer();
      mimeType = "image/png";
    } else {
      return NextResponse.json({ error: "Unsupported image format" }, { status: 400 });
    }

    return new NextResponse(convertedBuffer, {
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="converted.${format}"`,
      },
    });

  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json({ error: "Conversion failed. Ensure you uploaded a valid image." }, { status: 500 });
  }
}