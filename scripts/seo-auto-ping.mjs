#!/usr/bin/env node

/**
 * Script này quét sitemap.xml của hathichinh.com,
 * lấy tất cả URL và gửi tới IndexNow API để yêu cầu Google/Bing index lại.
 * Chạy tự động lúc 23h hàng ngày qua Cron Job.
 */

const SITE_URL = "https://hathichinh.com";
const LOCAL_URL = "http://127.0.0.1:3100";
const API_ENDPOINT = `${LOCAL_URL}/api/indexnow?secret=${process.env.INDEXNOW_API_SECRET || 'hathichinh-ping-secret-2026'}`;

async function runAutoPing() {
    console.log(`[${new Date().toISOString()}] Starting SEO Auto-Ping...`);

    try {
        // 1. Lấy nội dung sitemap từ cổng local
        const sitemapRes = await fetch(`${LOCAL_URL}/sitemap.xml`);
        if (!sitemapRes.ok) throw new Error(`Failed to fetch sitemap from ${LOCAL_URL}: ${sitemapRes.status}`);

        const xml = await sitemapRes.text();

        // 2. Parse URL từ XML bằng regex (để tránh cài thêm thư viện xml parser)
        const urlMatches = xml.match(/<loc>(.*?)<\/loc>/g);
        if (!urlMatches) {
            console.error("No URLs found in sitemap.");
            return;
        }

        const urls = urlMatches.map(match => match.replace(/<\/?loc>/g, ""));
        console.log(`Found ${urls.length} URLs in sitemap.`);

        // 3. Gửi tới API IndexNow nội bộ
        const pingRes = await fetch(API_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ urls }),
        });

        const result = await pingRes.json();
        if (pingRes.ok) {
            console.log(`Successfully submitted ${result.submitted} URLs to IndexNow.`);
        } else {
            console.error("Failed to ping IndexNow API:", result);
        }
    } catch (error) {
        console.error("SEO Auto-Ping failed:", error);
    }
}

runAutoPing();
