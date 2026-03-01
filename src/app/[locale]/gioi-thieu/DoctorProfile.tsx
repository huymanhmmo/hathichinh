"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link as IntlLink } from "@/i18n/navigation";
import Image from "next/image";
import { DOCTOR, CONTACT } from "@/lib/constants";
import {
    GraduationCap, Award, BookOpen, Stethoscope, Heart, Calendar,
    Shield, Users, Star, Quote, CheckCircle
} from "lucide-react";

const timelineIcons = [GraduationCap, Award, BookOpen, Star, Heart];
const specialtyIcons = [Stethoscope, Shield, Users, Star];

export default function DoctorProfile() {
    const t = useTranslations("doctorPage");
    const tc = useTranslations("common");

    const timeline = [
        { year: t("timeline1Year"), title: t("timeline1Title"), desc: t("timeline1Desc"), icon: timelineIcons[0] },
        { year: t("timeline2Year"), title: t("timeline2Title"), desc: t("timeline2Desc"), icon: timelineIcons[1] },
        { year: t("timeline3Year"), title: t("timeline3Title"), desc: t("timeline3Desc"), icon: timelineIcons[2] },
        { year: t("timeline4Year"), title: t("timeline4Title"), desc: t("timeline4Desc"), icon: timelineIcons[3] },
        { year: t("timeline5Year"), title: t("timeline5Title"), desc: t("timeline5Desc"), icon: timelineIcons[4] },
    ];

    const specialties = [
        { title: t("spec1Title"), desc: t("spec1Desc"), icon: specialtyIcons[0] },
        { title: t("spec2Title"), desc: t("spec2Desc"), icon: specialtyIcons[1] },
        { title: t("spec3Title"), desc: t("spec3Desc"), icon: specialtyIcons[2] },
        { title: t("spec4Title"), desc: t("spec4Desc"), icon: specialtyIcons[3] },
    ];

    const achievements = [
        t("achievement1"), t("achievement2"), t("achievement3"),
        t("achievement4"), t("achievement5"), t("achievement6"),
    ];

    return (
        <div>
            {/* Hero section */}
            <section className="relative bg-gradient-to-br from-surface via-white to-surface py-16 lg:py-20">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                                <Award size={16} />
                                {tc("doctorFullTitle")} {t("badge")}
                            </span>
                            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
                                {DOCTOR.title} {DOCTOR.name}
                            </h1>
                            <p className="text-xl text-text-muted mb-6">{tc("doctorDescription")}</p>
                            <p className="text-text-muted leading-relaxed mb-8">
                                {t("heroDesc", { name: DOCTOR.name, years: String(DOCTOR.stats.years) })}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <IntlLink href="/dat-lich-kham" className="btn-primary cursor-pointer">
                                    <Calendar size={18} /> {t("bookConsult")}
                                </IntlLink>
                                <a href={CONTACT.phoneLink} className="btn-secondary cursor-pointer">
                                    {t("call", { phone: CONTACT.phone })}
                                </a>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex justify-center"
                        >
                            <div className="relative">
                                <div className="w-[350px] h-[450px] rounded-3xl overflow-hidden shadow-[var(--shadow-gold)] border-4 border-white">
                                    <Image
                                        src="/images/doctor-chinh.jpg"
                                        alt={t("imgAlt", { title: DOCTOR.title, name: DOCTOR.name })}
                                        width={350}
                                        height={450}
                                        className="w-full h-full object-cover"
                                        priority
                                    />
                                </div>
                                <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-2xl bg-accent/10 -z-10" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                            {t("timelineBadge")}
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary">
                            {t("timelineTitle")} <span className="text-gradient-gold">{t("timelineTitleHighlight")}</span>
                        </h2>
                    </motion.div>

                    <div className="relative">
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/20 via-accent/40 to-accent/20 md:-translate-x-px" />

                        <div className="space-y-10">
                            {timeline.map((item, i) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`relative flex items-start gap-6 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                                >
                                    <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-white shadow -translate-x-1/2 mt-1 z-10" />
                                    <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                                        <span className="text-accent font-bold text-sm">{item.year}</span>
                                        <h3 className="font-heading text-lg font-bold text-primary mt-1">{item.title}</h3>
                                        <p className="text-sm text-text-muted mt-1">{item.desc}</p>
                                    </div>
                                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Specialties */}
            <section className="section-padding bg-surface">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                            {t("specialtyBadge")}
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary">
                            {t("specialtyTitle")} <span className="text-gradient-gold">{t("specialtyTitleHighlight")}</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 max-w-5xl mx-auto items-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {specialties.map((spec, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-4 p-6 rounded-2xl bg-white border border-border-light shadow-sm"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                                        <spec.icon size={22} className="text-accent" />
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-lg font-bold text-primary mb-1">{spec.title}</h3>
                                        <p className="text-sm text-text-muted">{spec.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="hidden lg:block"
                        >
                            <Image
                                src="/images/clinic-surgery.png"
                                alt={t("surgeryImgAlt")}
                                width={320}
                                height={240}
                                className="w-[320px] h-auto object-contain"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 overflow-hidden gradient-hero">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Image
                                src="/images/clinic-team.png"
                                alt={t("teamImgAlt")}
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
                            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
                                {t("teamBadge")}
                            </span>
                            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                                {t("teamTitle")} <span className="text-gradient-gold">{t("teamTitleHighlight")}</span>
                            </h2>
                            <p className="text-white/70 leading-relaxed">
                                {t("teamDesc")}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Philosophy + Achievements */}
            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                                {t("philosophyBadge")}
                            </span>
                            <h2 className="font-heading text-2xl font-bold text-primary mb-6">
                                {t("philosophyTitle")}
                            </h2>
                            <blockquote className="relative pl-5 border-l-4 border-accent mb-6">
                                <Quote size={24} className="text-accent/20 mb-2" />
                                <p className="italic text-text-muted leading-relaxed">
                                    &ldquo;{t("philosophyQuote")}&rdquo;
                                </p>
                                <footer className="mt-3 text-sm font-semibold text-primary">
                                    — {DOCTOR.title} {DOCTOR.name}
                                </footer>
                            </blockquote>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                                {t("achievementsBadge")}
                            </span>
                            <h2 className="font-heading text-2xl font-bold text-primary mb-6">
                                {t("achievementsTitle")}
                            </h2>
                            <ul className="space-y-3">
                                {achievements.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: 10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle size={18} className="text-accent shrink-0" />
                                        <span className="text-text-muted">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 gradient-hero">
                <div className="container-custom text-center">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                        {t("ctaTitle")}
                    </h2>
                    <p className="text-white/80 mb-8 max-w-xl mx-auto">
                        {t("ctaDesc", { name: DOCTOR.name })}
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <IntlLink href="/dat-lich-kham" className="btn-primary cursor-pointer">
                            <Calendar size={18} /> {t("ctaBtn")}
                        </IntlLink>
                    </div>
                </div>
            </section>
        </div>
    );
}
