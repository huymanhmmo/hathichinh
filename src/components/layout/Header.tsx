"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Link as IntlLink } from "@/i18n/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronDown, MapPin, Clock } from "lucide-react";
import { CONTACT, NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const t = useTranslations("common");
    const tNav = useTranslations("nav");
    const tSvc = useTranslations("services");

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMobileOpen]);

    return (
        <>
            {/* Top Info Bar */}
            <div className="hidden lg:block bg-primary text-white/90 text-sm">
                <div className="container-custom flex items-center justify-between py-2">
                    <div className="flex items-center gap-6">
                        <a href={CONTACT.phoneLink} className="flex items-center gap-1.5 hover:text-accent transition-colors cursor-pointer">
                            <Phone size={14} />
                            <span>{CONTACT.phone}</span>
                        </a>
                        <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1.5 hover:text-accent transition-colors cursor-pointer">
                            <Mail size={14} />
                            <span>{CONTACT.email}</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1.5">
                            <Clock size={14} />
                            {t("workingHours")}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <MapPin size={14} />
                            5 {t("clinics")}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header
                className={`sticky top-0 z-[var(--z-header)] transition-all duration-300 ${isScrolled
                    ? "glass shadow-[var(--shadow-card)] border-b border-border-light"
                    : "bg-white"
                    }`}
            >
                <div className="container-custom flex items-center justify-between h-[72px]">
                    {/* Logo */}
                    <IntlLink href="/" className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#C5A55A] shadow-sm">
                            <Image
                                src="/images/doctor-logo.png"
                                alt="Bs. Hà Thị Chinh"
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <div className="font-heading font-bold text-primary text-lg leading-tight group-hover:text-accent transition-colors">
                                {SITE_NAME}
                            </div>
                            <div className="text-xs text-text-muted leading-tight">{t("brandSub")}</div>
                        </div>
                    </IntlLink>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {NAV_ITEMS.map((item) => (
                            <div
                                key={item.href}
                                className="relative"
                                onMouseEnter={() => item.children && setActiveDropdown(item.href)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <IntlLink
                                    href={item.href}
                                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${item.href === "/dat-lich-kham"
                                        ? "btn-primary !py-2 !px-5 !text-sm"
                                        : "text-text hover:text-accent hover:bg-surface"
                                        }`}
                                >
                                    {tNav(item.labelKey)}
                                    {item.children && <ChevronDown size={14} className="mt-0.5" />}
                                </IntlLink>

                                {/* Dropdown */}
                                {item.children && (
                                    <AnimatePresence>
                                        {activeDropdown === item.href && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 8 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full left-0 mt-1 py-2 w-64 bg-white rounded-xl shadow-[var(--shadow-card-hover)] border border-border-light"
                                            >
                                                {item.children.map((child) => (
                                                    <IntlLink
                                                        key={child.slug}
                                                        href={{ pathname: '/dich-vu/[slug]', params: { slug: child.slug } }}
                                                        className="block px-4 py-2.5 text-sm text-text hover:text-accent hover:bg-surface transition-colors cursor-pointer"
                                                    >
                                                        {tSvc(child.labelKey)}
                                                    </IntlLink>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}
                    </nav>
                    <div className="hidden lg:flex items-center gap-2">
                        <LanguageSwitcher />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="lg:hidden p-2 rounded-lg text-primary hover:bg-surface transition-colors cursor-pointer"
                        aria-label={isMobileOpen ? t("closeMenu") : t("openMenu")}
                    >
                        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-[calc(var(--z-header)-1)] lg:hidden"
                            onClick={() => setIsMobileOpen(false)}
                        />
                        <motion.nav
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-[300px] bg-white z-[var(--z-header)] lg:hidden overflow-y-auto shadow-2xl"
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-8">
                                    <span className="font-heading font-bold text-primary text-lg">{SITE_NAME}</span>
                                    <button
                                        onClick={() => setIsMobileOpen(false)}
                                        className="p-2 rounded-lg hover:bg-surface cursor-pointer"
                                        aria-label={t("closeMenu")}
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="space-y-1">
                                    {NAV_ITEMS.map((item) => (
                                        <div key={item.href}>
                                            <IntlLink
                                                href={item.href}
                                                onClick={() => setIsMobileOpen(false)}
                                                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${item.href === "/dat-lich-kham"
                                                    ? "btn-primary w-full text-center mt-4"
                                                    : "text-text hover:text-accent hover:bg-surface"
                                                    }`}
                                            >
                                                {tNav(item.labelKey)}
                                            </IntlLink>
                                            {item.children && (
                                                <div className="ml-4 mt-1 space-y-0.5">
                                                    {item.children.map((child) => (
                                                        <IntlLink
                                                            key={child.slug}
                                                            href={{ pathname: '/dich-vu/[slug]', params: { slug: child.slug } }}
                                                            onClick={() => setIsMobileOpen(false)}
                                                            className="block px-4 py-2 text-sm text-text-muted hover:text-accent transition-colors cursor-pointer"
                                                        >
                                                            {tSvc(child.labelKey)}
                                                        </IntlLink>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 flex justify-center">
                                    <LanguageSwitcher />
                                </div>

                                <div className="mt-8 pt-6 border-t border-border space-y-3">
                                    <a href={CONTACT.phoneLink} className="flex items-center gap-2 text-sm text-text-muted hover:text-accent cursor-pointer">
                                        <Phone size={16} />
                                        {CONTACT.phone}
                                    </a>
                                    <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 text-sm text-text-muted hover:text-accent cursor-pointer">
                                        <Mail size={16} />
                                        {CONTACT.email}
                                    </a>
                                </div>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
