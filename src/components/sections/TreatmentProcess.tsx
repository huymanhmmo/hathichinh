"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ClipboardCheck, Scan, Wrench, ShieldCheck } from "lucide-react";

export default function TreatmentProcess() {
    const t = useTranslations("process");

    const steps = [
        { icon: ClipboardCheck, number: "01", title: t("step1"), desc: t("step1Desc"), time: t("step1Time") },
        { icon: Scan, number: "02", title: t("step2"), desc: t("step2Desc"), time: t("step2Time") },
        { icon: Wrench, number: "03", title: t("step3"), desc: t("step3Desc"), time: t("step3Time") },
        { icon: ShieldCheck, number: "04", title: t("step4"), desc: t("step4Desc"), time: t("step4Time") },
    ];

    return (
        <section className="section-padding bg-white">
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
                </motion.div>

                <div className="relative">
                    <div className="hidden lg:block absolute top-[60px] left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.15 }}
                                className="relative text-center"
                            >
                                <div className="relative z-10 w-[72px] h-[72px] mx-auto mb-5 rounded-full bg-white border-2 border-accent/30 flex items-center justify-center shadow-[var(--shadow-card)]">
                                    <step.icon size={28} className="text-accent" />
                                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full gradient-gold flex items-center justify-center text-white text-xs font-bold">
                                        {step.number}
                                    </div>
                                </div>
                                <h3 className="font-heading text-lg font-bold text-primary mb-2">{step.title}</h3>
                                <p className="text-sm text-text-muted leading-relaxed mb-3">{step.desc}</p>
                                <span className="inline-block px-3 py-1 rounded-full bg-surface text-xs font-medium text-accent">
                                    {step.time}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
