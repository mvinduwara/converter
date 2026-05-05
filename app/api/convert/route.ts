import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import ConvertAPI from "convertapi";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import os from "os";

const convertapi = new ConvertAPI(process.env.CONVERT_API_SECRET as string);

export async function POST(req: NextRequest) {
    let tempFilePath = "";

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

            const tempFileName = `temp-${Date.now()}.${originalExtension}`;
            tempFilePath = path.join(os.tmpdir(), tempFileName);

            await writeFile(tempFilePath, buffer);

            const result = await convertapi.convert(format, {
                File: tempFilePath
            }, originalExtension);

            const responseData = result.response as { Files: Array<{ FileData: string }> };
            const fileInfo = responseData.Files[0];
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
    } finally {
        if (tempFilePath) {
            try {
                await unlink(tempFilePath);
            } catch (err) {
                console.error("Failed to delete temporary file:", err);
            }
        }
    }
}