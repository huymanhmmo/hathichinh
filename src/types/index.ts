export interface Service {
    slug: string;
    title: string;
    shortDesc: string;
    icon: string;
    featured: boolean;
    subServices: SubService[];
}

export interface SubService {
    slug: string;
    title: string;
}

export interface BlogPost {
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: number;
    image?: string;
}

export interface BlogCategory {
    slug: string;
    title: string;
    description: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface FAQCategory {
    slug: string;
    title: string;
    items: FAQItem[];
}

export interface Review {
    id: string;
    name: string;
    service: string;
    rating: number;
    content: string;
    type: "video" | "anh" | "van-ban";
    avatar?: string;
    videoUrl?: string;
    imageUrl?: string;
    date: string;
}

export interface PricingItem {
    service: string;
    description?: string;
    priceRange: string;
    unit?: string;
    note?: string;
}

export interface PricingCategory {
    slug: string;
    title: string;
    items: PricingItem[];
}

export interface ResultCase {
    id: string;
    category: string;
    title: string;
    description: string;
    beforeImage: string;
    afterImage: string;
    treatmentType: string;
    duration: string;
}
