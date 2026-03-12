import { NextResponse } from "next/server";

interface Icon {
  id: string;
  alt: string;
  url: string;
  thumbnailURL: string | null;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  updatedAt: string;
  createdAt: string;
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate: string | null;
  credentialID: string | null;
  credentialURL: string | null;
  icon: Icon;
  updatedAt: string;
  createdAt: string;
}

export async function GET() {
  const res = await fetch(
    `${process.env.BACKEND_URL}/certification?${new URLSearchParams({
      sort: "-issueDate",
    }).toString()}`,
    { next: { revalidate: 3600 } },
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }

  const data = await res.json();

  // Rewrite icon URLs to use our proxy
  if (data.docs) {
    data.docs = data.docs.map((cert: Certification) => {
      if (cert.icon?.url) {
        cert.icon.url = cert.icon.url;
      }
      if (cert.icon?.thumbnailURL) {
        cert.icon.thumbnailURL = cert.icon.thumbnailURL;
      }
      return cert;
    });
  }

  return NextResponse.json(data);
}
