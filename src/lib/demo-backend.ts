import { NextRequest, NextResponse } from "next/server";
import { DEMO_PERSONA_COOKIE, DEMO_PREVIEW } from "@/lib/demo-preview";
import { SAMPLE_ASSESSMENT, SAMPLE_SNAPSHOTS, sampleActiveSubscription } from "@/lib/demo-fixtures";

/**
 * PREVIEW-ONLY fake InsForge API (see src/lib/demo-preview.ts), served by the
 * catch-all routes under /api/auth and /api/database. The app's own named
 * routes there (start-trial, sync-ghl-contact, ...) still take precedence.
 *
 * Every visitor is signed in as the same made-up user, so nothing is stored:
 * reads return fixtures, writes are accepted and thrown away. Tour progress
 * still persists per browser through localStorage.
 *
 * Two personas, chosen at /demo-persona and kept in a cookie:
 * - "sample" (default): a paid account with several months of made-up
 *   figures (src/lib/demo-fixtures.ts) to show year-to-date reporting.
 * - "new": a brand-new trial account with no data, to show the guided tour.
 */

const DEMO_USER = {
  id: "00000000-0000-4000-8000-0000000000de",
  email: "preview.owner@example.test",
  emailVerified: true,
  profile: { name: "Preview Owner" },
};

function trialSubscription() {
  const start = new Date();
  const end = new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000);
  return {
    id: "demo-subscription",
    user_id: DEMO_USER.id,
    plan: "none",
    subscription_status: "trial",
    trial_start_date: start.toISOString(),
    trial_end_date: end.toISOString(),
    comp_days: 0,
  };
}

function tableRows(table: string, persona: "sample" | "new"): unknown[] {
  if (persona === "new") {
    if (table === "subscriptions") return [trialSubscription()];
    if (table === "profiles") return [profile()];
    return [];
  }
  switch (table) {
    case "subscriptions":
      return [sampleActiveSubscription()];
    case "financial_snapshots":
      return SAMPLE_SNAPSHOTS;
    case "health_assessments":
      return [SAMPLE_ASSESSMENT];
    case "profiles":
      return [profile()];
    default:
      return [];
  }
}

function profile() {
  return { id: DEMO_USER.id, name: DEMO_USER.profile.name, business_name: "Sample Studio Co.", industry: "Services" };
}

/** Supports the `order=col.desc` and `limit=n` query parameters the app sends. */
function applyQuery(rows: Record<string, unknown>[], params: URLSearchParams): Record<string, unknown>[] {
  let result = [...rows];
  const order = params.get("order");
  if (order) {
    const [column, direction] = order.split(",")[0].split(".");
    result.sort((a, b) => String(a[column] ?? "").localeCompare(String(b[column] ?? "")) * (direction === "desc" ? -1 : 1));
  }
  const limit = Number(params.get("limit"));
  if (limit > 0) result = result.slice(0, limit);
  return result;
}

export function demoBackend(request: NextRequest): NextResponse {
  if (!DEMO_PREVIEW) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const path = request.nextUrl.pathname.replace(/^\/api\//, "").split("/").filter(Boolean);
  const [area, section, table] = path;

  if (area === "auth") {
    if (section === "logout") return NextResponse.json({ success: true });
    return NextResponse.json({ accessToken: "preview-only-token", user: DEMO_USER });
  }

  if (area === "database" && section === "records" && table) {
    if (request.method !== "GET") return NextResponse.json([]);
    const persona = request.cookies.get(DEMO_PERSONA_COOKIE)?.value === "new" ? "new" : "sample";
    const rows = applyQuery(tableRows(table, persona) as Record<string, unknown>[], request.nextUrl.searchParams);
    const wantsObject = (request.headers.get("accept") ?? "").includes("vnd.pgrst.object");
    if (!wantsObject) return NextResponse.json(rows);
    if (rows.length === 1) return NextResponse.json(rows[0]);
    return NextResponse.json(
      {
        code: "PGRST116",
        message: "JSON object requested, multiple (or no) rows returned",
        details: `The result contains ${rows.length} rows`,
        hint: null,
      },
      { status: 406 }
    );
  }

  return NextResponse.json({ error: "Not available in the preview" }, { status: 404 });
}
