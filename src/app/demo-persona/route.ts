import { NextRequest, NextResponse } from "next/server";
import { DEMO_PERSONA_COOKIE, DEMO_PREVIEW } from "@/lib/demo-preview";

// PREVIEW-ONLY: /demo-persona?p=new shows a brand-new trial account (guided
// tour); /demo-persona?p=sample shows several months of made-up figures.
export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  if (!DEMO_PREVIEW) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const persona = request.nextUrl.searchParams.get("p") === "new" ? "new" : "sample";
  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  response.cookies.set(DEMO_PERSONA_COOKIE, persona, { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 30 });
  return response;
}
