"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link as IntlLink } from "@/i18n/navigation";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function KetQuaClient() {
    const t = useTranslations("resultsPage");
    const [filter, setFilter] = useState("all");

    const categories = [
        { key: "all", label: t("filterAll") },
        { key: "implant", label: t("filterImplant") },
        { key: "ortho", label: t("filterOrtho") },
        { key: "veneer", label: t("filterVeneer") },
        { key: "surgery", label: t("filterSurgery") },
    ];

    const cases = [
        { category: "implant", title: t("case1Title"), desc: t("case1Desc"), duration: t("case1Duration") },
        { category: "ortho", title: t("case2Title"), desc: t("case2Desc"), duration: t("case2Duration") },
        { category: "veneer", title: t("case3Title"), desc: t("case3Desc"), duration: t("case3Duration") },
        { category: "surgery", title: t("case4Title"), desc: t("case4Desc"), duration: t("case4Duration") },
        { category: "implant", title: t("case5Title"), desc: t("case5Desc"), duration: t("case5Duration") },
        { category: "ortho", title: t("case6Title"), desc: t("case6Desc"), duration: t("case6Duration") },
    ];

    const filtered = filter === "all" ? cases : cases.filter((c) => c.category === filter);

    return (
        <div>
            <section className="py-12 bg-gradient-to-br from-surface to-white">
                <div className="container-custom text-center">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
                        {t("title")} <span className="text-gradient-gold">{t("titleHighlight")}</span>
                    </h1>
                    <p className="text-text-muted max-w-xl mx-auto text-lg">
                        {t("subtitle")}
                    </p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-2 mb-10 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat.key}
                                onClick={() => setFilter(cat.key)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${filter === cat.key
                                    ? "gradient-gold text-white shadow-[var(--shadow-gold)]"
                                    : "bg-surface text-text-muted hover:bg-accent/10 hover:text-accent"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Cases Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="rounded-2xl border border-border-light overflow-hidden bg-white shadow-sm hover:shadow-[var(--shadow-card)] transition-shadow"
                            >
                                <div className="grid grid-cols-2">
                                    <div className="aspect-square bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center text-red-400 text-sm font-medium">{t("before")}</div>
                                    <div className="aspect-square bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center text-green-500 text-sm font-medium">{t("after")}</div>
                                </div>
                                <div className="p-5">
                                    <h3 className="font-heading text-lg font-bold text-primary mb-2">{item.title}</h3>
                                    <p className="text-sm text-text-muted leading-relaxed mb-3">{item.desc}</p>
                                    <div className="flex items-center gap-1 text-xs text-accent font-medium">
                                        <Clock size={12} />
                                        {item.duration}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <IntlLink href="/dat-lich-kham" className="btn-primary cursor-pointer">
                            <Calendar size={18} /> {t("ctaBtn")}
                        </IntlLink>
                    </div>
                </div>
            </section>
        </div>
    );
}
