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
        { category: "implant", title: t("case1Title"), desc: t("case1Desc"), duration: t("case1Duration"), before: "/images/results/case1-before.png", after: "/images/results/case1-after.png" },
        { category: "ortho", title: t("case2Title"), desc: t("case2Desc"), duration: t("case2Duration"), before: "/images/results/case2-before.png", after: "/images/results/case2-after.png" },
        { category: "veneer", title: t("case3Title"), desc: t("case3Desc"), duration: t("case3Duration"), before: "/images/results/case3-before.png", after: "/images/results/case3-after.png" },
        { category: "surgery", title: t("case4Title"), desc: t("case4Desc"), duration: t("case4Duration"), before: "/images/results/case4-before.png", after: "/images/results/case4-after.png" },
        { category: "implant", title: t("case5Title"), desc: t("case5Desc"), duration: t("case5Duration"), before: "/images/results/case5-before.png", after: "/images/results/case5-after.png" },
        { category: "ortho", title: t("case6Title"), desc: t("case6Desc"), duration: t("case6Duration"), before: "/images/results/case6-before.png", after: "/images/results/case6-after.png" },
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
                                    <div className="aspect-square overflow-hidden relative">
                                        <img src={item.before} alt={`${item.title} - ${t("before")}`} className="w-full h-full object-cover" loading="lazy" />
                                        <span className="absolute bottom-2 left-2 text-xs font-semibold px-2 py-0.5 rounded bg-red-500/80 text-white">{t("before")}</span>
                                    </div>
                                    <div className="aspect-square overflow-hidden relative">
                                        <img src={item.after} alt={`${item.title} - ${t("after")}`} className="w-full h-full object-cover" loading="lazy" />
                                        <span className="absolute bottom-2 right-2 text-xs font-semibold px-2 py-0.5 rounded bg-green-500/80 text-white">{t("after")}</span>
                                    </div>
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
