"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

const FAQ_KEYS = [1, 2, 3, 4, 5];

export default function FAQAccordion() {
    const t = useTranslations("faq");
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section className="section-padding bg-white">
            <div className="container-custom max-w-3xl">
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
                    <p className="text-text-muted">
                        {t("homeSubtitle")}
                    </p>
                </motion.div>

                <div className="space-y-3">
                    {FAQ_KEYS.map((num, i) => (
                        <motion.div
                            key={num}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                            className="rounded-xl border border-border-light overflow-hidden bg-white"
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-surface/50 transition-colors"
                            >
                                <span className="font-semibold text-primary pr-4">{t(`homeFaq${num}Q`)}</span>
                                <motion.div
                                    animate={{ rotate: open === i ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="shrink-0"
                                >
                                    <ChevronDown size={18} className="text-accent" />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-4 text-sm text-text-muted leading-relaxed border-t border-border-light pt-3">
                                            {t(`homeFaq${num}A`)}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
