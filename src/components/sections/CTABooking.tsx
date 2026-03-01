"use client";

import { motion } from "framer-motion";
import { Link as IntlLink } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Calendar, Phone, Shield, Clock, Award } from "lucide-react";
import { CONTACT } from "@/lib/constants";

export default function CTABooking() {
    const t = useTranslations("cta");

    return (
        <section className="relative py-20 overflow-hidden">
            <div className="absolute inset-0 gradient-hero" />

            {/* Decorative dots */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 grid grid-cols-6 gap-4">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-white" />
                    ))}
                </div>
                <div className="absolute bottom-10 right-10 grid grid-cols-6 gap-4">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-white" />
                    ))}
                </div>
            </div>

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
                        {t("title")} <span className="text-accent-light">{t("titleHighlight")}</span>
                    </h2>
                    <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                        {t("description")}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                        <IntlLink href="/dat-lich-kham" className="btn-primary !bg-accent !text-white cursor-pointer">
                            <Calendar size={18} />
                            {t("bookFree")}
                        </IntlLink>
                        <a
                            href={CONTACT.phoneLink}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors cursor-pointer"
                        >
                            <Phone size={18} />
                            {t("callNow")} {CONTACT.phone}
                        </a>
                    </div>

                    {/* Trust badges */}
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
                        {[
                            { icon: Shield, text: t("trust1") },
                            { icon: Clock, text: t("trust2") },
                            { icon: Award, text: t("trust3") },
                        ].map((badge) => (
                            <div key={badge.text} className="flex items-center gap-2">
                                <badge.icon size={16} className="text-accent-light" />
                                <span>{badge.text}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
