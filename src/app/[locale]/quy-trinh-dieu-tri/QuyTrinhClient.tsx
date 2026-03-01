"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link as IntlLink } from "@/i18n/navigation";
import Image from "next/image";
import { ClipboardCheck, Scan, Wrench, ShieldCheck, Calendar, CheckCircle } from "lucide-react";

const stepIcons = [ClipboardCheck, Scan, Wrench, ShieldCheck];

export default function QuyTrinhClient() {
    const t = useTranslations("processPage");

    const steps = [
        {
            icon: stepIcons[0], number: "01", title: t("step1Title"), time: t("step1Time"),
            desc: t("step1Desc"),
            details: [t("step1d1"), t("step1d2"), t("step1d3"), t("step1d4"), t("step1d5")],
        },
        {
            icon: stepIcons[1], number: "02", title: t("step2Title"), time: t("step2Time"),
            desc: t("step2Desc"),
            details: [t("step2d1"), t("step2d2"), t("step2d3"), t("step2d4"), t("step2d5")],
        },
        {
            icon: stepIcons[2], number: "03", title: t("step3Title"), time: t("step3Time"),
            desc: t("step3Desc"),
            details: [t("step3d1"), t("step3d2"), t("step3d3"), t("step3d4"), t("step3d5")],
        },
        {
            icon: stepIcons[3], number: "04", title: t("step4Title"), time: t("step4Time"),
            desc: t("step4Desc"),
            details: [t("step4d1"), t("step4d2"), t("step4d3"), t("step4d4"), t("step4d5")],
        },
    ];

    return (
        <div>
            <section className="py-12 bg-gradient-to-br from-surface to-white">
                <div className="container-custom text-center">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
                        {t("title")} <span className="text-gradient-gold">{t("titleHighlight")}</span>
                    </h1>
                    <p className="text-text-muted max-w-2xl mx-auto text-lg">
                        {t("subtitle")}
                    </p>
                </div>
            </section>

            {/* Treatment Photo Section */}
            <section className="gradient-hero py-12 overflow-hidden">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Image
                                src="/images/clinic-treatment.png"
                                alt={t("treatmentImgAlt")}
                                width={600}
                                height={450}
                                className="w-full h-auto object-contain"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-center lg:text-left"
                        >
                            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                                {t("treatmentPhotoTitle")}
                            </h2>
                            <p className="text-white/70 leading-relaxed">
                                {t("treatmentPhotoDesc")}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="space-y-12">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="grid md:grid-cols-[100px_1fr] gap-6"
                            >
                                <div className="flex md:flex-col items-center md:items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl gradient-gold flex items-center justify-center text-white shadow-[var(--shadow-gold)]">
                                        <step.icon size={28} />
                                    </div>
                                    <span className="text-sm font-bold text-accent">{t("stepLabel")} {step.number}</span>
                                </div>
                                <div className="p-6 rounded-2xl bg-surface border border-border-light">
                                    <div className="flex items-center justify-between mb-3">
                                        <h2 className="font-heading text-xl font-bold text-primary">{step.title}</h2>
                                        <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent font-medium">{step.time}</span>
                                    </div>
                                    <p className="text-text-muted mb-4">{step.desc}</p>
                                    <ul className="space-y-2">
                                        {step.details.map((d, j) => (
                                            <li key={j} className="flex items-center gap-2 text-sm text-text-muted">
                                                <CheckCircle size={14} className="text-accent shrink-0" />
                                                {d}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 gradient-hero">
                <div className="container-custom text-center">
                    <h2 className="font-heading text-3xl font-bold text-white mb-4">{t("ctaTitle")}</h2>
                    <p className="text-white/80 mb-6">{t("ctaDesc")}</p>
                    <IntlLink href="/dat-lich-kham" className="btn-primary cursor-pointer">
                        <Calendar size={18} /> {t("ctaBtn")}
                    </IntlLink>
                </div>
            </section>
        </div>
    );
}
