"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link as IntlLink } from "@/i18n/navigation";
import Image from "next/image";
import { CLINICS, CONTACT } from "@/lib/constants";
import { Phone, Mail, Clock, MapPin, Navigation, Send, User, MessageSquare } from "lucide-react";

export default function ContactClient() {
    const t = useTranslations("contact");
    const tc = useTranslations("common");

    const contactCards = [
        { icon: Phone, label: t("phone"), value: CONTACT.phone, href: CONTACT.phoneLink },
        { icon: Mail, label: t("email"), value: CONTACT.email, href: `mailto:${CONTACT.email}` },
        { icon: Clock, label: t("hours"), value: tc("workingHours"), href: null },
    ];

    const [msgForm, setMsgForm] = useState({ name: "", phone: "", message: "" });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMsgForm({ ...msgForm, [e.target.name]: e.target.value });
    };

    return (
        <div>
            {/* Hero */}
            <section className="py-12 bg-gradient-to-br from-surface to-white">
                <div className="container-custom text-center">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
                        {t("title")} <span className="text-gradient-gold">{t("titleHighlight")}</span>
                    </h1>
                    <p className="text-text-muted max-w-xl mx-auto text-lg">
                        {t("subtitle", { count: String(CLINICS.length) })}
                    </p>
                </div>
            </section>

            {/* Contact cards */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {contactCards.map((card) => (
                            <motion.div
                                key={card.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="p-6 rounded-2xl bg-surface border border-border-light text-center"
                            >
                                <div className="w-14 h-14 rounded-xl gradient-gold mx-auto mb-4 flex items-center justify-center text-white">
                                    <card.icon size={24} />
                                </div>
                                <div className="text-sm text-text-muted mb-1">{card.label}</div>
                                {card.href ? (
                                    <a href={card.href} className="font-semibold text-primary hover:text-accent transition-colors">
                                        {card.value}
                                    </a>
                                ) : (
                                    <div className="font-semibold text-primary">{card.value}</div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Equipment Photo Section */}
            <section className="gradient-hero py-12 overflow-hidden">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-center lg:text-left order-2 lg:order-1"
                        >
                            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                                {t("equipmentTitle")}
                            </h2>
                            <p className="text-white/70 leading-relaxed">
                                {t("equipmentDesc")}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2"
                        >
                            <Image
                                src="/images/clinic-equipment.png"
                                alt={t("equipmentImgAlt")}
                                width={500}
                                height={650}
                                className="w-full max-w-[400px] mx-auto h-auto object-contain"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Clinics grid */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="font-heading text-3xl font-bold text-primary">
                            {t("clinicSystem")} <span className="text-gradient-gold">{t("clinicSystemHighlight")}</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CLINICS.map((clinic, i) => (
                            <motion.div
                                key={clinic.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="p-6 rounded-2xl bg-white border border-border-light shadow-sm hover:shadow-[var(--shadow-card)] transition-shadow"
                            >
                                {clinic.isMain && (
                                    <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-3">
                                        {t("mainBadge")}
                                    </span>
                                )}
                                <h3 className="font-heading text-lg font-bold text-primary mb-2">{clinic.name}</h3>
                                <div className="flex items-start gap-2 text-sm text-text-muted mb-3">
                                    <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                                    {clinic.address}
                                </div>
                                <a
                                    href={clinic.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                                >
                                    <Navigation size={12} />
                                    {t("directions")}
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quick message form */}
            <section className="section-padding bg-surface">
                <div className="container-custom max-w-xl">
                    <h2 className="font-heading text-2xl font-bold text-primary text-center mb-8">{t("quickForm")}</h2>
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="text-sm font-medium text-primary mb-1.5 block">{t("nameLabel")}</label>
                            <input type="text" name="name" value={msgForm.name} onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:border-accent outline-none transition-colors" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-primary mb-1.5 block">{t("phoneLabel")}</label>
                            <input type="tel" name="phone" value={msgForm.phone} onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:border-accent outline-none transition-colors" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-primary mb-1.5 block">{t("messageLabel")}</label>
                            <textarea name="message" rows={4} value={msgForm.message} onChange={handleChange}
                                placeholder={t("messagePlaceholder")}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:border-accent outline-none transition-colors resize-none" />
                        </div>
                        <button type="submit" className="btn-primary w-full cursor-pointer">
                            <Send size={16} /> {t("sendMessage")}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
