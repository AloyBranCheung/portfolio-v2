import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { stringify } from "qs-esm";
import type { Where } from "payload";

export async function GET() {
  try {
    const query: Where = {
      filename: {
        equals: "Brandon Cheung - Software Developer Resume.pdf",
      },
    };
    const res = await fetch(
      `${process.env.BACKEND_URL}/media${stringify({ where: query }, { addQueryPrefix: true })}`,
      { next: { revalidate: 3600 } },
    );

    const data = await res.json();
    if (data.docs.length > 1) {
      return new NextResponse("More than one file found.", { status: 500 });
    }
    const file = data.docs[0].url.replace(/^\/api/, "");
    const fileUrl = `${process.env.BACKEND_URL}${file}`;

    const fileResponse = await fetch(fileUrl);
    if (fileResponse.status === 404) {
      return new NextResponse("File not found", { status: 404 });
    }
    const fileBuffer = await fileResponse.arrayBuffer();

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'inline; filename="Brandon Cheung - Software Developer Resume.pdf"',
      },
    });
  } catch (error) {
    Sentry.captureException(error);
    return new NextResponse("Error fetching PDF", { status: 500 });
  }
}
