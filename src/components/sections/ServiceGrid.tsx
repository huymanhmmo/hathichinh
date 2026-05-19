"use client";

import { motion } from "framer-motion";
import { Link as IntlLink } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { SERVICES, SERVICE_KEY_MAP, SUB_SERVICE_KEY_MAP } from "@/lib/constants";
import { Stethoscope, Smile, Sparkles, Scissors, Heart, Baby, Sun, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
    implant: Stethoscope,
    orthodontic: Smile,
    veneer: Sparkles,
    surgery: Scissors,
    endodontic: Heart,
    pediatric: Baby,
    whitening: Sun,
};

export default function ServiceGrid() {
    const t = useTranslations("services");

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
                    <p className="text-text-muted max-w-2xl mx-auto">
                        {t("description")}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {SERVICES.map((service, index) => {
                        const Icon = iconMap[service.icon] || Stethoscope;
                        const svcKey = SERVICE_KEY_MAP[service.slugs.vi] || service.slugs.vi;
                        return (
                            <motion.div
                                key={service.slugs.vi}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                            >
                                <IntlLink
                                    href={{ pathname: '/dich-vu/[slug]', params: { slug: service.slugs.vi } }}
                                    className={`block p-6 rounded-2xl border transition-all duration-300 cursor-pointer group h-full ${service.featured
                                        ? "bg-white border-accent/20 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-gold)] hover:border-accent/40"
                                        : "bg-white border-border hover:shadow-[var(--shadow-card)] hover:border-accent/20"
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${service.featured ? "bg-accent/10 group-hover:bg-accent/20" : "bg-primary/5 group-hover:bg-accent/10"
                                        }`}>
                                        <Icon size={22} className={service.featured ? "text-accent" : "text-primary group-hover:text-accent transition-colors"} />
                                    </div>
                                    <h3 className="font-heading text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                                        {t(svcKey as any)}
                                    </h3>
                                    <p className="text-sm text-text-muted leading-relaxed mb-4">
                                        {t(`${svcKey}Desc` as any)}
                                    </p>
                                    {service.subServices.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {service.subServices.slice(0, 3).map((sub) => {
                                                const subKey = SUB_SERVICE_KEY_MAP[`${service.slugs.vi}/${sub.slugs.vi}`] || sub.slugs.vi;
                                                return (
                                                    <span key={sub.slugs.vi} className="text-xs px-2.5 py-1 rounded-full bg-surface text-text-muted">
                                                        {t(subKey as any)}
                                                    </span>
                                                );
                                            })}
                                            {service.subServices.length > 3 && (
                                                <span className="text-xs px-2.5 py-1 rounded-full bg-surface text-text-muted">
                                                    +{service.subServices.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                                        {t.rich("titleHighlight", {})} <ArrowRight size={14} />
                                    </div>
                                </IntlLink>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="text-center mt-10"
                >
                    <IntlLink href="/dich-vu" className="btn-secondary cursor-pointer">
                        {t("badge")}
                        <ArrowRight size={16} />
                    </IntlLink>
                </motion.div>
            </div>
        </section>
    );
}

