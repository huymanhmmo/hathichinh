"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link as IntlLink } from "@/i18n/navigation";
import { Star, Quote, Calendar } from "lucide-react";

export default function DanhGiaClient() {
    const t = useTranslations("reviewsPage");

    const reviews = [
        { name: t("review1Name"), service: t("review1Service"), rating: 5, avatar: "NH", content: t("review1Content") },
        { name: t("review2Name"), service: t("review2Service"), rating: 5, avatar: "TM", content: t("review2Content") },
        { name: t("review3Name"), service: t("review3Service"), rating: 5, avatar: "LT", content: t("review3Content") },
        { name: t("review4Name"), service: t("review4Service"), rating: 5, avatar: "PĐ", content: t("review4Content") },
        { name: t("review5Name"), service: t("review5Service"), rating: 5, avatar: "VM", content: t("review5Content") },
        { name: t("review6Name"), service: t("review6Service"), rating: 5, avatar: "HN", content: t("review6Content") },
        { name: t("review7Name"), service: t("review7Service"), rating: 5, avatar: "ĐL", content: t("review7Content") },
        { name: t("review8Name"), service: t("review8Service"), rating: 4, avatar: "BT", content: t("review8Content") },
    ];

    const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

    return (
        <div>
            <section className="py-12 bg-gradient-to-br from-surface to-white">
                <div className="container-custom text-center">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
                        {t("title")} <span className="text-gradient-gold">{t("titleHighlight")}</span>
                    </h1>
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={24} className="text-accent fill-accent" />
                            ))}
                        </div>
                        <span className="text-2xl font-bold text-primary">{avgRating}</span>
                        <span className="text-text-muted">({t("reviewCount", { count: String(reviews.length) })})</span>
                    </div>
                    <p className="text-text-muted max-w-xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {reviews.map((review, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="p-6 rounded-2xl bg-white border border-border-light shadow-sm hover:shadow-[var(--shadow-card)] transition-shadow relative"
                            >
                                <Quote size={28} className="text-accent/10 absolute top-4 right-4" />
                                <div className="flex gap-1 mb-4">
                                    {Array.from({ length: review.rating }).map((_, j) => (
                                        <Star key={j} size={14} className="text-accent fill-accent" />
                                    ))}
                                </div>
                                <p className="text-sm text-text-muted leading-relaxed mb-5">&ldquo;{review.content}&rdquo;</p>
                                <div className="flex items-center gap-3 pt-4 border-t border-border-light">
                                    <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-white text-sm font-bold">{review.avatar}</div>
                                    <div>
                                        <div className="font-semibold text-primary text-sm">{review.name}</div>
                                        <div className="text-xs text-text-muted">{review.service}</div>
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
