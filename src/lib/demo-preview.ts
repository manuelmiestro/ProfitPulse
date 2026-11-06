/**
 * PREVIEW-ONLY BRANCH: never merge.
 *
 * This branch builds a click-through demo with no real backend. The browser's
 * InsForge client talks to the fake API served by this same site
 * (src/lib/demo-backend.ts behind /api/auth/* and /api/database/*), which
 * signs everyone in as one made-up user with made-up financial data
 * (src/lib/demo-fixtures.ts) and discards every write. The demo project must have no environment variables,
 * so server routes that need InsForge, Resend, GHL or Authorize.net fail
 * instead of reaching a real service.
 */
// Off under Jest so the existing suite keeps testing the real app's behaviour.
export const DEMO_PREVIEW = process.env.NODE_ENV !== "test";

/** Cookie holding the preview persona: "sample" (default) or "new". */
export const DEMO_PERSONA_COOKIE = "pp_demo_persona";
