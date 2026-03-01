"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link as IntlLink } from "@/i18n/navigation";
import { Calendar, Phone, Award, Users, Clock, Star } from "lucide-react";
import { DOCTOR, CONTACT } from "@/lib/constants";

export default function Hero() {
    const t = useTranslations("hero");
    const tc = useTranslations("common");

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-surface via-white to-surface">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal/3 rounded-full blur-3xl" />
            </div>

            <div className="container-custom relative z-10 py-16 lg:py-0">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6"
                        >
                            <Award size={16} />
                            <span>{t("badge")}</span>
                        </motion.div>

                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
                            {t("title1")},<br />
                            <span className="text-gradient-gold">{t("title2")}</span>
                        </h1>

                        <p className="text-lg text-text-muted leading-relaxed mb-8 max-w-lg">
                            {t("description")}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mb-10">
                            <IntlLink href="/dat-lich-kham" className="btn-primary cursor-pointer">
                                <Calendar size={18} />
                                {t("bookBtn")}
                            </IntlLink>
                            <a href={CONTACT.phoneLink} className="btn-secondary cursor-pointer">
                                <Phone size={18} />
                                {CONTACT.phone}
                            </a>
                        </div>

                        {/* Mini stats */}
                        <div className="flex flex-wrap gap-6">
                            {[
                                { icon: Clock, value: `${DOCTOR.stats.years}+`, label: tc("yearsExp") },
                                { icon: Users, value: `${(DOCTOR.stats.cases / 1000).toFixed(0)}K+`, label: tc("cases") },
                                { icon: Star, value: `${DOCTOR.stats.satisfaction}%`, label: tc("satisfaction") },
                            ].map((stat) => (
                                <div key={stat.label} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                                        <stat.icon size={18} className="text-accent" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-primary text-lg leading-tight">{stat.value}</div>
                                        <div className="text-xs text-text-muted">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Doctor Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="relative flex justify-center"
                    >
                        <div className="relative">
                            {/* Main image container */}
                            <div className="w-[320px] h-[420px] md:w-[380px] md:h-[500px] lg:w-[420px] lg:h-[540px] rounded-[2rem] overflow-hidden shadow-[var(--shadow-gold)] border-4 border-white">
                                <Image
                                    src="/images/doctor-chinh.jpg"
                                    alt={`${DOCTOR.title} ${DOCTOR.name}`}
                                    width={420}
                                    height={540}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>

                            {/* Floating badges */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 shadow-[var(--shadow-card)] border border-border-light"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                                        <Award size={16} className="text-success" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-text-muted">{t("edu1")}</div>
                                        <div className="text-sm font-semibold text-primary">{t("edu1Sub")}</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1, duration: 0.5 }}
                                className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 shadow-[var(--shadow-card)] border border-border-light"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                                        <Star size={16} className="text-accent" />
                                    </div>
                                    <div>
                                        <div className="text-xs text-text-muted">{t("edu2")}</div>
                                        <div className="text-sm font-semibold text-primary">{t("edu2Sub")}</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Decorative ring */}
                            <div className="absolute -inset-6 rounded-[3rem] border-2 border-dashed border-accent/20 pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
