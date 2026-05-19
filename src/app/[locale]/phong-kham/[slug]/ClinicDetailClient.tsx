"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link as IntlLink } from "@/i18n/navigation";
import { MapPin, Phone, Mail, Clock, Navigation, Calendar, Star, CheckCircle } from "lucide-react";
import Image from "next/image";
import { CLINICS, CONTACT, SERVICES, SERVICE_KEY_MAP } from "@/lib/constants";

interface Props {
    slug: string;
}

export default function ClinicDetailClient({ slug }: Props) {
    const locale = useLocale();
    const t = useTranslations("clinicDetailPage");
    const tSvc = useTranslations("services");
    const tCommon = useTranslations("common");

    const clinic = CLINICS.find((c) => c.slugs.vi === slug || c.slugs.en === slug);
    if (!clinic) return null;

    const introKey = `${slug}_intro` as Parameters<typeof t>[0];
    const featuredServices = SERVICES.filter((s) => s.featured);

    const contactCards = [
        { icon: MapPin, label: t("address"), value: clinic.address, href: clinic.mapUrl },
        { icon: Phone, label: t("phone"), value: CONTACT.phone, href: CONTACT.phoneLink },
        { icon: Mail, label: t("email"), value: CONTACT.email, href: `mailto:${CONTACT.email}` },
        { icon: Clock, label: t("hours"), value: tCommon("workingHours") },
    ];

    return (
        <div>
            {/* Hero */}
            <section className="py-12 bg-gradient-to-br from-surface to-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            {clinic.isMain && (
                                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                                    <Star size={14} className="fill-accent" /> {t("mainBadge")}
                                </span>
                            )}
                            <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
                                {clinic.name}
                            </h1>
                            <p className="text-text-muted leading-relaxed mb-6">
                                {t(introKey)}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <IntlLink href="/dat-lich-kham" className="btn-primary cursor-pointer">
                                    <Calendar size={18} /> {t("ctaBtn")}
                                </IntlLink>
                                {clinic.mapUrl && (
                                    <a href={clinic.mapUrl} target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-primary hover:border-accent hover:text-accent transition-colors font-medium">
                                        <Navigation size={16} /> {t("directions")}
                                    </a>
                                )}
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-card)]"
                        >
                            <Image
                                src={`/images/clinics/${clinic.id}.png`}
                                alt={clinic.name}
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {contactCards.map((card, i) => (
                            <motion.div
                                key={card.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="p-5 rounded-2xl bg-surface border border-border-light text-center"
                            >
                                <div className="w-12 h-12 rounded-xl gradient-gold mx-auto mb-3 flex items-center justify-center text-white">
                                    <card.icon size={20} />
                                </div>
                                <div className="text-xs text-text-muted mb-1">{card.label}</div>
                                {card.href ? (
                                    <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined}
                                        rel="noopener noreferrer"
                                        className="text-sm font-semibold text-primary hover:text-accent transition-colors">
                                        {card.value}
                                    </a>
                                ) : (
                                    <div className="text-sm font-semibold text-primary">{card.value}</div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="section-padding bg-surface">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="font-heading text-3xl font-bold text-primary">
                            {t("servicesTitle")} <span className="text-gradient-gold">{t("servicesHighlight")}</span>
                        </h2>
                        <p className="text-text-muted mt-2">{t("servicesDesc")}</p>
                    </motion.div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {featuredServices.map((svc, i) => {
                            const svcKey = SERVICE_KEY_MAP[svc.slugs.vi] || svc.slugs.vi;
                            const currentSvcSlug = locale === "en" ? svc.slugs.en : svc.slugs.vi;
                            return (
                                <motion.div
                                    key={svc.slugs.vi}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 }}
                                >
                                    <IntlLink
                                        href={`/dich-vu/${currentSvcSlug}`}
                                        className="block p-5 rounded-2xl bg-white border border-border-light shadow-sm hover:shadow-[var(--shadow-card)] transition-all group"
                                    >
                                        <h3 className="font-heading text-base font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                                            {tSvc(svcKey as any)} {/* eslint-disable-line @typescript-eslint/no-explicit-any */}
                                        </h3>
                                        <p className="text-sm text-text-muted line-clamp-2">
                                            {tSvc(`${svcKey}Desc`)}
                                        </p>
                                        {svc.subServices.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-1.5">
                                                {svc.subServices.slice(0, 3).map((sub) => (
                                                    <span key={sub.slugs.vi} className="text-xs px-2 py-0.5 bg-accent/5 text-accent rounded-full">
                                                        {sub.title}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </IntlLink>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Equipment & Team */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {[
                            {
                                title: t("equipmentTitle"),
                                highlight: t("equipmentHighlight"),
                                desc: t("equipmentDesc"),
                                img: "/images/clinic-equipment.png",
                                alt: t("equipmentImgAlt"),
                            },
                            {
                                title: t("teamTitle"),
                                highlight: t("teamHighlight"),
                                desc: t("teamDesc"),
                                img: "/images/clinic-team.png",
                                alt: t("teamImgAlt"),
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="rounded-2xl overflow-hidden border border-border-light shadow-sm hover:shadow-[var(--shadow-card)] transition-shadow"
                            >
                                {/* Fixed aspect ratio image */}
                                <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
                                    <Image
                                        src={item.img}
                                        alt={item.alt}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                {/* Content with consistent padding */}
                                <div className="p-6">
                                    <h2 className="font-heading text-xl font-bold text-primary mb-3">
                                        {item.title} <span className="text-gradient-gold">{item.highlight}</span>
                                    </h2>
                                    <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why choose */}
            <section className="section-padding bg-surface">
                <div className="container-custom max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <h2 className="font-heading text-2xl font-bold text-primary">
                            {t("ctaTitle")} <span className="text-gradient-gold">{clinic.name}</span>
                        </h2>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                        {[
                            "Bác sĩ hơn 15 năm kinh nghiệm",
                            "Trang thiết bị hiện đại",
                            "Vật liệu chính hãng",
                            "Bảo hành dài hạn",
                            "Tư vấn miễn phí",
                            "Trả góp 0% lãi suất",
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-3 p-4 rounded-xl bg-white border border-border-light"
                            >
                                <CheckCircle size={18} className="text-accent shrink-0" />
                                <span className="text-sm text-primary font-medium">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                    <div className="text-center">
                        <IntlLink href="/dat-lich-kham" className="btn-primary cursor-pointer">
                            <Calendar size={18} /> {t("ctaBtn")}
                        </IntlLink>
                        <p className="text-xs text-text-muted mt-3">{t("ctaDesc")}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
