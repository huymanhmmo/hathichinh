"use client";

import { useTranslations } from "next-intl";
import { Link as IntlLink } from "@/i18n/navigation";

export default function NotFound() {
    const t = useTranslations("notFound");
    const tc = useTranslations("common");

    return (
        <section className="min-h-[60vh] flex items-center justify-center">
            <div className="container-custom text-center py-20">
                <div className="font-heading text-8xl font-bold text-accent/20 mb-4">404</div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
                    {t("title")}
                </h1>
                <p className="text-text-muted mb-8 max-w-md mx-auto">
                    {t("description")}
                </p>
                <IntlLink href="/" className="btn-primary cursor-pointer">
                    {tc("backToHome")}
                </IntlLink>
            </div>
        </section>
    );
}
