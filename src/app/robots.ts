import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/_next/", "/static/"],
            },
        ],
        sitemap: [
            `${SITE_URL}/sitemap.xml`,
            `${SITE_URL}/sitemap-vi.xml`,
            `${SITE_URL}/sitemap-en.xml`,
        ],
        host: SITE_URL,
    };
}
