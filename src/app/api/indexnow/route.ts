import { NextRequest, NextResponse } from "next/server";
import { SITE_URL } from "@/lib/constants";

export const runtime = "edge";

// IndexNow key - must match the file at /public/[key].txt
// Register at https://www.indexnow.org/
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "ebae89fe653a405e8103dcc65fa43303";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

// Secret to protect this endpoint from unauthorized access
const API_SECRET = process.env.INDEXNOW_API_SECRET || "hathichinh-ping-secret-2026";

function isAuthorized(req: NextRequest): boolean {
    const authHeader = req.headers.get("authorization");
    if (authHeader === `Bearer ${API_SECRET}`) return true;
    const urlSecret = req.nextUrl.searchParams.get("secret");
    if (urlSecret === API_SECRET) return true;
    // Allow requests from localhost (cron job)
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
        || req.headers.get("x-real-ip") || "";
    if (ip === "127.0.0.1" || ip === "::1") return true;
    return false;
}

/**
 * POST /api/indexnow
 * Body: { urls: string[] } – optional list of URLs to submit.
 * If no body provided, submits all key pages automatically.
 *
 * Usage after publishing new blog:
 *   curl -X POST https://hathichinh.com/api/indexnow?secret=YOUR_SECRET \
 *     -H "Content-Type: application/json" \
 *     -d '{"urls":["https://hathichinh.com/vi/blog/implant/my-new-post"]}'
 */
export async function POST(req: NextRequest) {
    if (!isAuthorized(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let urls: string[] = [];

    try {
        const body = await req.json().catch(() => ({}));
        urls = body.urls ?? [];
    } catch {
        // empty body is fine
    }

    // Default: submit all important pages
    if (urls.length === 0) {
        urls = [
            `${SITE_URL}/vi`,
            `${SITE_URL}/en`,
            `${SITE_URL}/vi/dich-vu`,
            `${SITE_URL}/vi/phong-kham`,
            `${SITE_URL}/vi/bang-gia`,
            `${SITE_URL}/vi/blog`,
            `${SITE_URL}/vi/gioi-thieu`,
            `${SITE_URL}/vi/dat-lich-kham`,
        ];
    }

    const payload = {
        host: new URL(SITE_URL).hostname,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
    };

    try {
        const response = await fetch(INDEXNOW_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(payload),
        });

        return NextResponse.json(
            { success: true, submitted: urls.length, status: response.status },
            { status: 200 }
        );
    } catch (error) {
        console.error("[IndexNow] Error:", error);
        return NextResponse.json({ success: false, error: "Failed to ping IndexNow" }, { status: 500 });
    }
}

// Also expose GET for easy browser testing
export async function GET() {
    return NextResponse.json({
        info: "POST to this endpoint with Authorization header or secret param to submit URLs to IndexNow",
        example: { urls: [`${SITE_URL}/vi/blog/implant/implant-co-dau-khong`] },
    });
}

