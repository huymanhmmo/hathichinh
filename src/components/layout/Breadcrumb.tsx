"use client";

import { useTranslations } from "next-intl";
import { Link as IntlLink } from "@/i18n/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    const t = useTranslations("nav");

    const homeName = t("home");

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: homeName,
                item: "https://hathichinh.com",
            },
            ...items.map((item, index) => ({
                "@type": "ListItem",
                position: index + 2,
                name: item.label,
                ...(item.href ? { item: `https://hathichinh.com${item.href}` } : {}),
            })),
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav aria-label="Breadcrumb" className="py-4">
                <ol className="flex items-center flex-wrap gap-1 text-sm">
                    <li>
                        <IntlLink
                            href="/"
                            className="flex items-center gap-1 text-text-muted hover:text-accent transition-colors cursor-pointer"
                        >
                            <Home size={14} />
                            <span>{homeName}</span>
                        </IntlLink>
                    </li>
                    {items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                            <ChevronRight size={14} className="text-text-light" />
                            {item.href ? (
                                <IntlLink
                                    href={item.href}
                                    className="text-text-muted hover:text-accent transition-colors cursor-pointer"
                                >
                                    {item.label}
                                </IntlLink>
                            ) : (
                                <span className="text-accent font-medium">{item.label}</span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}

