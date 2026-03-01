"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPin, Star, ExternalLink } from "lucide-react";
import { CLINICS } from "@/lib/constants";

export default function ClinicLocations() {
    const t = useTranslations("clinicLocations");
    const tc = useTranslations("common");
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
                        <span className="text-gradient-gold">{t("title")}</span> {t("titleHighlight")}
                    </h2>
                    <p className="text-text-muted max-w-2xl mx-auto">
                        {t("description")}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CLINICS.map((clinic, i) => (
                        <motion.div
                            key={clinic.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className={`relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer group ${clinic.isMain
                                ? "bg-white border-accent/30 shadow-[var(--shadow-gold)] hover:shadow-[var(--shadow-gold-hover)]"
                                : "bg-white border-border hover:border-accent/20 hover:shadow-[var(--shadow-card)]"
                                }`}
                        >
                            {clinic.isMain && (
                                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full gradient-gold text-white text-xs font-medium flex items-center gap-1">
                                    <Star size={12} className="fill-white" />
                                    {t("mainClinic")}
                                </div>
                            )}

                            <div className="flex items-start gap-3 mb-4 mt-1">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${clinic.isMain ? "bg-accent/10" : "bg-primary/5"
                                    }`}>
                                    <MapPin size={18} className={clinic.isMain ? "text-accent" : "text-primary"} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-primary text-lg group-hover:text-accent transition-colors">
                                        {clinic.name}
                                    </h3>
                                    <p className="text-sm text-text-muted mt-1 leading-relaxed">{clinic.address}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-border-light">
                                <span className="text-xs font-medium text-text-muted px-2.5 py-1 rounded-full bg-surface">
                                    {clinic.city}
                                </span>
                                <a
                                    href={`https://maps.google.com/?q=${encodeURIComponent(clinic.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-xs font-medium text-accent hover:underline cursor-pointer"
                                >
                                    {tc("viewMap")} <ExternalLink size={12} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
