"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = () => {
        const newLocale = locale === "vi" ? "en" : "vi";
        router.replace(pathname as any, { locale: newLocale });
    };

    return (
        <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-accent/10 transition-colors cursor-pointer"
            title={locale === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
        >
            <Globe size={16} />
            <span>{locale === "vi" ? "EN" : "VI"}</span>
        </button>
    );
}
