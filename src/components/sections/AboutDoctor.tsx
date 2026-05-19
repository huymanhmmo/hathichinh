"use client";

import { motion } from "framer-motion";

import { Link as IntlLink } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { DOCTOR } from "@/lib/constants";
import { GraduationCap, Award, BookOpen, Stethoscope, ArrowRight } from "lucide-react";

export default function AboutDoctor() {
    const t = useTranslations("about");
    const tc = useTranslations("common");

    const highlights = [
        { icon: GraduationCap, title: t("edu"), desc: t("eduSub") },
        { icon: BookOpen, title: t("lecturer"), desc: t("lecturerSub") },
        { icon: Award, title: t("master"), desc: t("masterSub") },
        { icon: Stethoscope, title: t("specialist"), desc: t("specialistSub") },
    ];

    return (
        <section className="section-padding bg-surface">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative w-full max-w-[400px] mx-auto">
                            <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-white shadow-[var(--shadow-card)] border border-border-light">
                                <Image
                                    src="/images/doctor-chinh.jpg"
                                    alt={`${DOCTOR.title} ${DOCTOR.name}`}
                                    width={400}
                                    height={533}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Decorative accent */}
                            <div className="absolute -bottom-3 -right-3 w-24 h-24 rounded-2xl bg-accent/10 -z-10" />
                            <div className="absolute -top-3 -left-3 w-16 h-16 rounded-2xl bg-primary/5 -z-10" />
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                            {t("badge")}
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-6">
                            {DOCTOR.title} {DOCTOR.name}
                        </h2>
                        <p className="text-text-muted leading-relaxed mb-6">
                            {tc("doctorDescription")}
                        </p>

                        {/* Personal quote */}
                        <blockquote className="relative pl-5 border-l-4 border-accent mb-8 italic text-text-muted">
                            &ldquo;{t("quote")}&rdquo;
                        </blockquote>

                        {/* Highlights grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {highlights.map((item, i) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border border-border-light"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                                        <item.icon size={18} className="text-accent" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-primary leading-tight">{item.title}</div>
                                        <div className="text-xs text-text-muted">{item.desc}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <IntlLink href="/gioi-thieu" className="btn-primary cursor-pointer">
                            {t("moreBtn")}
                            <ArrowRight size={16} />
                        </IntlLink>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
