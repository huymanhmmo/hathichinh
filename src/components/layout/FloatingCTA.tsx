"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Facebook, X, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { CONTACT } from "@/lib/constants";

export default function FloatingCTA() {
    const t = useTranslations("common");
    const [isOpen, setIsOpen] = useState(false);

    const buttons = [
        {
            label: t("floatCall"),
            href: CONTACT.phoneLink,
            icon: Phone,
            color: "bg-success",
            hoverColor: "hover:bg-green-600",
        },
        {
            label: t("floatZalo"),
            href: CONTACT.zalo,
            icon: MessageCircle,
            color: "bg-blue-500",
            hoverColor: "hover:bg-blue-600",
        },
        {
            label: "Facebook",
            href: CONTACT.facebook,
            icon: Facebook,
            color: "bg-[#1877F2]",
            hoverColor: "hover:bg-[#166FE5]",
        },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[var(--z-floating)] flex flex-col items-end gap-3">
            {/* Expanded buttons */}
            <AnimatePresence>
                {isOpen &&
                    buttons.map((btn, i) => (
                        <motion.a
                            key={btn.label}
                            href={btn.href}
                            target={btn.href.startsWith("http") ? "_blank" : undefined}
                            rel={btn.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            transition={{ delay: i * 0.05, duration: 0.2 }}
                            className={`flex items-center gap-3 pl-4 pr-2 py-2 rounded-full text-white shadow-lg cursor-pointer transition-colors ${btn.color} ${btn.hoverColor}`}
                        >
                            <span className="text-sm font-medium whitespace-nowrap">{btn.label}</span>
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <btn.icon size={18} />
                            </div>
                        </motion.a>
                    ))}
            </AnimatePresence>

            {/* Main FAB */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full gradient-gold text-white shadow-[var(--shadow-gold)] flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ rotate: isOpen ? 45 : 0 }}
                aria-label={isOpen ? t("floatClose") : t("floatContact")}
            >
                {isOpen ? <X size={24} /> : <Plus size={24} />}
            </motion.button>

            {/* Pulse ring when closed */}
            {!isOpen && (
                <div className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-accent/30 animate-ping pointer-events-none" />
            )}
        </div>
    );
}
