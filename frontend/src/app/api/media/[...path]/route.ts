import { NextRequest, NextResponse } from "next/server";
import type { Where } from "payload";
import { stringify } from "qs-esm";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const filename = path[path.length - 1];

  const query: Where = {
    filename: {
      equals: filename,
    },
  };

  const res = await fetch(
    `${process.env.BACKEND_URL}/media${stringify({ where: query }, { addQueryPrefix: true })}`,
    { next: { revalidate: 3600 } },
  );

  if (!(res.status === 200)) {
    return new NextResponse("Media not found", { status: 404 });
  }

  const data = await res.json();

  if (data.docs.length === 0) {
    return new NextResponse("Media not found", { status: 404 });
  }

  if (data.docs.length > 1) {
    return new NextResponse("More than one result found", { status: 500 });
  }

  const file = data.docs[0].url.replace(/^\/api/, "");

  const fileUrl = `${process.env.BACKEND_URL}${file}`;

  const fileResponse = await fetch(fileUrl);
  const blob = await fileResponse.blob();

  return new NextResponse(blob, {
    headers: {
      "Content-Type": fileResponse.headers.get("Content-Type") || "image/webp",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
