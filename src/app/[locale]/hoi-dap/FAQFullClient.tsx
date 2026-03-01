"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link as IntlLink } from "@/i18n/navigation";
import { ChevronDown, Search, Calendar } from "lucide-react";

export default function FAQFullClient() {
    const t = useTranslations("faqPage");
    const [search, setSearch] = useState("");
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

    const toggleItem = (key: string) => {
        setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const faqCategories = [
        {
            category: t("catImplant"),
            items: [
                { q: t("implantQ1"), a: t("implantA1") },
                { q: t("implantQ2"), a: t("implantA2") },
                { q: t("implantQ3"), a: t("implantA3") },
            ],
        },
        {
            category: t("catOrtho"),
            items: [
                { q: t("orthoQ1"), a: t("orthoA1") },
                { q: t("orthoQ2"), a: t("orthoA2") },
                { q: t("orthoQ3"), a: t("orthoA3") },
            ],
        },
        {
            category: t("catVeneer"),
            items: [
                { q: t("veneerQ1"), a: t("veneerA1") },
                { q: t("veneerQ2"), a: t("veneerA2") },
            ],
        },
        {
            category: t("catPayment"),
            items: [
                { q: t("paymentQ1"), a: t("paymentA1") },
                { q: t("paymentQ2"), a: t("paymentA2") },
            ],
        },
        {
            category: t("catWarranty"),
            items: [
                { q: t("warrantyQ1"), a: t("warrantyA1") },
            ],
        },
    ];

    const filteredCategories = faqCategories
        .map((cat) => ({
            ...cat,
            items: cat.items.filter(
                (item) =>
                    item.q.toLowerCase().includes(search.toLowerCase()) ||
                    item.a.toLowerCase().includes(search.toLowerCase())
            ),
        }))
        .filter((cat) => cat.items.length > 0);

    return (
        <div>
            <section className="py-12 bg-gradient-to-br from-surface to-white">
                <div className="container-custom text-center">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
                        {t("title")} <span className="text-gradient-gold">{t("titleHighlight")}</span>
                    </h1>
                    <p className="text-text-muted max-w-xl mx-auto text-lg mb-8">
                        {t("subtitle")}
                    </p>
                    <div className="max-w-md mx-auto relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input
                            type="text"
                            placeholder={t("searchPlaceholder")}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-white focus:border-accent outline-none transition-colors"
                        />
                    </div>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-3xl">
                    {filteredCategories.map((cat) => (
                        <div key={cat.category} className="mb-10">
                            <h2 className="font-heading text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-6 rounded-full bg-accent" />
                                {cat.category}
                            </h2>
                            <div className="space-y-3">
                                {cat.items.map((item, i) => {
                                    const key = `${cat.category}-${i}`;
                                    return (
                                        <div key={key} className="rounded-xl border border-border-light overflow-hidden bg-white">
                                            <button
                                                onClick={() => toggleItem(key)}
                                                className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-surface/50 transition-colors"
                                            >
                                                <span className="font-semibold text-primary pr-4">{item.q}</span>
                                                <motion.div animate={{ rotate: openItems[key] ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                                    <ChevronDown size={18} className="text-accent" />
                                                </motion.div>
                                            </button>
                                            <AnimatePresence>
                                                {openItems[key] && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-5 pb-4 text-sm text-text-muted leading-relaxed border-t border-border-light pt-3">
                                                            {item.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                    {filteredCategories.length === 0 && (
                        <div className="text-center py-12 text-text-muted">
                            {t("noResults")}
                        </div>
                    )}
                </div>
            </section>

            <section className="py-16 gradient-hero">
                <div className="container-custom text-center">
                    <h2 className="font-heading text-3xl font-bold text-white mb-4">
                        {t("ctaTitle")}
                    </h2>
                    <p className="text-white/80 mb-6">{t("ctaDesc")}</p>
                    <IntlLink href="/dat-lich-kham" className="btn-primary cursor-pointer">
                        <Calendar size={18} /> {t("ctaBtn")}
                    </IntlLink>
                </div>
            </section>
        </div>
    );
}
