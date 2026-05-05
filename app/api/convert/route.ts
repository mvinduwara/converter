import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import convertapi from "convertapi";

convertapi.configure(process.env.CONVERT_API_SECRET as string);

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


    if (["webp", "jpg", "png"].includes(format)) {
      if (format === "webp") {
        convertedBuffer = await sharp(buffer).webp().toBuffer();
        mimeType = "image/webp";
      } else if (format === "jpg") {
        convertedBuffer = await sharp(buffer).jpeg().toBuffer();
        mimeType = "image/jpeg";
      } else {
        convertedBuffer = await sharp(buffer).png().toBuffer();
        mimeType = "image/png";
      }
    } 

    else if (format === "pdf" || format === "docx") {
      const originalExtension = file.name.split('.').pop()?.toLowerCase() || '';
      
      const result = await convertapi.convert(format, {
        File: {
          name: file.name,
          data: buffer
        }
      }, originalExtension);

      const fileInfo = result.response.Files[0];
      convertedBuffer = Buffer.from(fileInfo.FileData, 'base64');
      
      mimeType = format === "pdf" ? "application/pdf" : "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    } 
    
    else {
      return NextResponse.json({ error: "Unsupported format" }, { status: 400 });
    }

    return new NextResponse(convertedBuffer, {
      headers: {
        "Content-Type": mimeType,
        "Content-Disposition": `attachment; filename="converted.${format}"`,
      },
    });

  } catch (error) {
    console.error("Conversion error:", error);
    return NextResponse.json({ error: "Conversion failed." }, { status: 500 });
  }
}