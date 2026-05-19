"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link as IntlLink } from "@/i18n/navigation";
import { SERVICES, SERVICE_KEY_MAP, SUB_SERVICE_KEY_MAP } from "@/lib/constants";
import { ArrowRight, Layers } from "lucide-react";

export default function ServiceListClient() {
    const t = useTranslations("serviceListPage");
    const tSvc = useTranslations("services");

    return (
        <div>
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SERVICES.map((service, i) => {
                            const svcKey = SERVICE_KEY_MAP[service.slugs.vi] || service.slugs.vi;
                            return (
                                <motion.div
                                    key={service.slugs.vi}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                >
                                    <IntlLink
                                        href={{ pathname: '/dich-vu/[slug]', params: { slug: service.slugs.vi } }}
                                        className="block p-6 rounded-2xl bg-white border border-border-light shadow-sm hover:shadow-[var(--shadow-card)] transition-all cursor-pointer group h-full"
                                    >
                                        <div className="w-14 h-14 rounded-xl gradient-gold flex items-center justify-center text-white mb-5 shadow-[var(--shadow-gold)]">
                                            <Layers size={24} />
                                        </div>
                                        <h2 className="font-heading text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                                            {tSvc(svcKey as any)}
                                        </h2>
                                        <p className="text-sm text-text-muted leading-relaxed mb-4">
                                            {tSvc(`${svcKey}Desc`)}
                                        </p>
                                        {service.subServices && service.subServices.length > 0 && (
                                            <div className="mb-4">
                                                <div className="text-xs font-medium text-accent mb-2">{t("subServicesLabel")}:</div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {service.subServices.map((sub) => {
                                                        const subKey = SUB_SERVICE_KEY_MAP[`${service.slugs.vi}/${sub.slugs.vi}`] || sub.slugs.vi;
                                                        return (
                                                            <span key={sub.slugs.vi} className="text-xs px-2 py-1 rounded-full bg-surface text-text-muted">
                                                                {tSvc(subKey as any)}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                        <span className="text-sm font-medium text-accent flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {t("learnMore")} <ArrowRight size={14} />
                                        </span>
                                    </IntlLink>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}

