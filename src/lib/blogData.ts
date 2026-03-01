export interface BlogPost {
    slug: string;        // e.g. "implant/implant-co-dau-khong"
    categoryKey: string; // translation key in blogPage namespace
    date: string;
    readTime: number;
    num: number;         // 1-indexed, maps to post{num}Title etc.
}

export const BLOG_POSTS: BlogPost[] = [
    { num: 1, slug: "implant/implant-co-dau-khong", categoryKey: "filterImplant", date: "2026-02-25", readTime: 8 },
    { num: 2, slug: "nieng-rang/invisalign-gia-bao-nhieu", categoryKey: "filterOrtho", date: "2026-02-20", readTime: 10 },
    { num: 3, slug: "rang-su/veneer-su-la-gi", categoryKey: "filterVeneer", date: "2026-02-15", readTime: 7 },
    { num: 4, slug: "implant/all-on-4-la-gi", categoryKey: "filterImplant", date: "2026-02-10", readTime: 12 },
    { num: 5, slug: "nieng-rang/nieng-rang-mac-cai-su", categoryKey: "filterOrtho", date: "2026-02-05", readTime: 9 },
    { num: 6, slug: "tong-hop/cham-soc-rang-mieng", categoryKey: "filterKnowledge", date: "2026-01-28", readTime: 6 },
];

export function findPostBySlug(slugParts: string[]): BlogPost | undefined {
    const joined = slugParts.join("/");
    return BLOG_POSTS.find((p) => p.slug === joined);
}
