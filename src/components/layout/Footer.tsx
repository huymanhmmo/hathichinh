"use client";

import { Link as IntlLink } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin, Clock, Facebook, ChevronRight } from "lucide-react";
import { CONTACT, CLINICS, SERVICES, SITE_NAME } from "@/lib/constants";

export default function Footer() {
    const t = useTranslations("footer");
    const tn = useTranslations("nav");
    const tSvc = useTranslations("services");
    const tc = useTranslations("common");

    const serviceKeyMap: Record<string, string> = {
        "cay-ghep-implant": "implant",
        "nieng-rang": "ortho",
        "rang-su-tham-my": "veneer",
        "phau-thuat-trong-mieng": "surgery",
        "dieu-tri-noi-nha": "endo",
        "nha-khoa-tre-em": "pediatric",
        "tay-trang-rang": "whitening",
    };

    return (
        <footer className="bg-primary text-white/90">
            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Column 1: About */}
                    <div>
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#C5A55A]">
                                <Image
                                    src="/images/doctor-logo.png"
                                    alt="Bs. Hà Thị Chinh"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="font-heading font-bold text-white text-lg">{SITE_NAME}</div>
                                <div className="text-xs text-white/60">{t("aboutDesc").substring(0, 25)}...</div>
                            </div>
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed mb-5">
                            {t("aboutDesc")}
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href={CONTACT.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors cursor-pointer"
                                aria-label="Facebook"
                            >
                                <Facebook size={16} />
                            </a>
                            <a
                                href={CONTACT.zalo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors cursor-pointer text-xs font-bold"
                                aria-label="Zalo"
                            >
                                ZL
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Services */}
                    <div>
                        <h3 className="font-heading font-bold text-white text-lg mb-5">{t("services")}</h3>
                        <ul className="space-y-2.5">
                            {SERVICES.map((service) => (
                                <li key={service.slugs.vi}>
                                    <IntlLink
                                        href={{ pathname: '/dich-vu/[slug]', params: { slug: service.slugs.vi } }}
                                        className="flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors cursor-pointer group"
                                    >
                                        <ChevronRight size={14} className="text-accent/50 group-hover:text-accent transition-colors" />
                                        {tSvc(serviceKeyMap[service.slugs.vi] || service.slugs.vi as any)}
                                    </IntlLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div>
                        <h3 className="font-heading font-bold text-white text-lg mb-5">{t("quickLinks")}</h3>
                        <ul className="space-y-2.5">
                            {([
                                { label: tn("about"), href: "/gioi-thieu" },
                                { label: tn("process"), href: "/quy-trinh-dieu-tri" },
                                { label: tn("results"), href: "/ket-qua-dieu-tri" },
                                { label: tn("pricing"), href: "/bang-gia" },
                                { label: tn("blog"), href: "/blog" },
                                { label: tn("reviews"), href: "/danh-gia" },
                                { label: tn("faq"), href: "/hoi-dap" },
                                { label: tn("booking"), href: "/dat-lich-kham" },
                            ] as const).map((link) => (
                                <li key={link.href}>
                                    <IntlLink
                                        href={link.href}
                                        className="flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors cursor-pointer group"
                                    >
                                        <ChevronRight size={14} className="text-accent/50 group-hover:text-accent transition-colors" />
                                        {link.label}
                                    </IntlLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h3 className="font-heading font-bold text-white text-lg mb-5">{tn("contact")}</h3>
                        <div className="space-y-4">
                            <a href={CONTACT.phoneLink} className="flex items-start gap-3 text-sm text-white/70 hover:text-accent transition-colors cursor-pointer">
                                <Phone size={16} className="mt-0.5 text-accent shrink-0" />
                                <span>{CONTACT.phone}</span>
                            </a>
                            <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-3 text-sm text-white/70 hover:text-accent transition-colors cursor-pointer">
                                <Mail size={16} className="mt-0.5 text-accent shrink-0" />
                                <span>{CONTACT.email}</span>
                            </a>
                            <div className="flex items-start gap-3 text-sm text-white/70">
                                <Clock size={16} className="mt-0.5 text-accent shrink-0" />
                                <span>{tc("workingHours")}</span>
                            </div>
                            <div className="flex items-start gap-3 text-sm text-white/70">
                                <MapPin size={16} className="mt-0.5 text-accent shrink-0" />
                                <div>
                                    <div className="font-medium text-white/90 mb-1">{CLINICS[0].name}</div>
                                    <span>{CLINICS[0].address}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="container-custom py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/50">
                    <p>© {new Date().getFullYear()} {SITE_NAME}. {t("rights")}.</p>
                    <div className="flex items-center gap-4">
                        <IntlLink href="/chinh-sach-bao-mat" className="hover:text-accent transition-colors cursor-pointer">
                            {t("privacy")}
                        </IntlLink>
                        <IntlLink href="/dieu-khoan-su-dung" className="hover:text-accent transition-colors cursor-pointer">
                            {t("terms")}
                        </IntlLink>
                    </div>
                </div>
            </div>
        </footer>
    );
}
