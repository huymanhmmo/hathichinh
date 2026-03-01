"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link as IntlLink } from "@/i18n/navigation";
import { CLINICS, SERVICES, CONTACT, SERVICE_KEY_MAP } from "@/lib/constants";
import {
    Calendar, User, Phone, Mail, MessageSquare, Clock, CheckCircle,
    MapPin, Shield, Send, Sparkles
} from "lucide-react";

const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
];

export default function BookingForm() {
    const t = useTranslations("booking");
    const tSvc = useTranslations("services");
    const [form, setForm] = useState({
        name: "", phone: "", email: "", service: "", clinic: "", date: "", time: "", notes: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center max-w-md mx-auto p-10"
                >
                    <div className="w-20 h-20 rounded-full gradient-gold mx-auto mb-6 flex items-center justify-center">
                        <CheckCircle size={40} className="text-white" />
                    </div>
                    <h2 className="font-heading text-3xl font-bold text-primary mb-3">{t("successTitle")}</h2>
                    <p className="text-text-muted mb-6">{t("successDesc")}</p>
                    <IntlLink href="/" className="btn-primary cursor-pointer">
                        {t("backHome")}
                    </IntlLink>
                </motion.div>
            </div>
        );
    }

    return (
        <div>
            {/* Hero */}
            <section className="py-12 bg-gradient-to-br from-surface to-white">
                <div className="container-custom text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                        <Sparkles size={16} />
                        {t("freeBadge")}
                    </span>
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
                        {t("heroTitle")} <span className="text-gradient-gold">{t("heroTitleHighlight")}</span>
                    </h1>
                    <p className="text-text-muted max-w-xl mx-auto text-lg">
                        {t("heroDesc")}
                    </p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-5xl">
                    <div className="grid lg:grid-cols-[1fr_340px] gap-10">
                        {/* Form */}
                        <motion.form
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-5"
                        >
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-sm font-medium text-primary mb-1.5 block">{t("name")} *</label>
                                    <div className="relative">
                                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                                        <input type="text" name="name" required value={form.name} onChange={handleChange}
                                            placeholder={t("namePlaceholder")}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white focus:border-accent outline-none transition-colors" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-primary mb-1.5 block">{t("phone")} *</label>
                                    <div className="relative">
                                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                                        <input type="tel" name="phone" required value={form.phone} onChange={handleChange}
                                            placeholder={t("phonePlaceholder")}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white focus:border-accent outline-none transition-colors" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-primary mb-1.5 block">{t("email")}</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                                    <input type="email" name="email" value={form.email} onChange={handleChange}
                                        placeholder="email@example.com"
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-white focus:border-accent outline-none transition-colors" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-sm font-medium text-primary mb-1.5 block">{t("service")}</label>
                                    <select name="service" value={form.service} onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:border-accent outline-none transition-colors cursor-pointer">
                                        <option value="">{t("selectService")}</option>
                                        {SERVICES.map((s) => {
                                            const svcKey = SERVICE_KEY_MAP[s.slug] || s.slug;
                                            return (
                                                <option key={s.slug} value={s.slug}>{tSvc(svcKey)}</option>
                                            );
                                        })}
                                        <option value="khac">{t("otherService")}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-primary mb-1.5 block">{t("clinic")}</label>
                                    <select name="clinic" value={form.clinic} onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:border-accent outline-none transition-colors cursor-pointer">
                                        <option value="">{t("clinic")}</option>
                                        {CLINICS.map((c) => (
                                            <option key={c.name} value={c.name}>{c.name} – {c.address}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label className="text-sm font-medium text-primary mb-1.5 block">{t("date")}</label>
                                    <input type="date" name="date" value={form.date} onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:border-accent outline-none transition-colors cursor-pointer" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-primary mb-1.5 block">{t("time")}</label>
                                    <select name="time" value={form.time} onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:border-accent outline-none transition-colors cursor-pointer">
                                        <option value="">{t("selectTime")}</option>
                                        {timeSlots.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-primary mb-1.5 block">{t("notes")}</label>
                                <textarea name="notes" rows={3} value={form.notes} onChange={handleChange}
                                    placeholder={t("notesPlaceholder")}
                                    className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:border-accent outline-none transition-colors resize-none" />
                            </div>

                            <button type="submit" className="btn-primary w-full cursor-pointer !py-4 text-base">
                                <Send size={18} /> {t("submit")}
                            </button>
                        </motion.form>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="p-6 rounded-2xl bg-surface border border-border-light">
                                <h3 className="font-heading text-lg font-bold text-primary mb-4">{t("quickContact")}</h3>
                                <div className="space-y-4">
                                    <a href={CONTACT.phoneLink} className="flex items-center gap-3 text-primary hover:text-accent transition-colors">
                                        <Phone size={18} className="text-accent" />
                                        <div>
                                            <div className="text-xs text-text-muted">{t("callLabel")}</div>
                                            <div className="font-semibold">{CONTACT.phone}</div>
                                        </div>
                                    </a>
                                    <a href={CONTACT.zalo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-primary hover:text-accent transition-colors">
                                        <MessageSquare size={18} className="text-accent" />
                                        <div>
                                            <div className="text-xs text-text-muted">{t("zaloLabel")}</div>
                                            <div className="font-semibold">{t("zaloChat")}</div>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20">
                                <h3 className="font-heading text-lg font-bold text-primary mb-4">{t("commitTitle")}</h3>
                                <ul className="space-y-3">
                                    {[t("commit1"), t("commit2"), t("commit3"), t("commit4")].map((item) => (
                                        <li key={item} className="flex items-center gap-2 text-sm text-text-muted">
                                            <CheckCircle size={14} className="text-accent shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
