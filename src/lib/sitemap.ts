import { SITE_URL, SERVICES, CLINICS } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blogData";

export type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export interface SitemapEntry {
    loc: string;
    lastmod: string;
    changefreq: ChangeFreq;
    priority: number;
    alternates: Array<{ hreflang: string; href: string }>;
}

/**
 * Lấy danh sách URL sitemap dựa trên các locale được chỉ định.
 */
export function getSitemapEntries(locales: string[]): SitemapEntry[] {
    const now = new Date().toISOString();
    const allLocales = ["vi", "en"]; // Luôn dùng đủ để tạo hreflang

    const staticPages: Array<{
        path: string;
        localized: Record<string, string>;
        priority: number;
        freq: ChangeFreq
    }> = [
            { path: "/", localized: { vi: "/", en: "/" }, priority: 1.0, freq: "weekly" },
            { path: "/gioi-thieu", localized: { vi: "/gioi-thieu", en: "/about" }, priority: 0.8, freq: "monthly" },
            { path: "/dich-vu", localized: { vi: "/dich-vu", en: "/services" }, priority: 0.9, freq: "weekly" },
            { path: "/phong-kham", localized: { vi: "/phong-kham", en: "/clinics" }, priority: 0.8, freq: "monthly" },
            { path: "/bang-gia", localized: { vi: "/bang-gia", en: "/pricing" }, priority: 0.8, freq: "weekly" },
            { path: "/blog", localized: { vi: "/blog", en: "/blog" }, priority: 0.8, freq: "daily" },
            { path: "/danh-gia", localized: { vi: "/danh-gia", en: "/reviews" }, priority: 0.7, freq: "weekly" },
            { path: "/hoi-dap", localized: { vi: "/hoi-dap", en: "/faq" }, priority: 0.7, freq: "monthly" },
            { path: "/ket-qua-dieu-tri", localized: { vi: "/ket-qua-dieu-tri", en: "/results" }, priority: 0.7, freq: "monthly" },
            { path: "/quy-trinh-dieu-tri", localized: { vi: "/quy-trinh-dieu-tri", en: "/process" }, priority: 0.7, freq: "monthly" },
            { path: "/dat-lich-kham", localized: { vi: "/dat-lich-kham", en: "/booking" }, priority: 0.9, freq: "monthly" },
            { path: "/lien-he", localized: { vi: "/lien-he", en: "/contact" }, priority: 0.6, freq: "monthly" },
        ];

    const entries: SitemapEntry[] = [];

    locales.forEach((locale) => {
        // Static Pages
        staticPages.forEach((p) => {
            const path = p.localized[locale as keyof typeof p.localized];
            entries.push({
                loc: `${SITE_URL}${locale === "vi" ? "" : `/${locale}`}${path === "/" ? "" : path}`,
                lastmod: now,
                changefreq: p.freq,
                priority: p.priority,
                alternates: [
                    ...allLocales.map((l) => ({
                        hreflang: l,
                        href: `${SITE_URL}${l === "vi" ? "" : `/${l}`}${p.localized[l as keyof typeof p.localized] === "/" ? "" : p.localized[l as keyof typeof p.localized]}`,
                    })),
                    { hreflang: "x-default", href: `${SITE_URL}${p.localized.vi === "/" ? "" : p.localized.vi}` },
                ],
            });
        });

        // Services - USING LOCALIZED SLUGS
        SERVICES.forEach((s) => {
            const viSlug = s.slugs.vi;
            const enSlug = s.slugs.en;
            const currentSlug = locale === "vi" ? viSlug : enSlug;
            const prefix = locale === "vi" ? "/dich-vu" : "/services";

            entries.push({
                loc: `${SITE_URL}${locale === "vi" ? "" : `/${locale}`}${prefix}/${currentSlug}`,
                lastmod: now,
                changefreq: "monthly",
                priority: 0.85,
                alternates: allLocales.map((l) => ({
                    hreflang: l,
                    href: `${SITE_URL}${l === "vi" ? "" : `/${l}`}${l === "vi" ? "/dich-vu" : "/services"}/${l === "vi" ? viSlug : enSlug}`,
                })),
            });
        });

        // Clinics - USING LOCALIZED SLUGS
        CLINICS.forEach((c) => {
            const viSlug = c.slugs.vi;
            const enSlug = c.slugs.en;
            const currentSlug = locale === "vi" ? viSlug : enSlug;
            const prefix = locale === "vi" ? "/phong-kham" : "/clinics";

            entries.push({
                loc: `${SITE_URL}${locale === "vi" ? "" : `/${locale}`}${prefix}/${currentSlug}`,
                lastmod: now,
                changefreq: "monthly",
                priority: 0.75,
                alternates: allLocales.map((l) => ({
                    hreflang: l,
                    href: `${SITE_URL}${l === "vi" ? "" : `/${l}`}${l === "vi" ? "/phong-kham" : "/clinics"}/${l === "vi" ? viSlug : enSlug}`,
                })),
            });
        });

        // Blog Posts - USING LOCALIZED SLUGS
        BLOG_POSTS.forEach((post) => {
            const slug = locale === "vi" ? post.slugs.vi : post.slugs.en;
            entries.push({
                loc: `${SITE_URL}${locale === "vi" ? "" : `/${locale}`}/blog/${slug}`,
                lastmod: new Date(post.date).toISOString(),
                changefreq: "monthly",
                priority: 0.7,
                alternates: allLocales.map((l) => ({
                    hreflang: l,
                    href: `${SITE_URL}${l === "vi" ? "" : `/${l}`}/blog/${l === "vi" ? post.slugs.vi : post.slugs.en}`,
                })),
            });
        });
    });

    return entries;
}

/**
 * Sinh chuỗi XML cho sitemap từ danh sách entries.
 */
export function generateSitemapXml(entries: SitemapEntry[]): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${entries
            .map(
                (entry) => `
  <url>
    <loc>${entry.loc}</loc>
    ${entry.alternates
                        .map((alt) => `<xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`)
                        .join("")}
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
            )
            .join("")}
</urlset>`;
}
