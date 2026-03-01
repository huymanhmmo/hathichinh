"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const REVIEW_KEYS = [1, 2, 3, 4, 5];
const AVATARS = ["NH", "TM", "LT", "PĐ", "VM"];

export default function Testimonials() {
    const t = useTranslations("testimonials");
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % REVIEW_KEYS.length);
    const prev = () => setCurrent((prev) => (prev - 1 + REVIEW_KEYS.length) % REVIEW_KEYS.length);

    const getVisibleIndices = () => {
        const indices = [];
        for (let i = 0; i < Math.min(3, REVIEW_KEYS.length); i++) {
            indices.push((current + i) % REVIEW_KEYS.length);
        }
        return indices;
    };

    return (
        <section className="section-padding bg-surface">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-14"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                        {t("badge")}
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
                        {t("title")} <span className="text-gradient-gold">{t("titleHighlight")}</span>
                    </h2>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        {t("description")}
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="relative">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {getVisibleIndices().map((idx, i) => {
                                const num = REVIEW_KEYS[idx];
                                return (
                                    <motion.div
                                        key={`${num}-${current}-${i}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        className="bg-white rounded-2xl p-6 shadow-[var(--shadow-card)] border border-border-light relative"
                                    >
                                        <Quote size={32} className="text-accent/10 absolute top-4 right-4" />

                                        {/* Stars */}
                                        <div className="flex gap-1 mb-4">
                                            {Array.from({ length: 5 }).map((_, j) => (
                                                <Star key={j} size={16} className="text-accent fill-accent" />
                                            ))}
                                        </div>

                                        <p className="text-text-muted text-sm leading-relaxed mb-5 min-h-[80px]">
                                            &ldquo;{t(`review${num}Content`)}&rdquo;
                                        </p>

                                        <div className="flex items-center gap-3 pt-4 border-t border-border-light">
                                            <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-white text-sm font-bold">
                                                {AVATARS[idx]}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-primary text-sm">{t(`review${num}Name`)}</div>
                                                <div className="text-xs text-text-muted">{t(`review${num}Service`)}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-10">
                        <button
                            onClick={prev}
                            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-colors cursor-pointer"
                            aria-label={t("prevReview")}
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <div className="flex gap-2">
                            {REVIEW_KEYS.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${i === current ? "bg-accent" : "bg-border"
                                        }`}
                                    aria-label={t("reviewNumber", { num: i + 1 })}
                                />
                            ))}
                        </div>
                        <button
                            onClick={next}
                            className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-colors cursor-pointer"
                            aria-label={t("nextReview")}
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
