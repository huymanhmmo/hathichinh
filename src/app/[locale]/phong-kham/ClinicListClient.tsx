"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link as IntlLink } from "@/i18n/navigation";
import { MapPin, ArrowRight, Calendar, Star } from "lucide-react";
import Image from "next/image";
import { CLINICS } from "@/lib/constants";

export default function ClinicListClient() {
    const t = useTranslations("clinicListPage");

    return (
        <div>
            {/* Hero */}
            <section className="py-12 bg-gradient-to-br from-surface to-white">
                <div className="container-custom text-center">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
                        {t("title")} <span className="text-gradient-gold">{t("titleHighlight")}</span>
                    </h1>
                    <p className="text-text-muted max-w-xl mx-auto text-lg">{t("subtitle")}</p>
                </div>
            </section>

            {/* Clinic grid */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {CLINICS.map((clinic, i) => (
                            <motion.div
                                key={clinic.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group"
                            >
                                <IntlLink href={{ pathname: '/phong-kham/[slug]', params: { slug: clinic.slugs.vi } }} className="block">
                                    <div className="rounded-2xl overflow-hidden border border-border-light shadow-sm hover:shadow-[var(--shadow-card)] transition-all duration-300">
                                        {/* Image */}
                                        <div className="relative h-48 overflow-hidden">
                                            <Image
                                                src={`/images/clinics/${clinic.id}.png`}
                                                alt={clinic.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {clinic.isMain && (
                                                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent/90 text-white text-xs font-medium backdrop-blur-sm">
                                                    <Star size={12} className="inline mr-1 fill-white" />
                                                    {t("mainBadge")}
                                                </span>
                                            )}
                                        </div>
                                        {/* Content */}
                                        <div className="p-5">
                                            <h3 className="font-heading text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                                                {clinic.name}
                                            </h3>
                                            <div className="flex items-start gap-2 text-sm text-text-muted mb-4">
                                                <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                                                {clinic.address}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                                                    {t("viewDetail")} <ArrowRight size={14} />
                                                </span>
                                                <span className="text-xs text-text-muted bg-surface px-2 py-1 rounded-lg">
                                                    {clinic.city}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </IntlLink>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding gradient-hero">
                <div className="container-custom text-center">
                    <h2 className="font-heading text-3xl font-bold text-white mb-4">
                        {t("bookAtClinic")}
                    </h2>
                    <IntlLink href="/dat-lich-kham" className="btn-primary !bg-white !text-primary hover:!bg-accent hover:!text-white cursor-pointer">
                        <Calendar size={18} /> {t("bookAtClinic")}
                    </IntlLink>
                </div>
            </section>
        </div>
    );
}
