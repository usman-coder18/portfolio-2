import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "public", "Muhammad usman mern stack resume.pdf");

        const fileBuffer = await fs.readFile(filePath);

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "inline; filename=Muhammad usman mern stack resume.pdf",
            },
        });
    } catch (error) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
}
