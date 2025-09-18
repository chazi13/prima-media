// app/api/proxy/[...path]/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return handleProxyGETDELETE(req);
}

export async function POST(req: NextRequest) {
  return handleProxyRequest(req);
}

export async function PATCH(req: NextRequest) {
  return handleProxyRequest(req);
}

export async function DELETE(req: NextRequest) {
  return handleProxyGETDELETE(req);
}

async function handleProxyGETDELETE(req: NextRequest) {
  const path = req.nextUrl.pathname.replace("/api/", "");
  const externalUrl = `${process.env.NEXT_PUBLIC_API_URL}/${path}${req.nextUrl.search}`;

  const res = await fetch(externalUrl, {
    headers: {
      Authorization: `Bearer ${req.cookies.get("token")?.value}`,
    },
  });

  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
}

// Reusable handler for all methods
async function handleProxyRequest(req: NextRequest) {
  const path = req.nextUrl.pathname.replace("/api/proxy/", "");
  const externalUrl = `${process.env.NEXT_PUBLIC_API_URL}/${path}${req.nextUrl.search}`;

  // Get the raw body as a Blob (handles binary/files)
  const blob = await req.blob();

  // Forward headers (excluding Next.js-specific ones)
  const headers = new Headers();
  req.headers.forEach((value, key) => {
    if (!key.startsWith("next-") && key !== "content-length") {
      headers.set(key, value);
    }
  });

  // Add auth header if needed
  const token = req.cookies.get("token")?.value;
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Proxy the request
  const res = await fetch(externalUrl, {
    method: req.method,
    headers,
    body: blob.size > 0 ? blob : undefined, // Only send body if not empty
  });

  // Return the external API response
  return new Response(res.body, {
    status: res.status,
    headers: res.headers,
  });
}
