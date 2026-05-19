"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link as IntlLink } from "@/i18n/navigation";
import { CONTACT, SERVICES, SERVICE_KEY_MAP, SUB_SERVICE_KEY_MAP } from "@/lib/constants";
import {
    Calendar, ChevronDown, CheckCircle, ArrowRight, Sparkles,
    ClipboardCheck, Scan, Wrench, ShieldCheck, Phone
} from "lucide-react";

const processIcons = [ClipboardCheck, Scan, Wrench, ShieldCheck];

export default function ServiceDetailClient({ slug }: { slug: string }) {
    const t = useTranslations("serviceDetailPage");
    const tSvc = useTranslations("services");
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const service = SERVICES.find((s) => s.slugs.vi === slug || s.slugs.en === slug);
    if (!service) return null;

    const svcKey = SERVICE_KEY_MAP[service.slugs.vi] || service.slugs.vi;
    const serviceTitle = tSvc(svcKey as any);

    const processSteps = [
        { icon: processIcons[0], title: t("processStep1"), desc: t("processStep1Desc") },
        { icon: processIcons[1], title: t("processStep2"), desc: t("processStep2Desc") },
        { icon: processIcons[2], title: t("processStep3"), desc: t("processStep3Desc") },
        { icon: processIcons[3], title: t("processStep4"), desc: t("processStep4Desc") },
    ];

    const advantages = [t("adv1"), t("adv2"), t("adv3"), t("adv4"), t("adv5"), t("adv6")];

    const faqs = [
        { q: t("faqQ1", { service: serviceTitle }), a: t("faqA1", { service: serviceTitle }) },
        { q: t("faqQ2", { service: serviceTitle }), a: t("faqA2", { service: serviceTitle }) },
        { q: t("faqQ3", { service: serviceTitle }), a: t("faqA3", { service: serviceTitle }) },
    ];

    return (
        <div>
            {/* Hero */}
            <section className="py-16 bg-gradient-to-br from-surface via-white to-surface">
                <div className="container-custom text-center">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
                        {serviceTitle}
                    </h1>
                    <p className="text-text-muted max-w-2xl mx-auto text-lg mb-8">
                        {tSvc(`${svcKey}Desc`)}
                    </p>
                    <IntlLink href="/dat-lich-kham" className="btn-primary cursor-pointer">
                        <Calendar size={18} /> {t("bookConsult")}
                    </IntlLink>
                </div>
            </section>

            {/* Sub-services */}
            {service.subServices && service.subServices.length > 0 && (
                <section className="section-padding bg-white">
                    <div className="container-custom">
                        <h2 className="font-heading text-3xl font-bold text-primary text-center mb-10">
                            {t("methodsTitle")} <span className="text-gradient-gold">{serviceTitle.toLowerCase()}</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {service.subServices.map((sub, i) => {
                                const subKey = SUB_SERVICE_KEY_MAP[`${service.slugs.vi}/${sub.slugs.vi}`] || sub.slugs.vi;
                                return (
                                    <motion.div
                                        key={sub.slugs.vi}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 }}
                                        className="p-6 rounded-2xl bg-surface border border-border-light"
                                    >
                                        <h3 className="font-heading text-lg font-bold text-primary">{tSvc(subKey as any)}</h3>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Process */}
            <section className="section-padding bg-surface">
                <div className="container-custom max-w-4xl">
                    <h2 className="font-heading text-3xl font-bold text-primary text-center mb-10">
                        {t("processTitle")} <span className="text-gradient-gold">{t("processTitleHighlight")}</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {processSteps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center p-6 rounded-2xl bg-white border border-border-light"
                            >
                                <div className="w-14 h-14 rounded-xl gradient-gold mx-auto mb-4 flex items-center justify-center text-white shadow-[var(--shadow-gold)]">
                                    <step.icon size={24} />
                                </div>
                                <h3 className="font-heading font-bold text-primary mb-2">{step.title}</h3>
                                <p className="text-sm text-text-muted">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Advantages */}
            <section className="section-padding bg-white">
                <div className="container-custom max-w-3xl">
                    <h2 className="font-heading text-3xl font-bold text-primary text-center mb-10">
                        {t("whyChoose")} <span className="text-gradient-gold">{t("whyChooseHighlight")}</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {advantages.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-3 p-4 rounded-xl bg-surface"
                            >
                                <CheckCircle size={18} className="text-accent shrink-0" />
                                <span className="text-text-muted">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section-padding bg-surface">
                <div className="container-custom max-w-3xl">
                    <h2 className="font-heading text-3xl font-bold text-primary text-center mb-10">
                        {t("faqTitle")}
                    </h2>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className="rounded-xl border border-border-light overflow-hidden bg-white">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-surface/50 transition-colors"
                                >
                                    <span className="font-semibold text-primary pr-4">{faq.q}</span>
                                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                        <ChevronDown size={18} className="text-accent" />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 pb-4 text-sm text-text-muted leading-relaxed border-t border-border-light pt-3">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 gradient-hero">
                <div className="container-custom text-center">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                        {t("ctaTitle", { service: serviceTitle })}
                    </h2>
                    <p className="text-white/80 mb-8">{t("ctaDesc")}</p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <IntlLink href="/dat-lich-kham" className="btn-primary cursor-pointer">
                            <Calendar size={18} /> {t("ctaBtn")}
                        </IntlLink>
                        <a href={CONTACT.phoneLink} className="btn-secondary cursor-pointer !border-white/30 !text-white hover:!bg-white/10">
                            <Phone size={18} /> {CONTACT.phone}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
