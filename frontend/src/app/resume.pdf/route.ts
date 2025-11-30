import { NextResponse } from "next/server";
import axios from "@/lib/axios";

export async function GET(request: Request) {
  const res = await axios.get("/media", {
    params: {
      where: {
        filename: {
          like: "resume",
        },
      },
      limit: 1,
    },
  });
  const file = res.data.docs[0].url.replace(/^\/api/, "");
  const fileUrl = `${process.env.BACKEND_URL}${file}`;

  const fileResponse = await fetch(fileUrl);
  const fileBuffer = await fileResponse.arrayBuffer();

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'inline; filename="Brandon Cheung - Software Developer Resume.pdf"',
    },
  });
}
