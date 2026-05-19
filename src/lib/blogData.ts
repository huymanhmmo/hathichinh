export interface BlogPost {
    slugs: { vi: string, en: string };
    categoryKey: string;
    date: string;
    readTime: number;
    num: number;
}

export const BLOG_POSTS: BlogPost[] = [
    { num: 1, slugs: { vi: "implant/implant-co-dau-khong", en: "implant/is-implant-painful" }, categoryKey: "filterImplant", date: "2026-02-25", readTime: 8 },
    { num: 2, slugs: { vi: "nieng-rang/invisalign-gia-bao-nhieu", en: "orthodontics/invisalign-cost" }, categoryKey: "filterOrtho", date: "2026-02-20", readTime: 10 },
    { num: 3, slugs: { vi: "rang-su/veneer-su-la-gi", en: "veneers/what-are-veneers" }, categoryKey: "filterVeneer", date: "2026-02-15", readTime: 7 },
    { num: 4, slugs: { vi: "implant/all-on-4-la-gi", en: "implant/what-is-all-on-4" }, categoryKey: "filterImplant", date: "2026-02-10", readTime: 12 },
    { num: 5, slugs: { vi: "nieng-rang/nieng-rang-mac-cai-su", en: "orthodontics/ceramic-braces" }, categoryKey: "filterOrtho", date: "2026-02-05", readTime: 9 },
    { num: 6, slugs: { vi: "tong-hop/cham-soc-rang-mieng", en: "general/dental-care" }, categoryKey: "filterKnowledge", date: "2026-01-28", readTime: 6 },
];

export function findPostBySlug(slugParts: string[]): BlogPost | undefined {
    const joined = slugParts.join("/");
    return BLOG_POSTS.find((p) => p.slugs.vi === joined || p.slugs.en === joined);
}
