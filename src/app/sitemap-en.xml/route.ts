import { NextResponse } from "next/server";
import { getSitemapEntries, generateSitemapXml } from "@/lib/sitemap";

export async function GET() {
    const entries = getSitemapEntries(["en"]);
    const xml = generateSitemapXml(entries);

    return new NextResponse(xml, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
        },
    });
}
