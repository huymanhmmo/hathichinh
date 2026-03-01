"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link as IntlLink } from "@/i18n/navigation";
import { Calendar, Info, CreditCard, Shield, Gift } from "lucide-react";

export default function BangGiaClient() {
    const t = useTranslations("pricingPage");
    const [active, setActive] = useState("implant");

    const categories = [
        {
            slug: "implant", title: t("catImplant"),
            items: [
                { service: t("implant1"), price: t("implant1Price") },
                { service: t("implant2"), price: t("implant2Price") },
                { service: t("implant3"), price: t("implant3Price") },
                { service: t("implant4"), price: t("implant4Price") },
                { service: t("implant5"), price: t("implant5Price") },
                { service: t("implant6"), price: t("implant6Price") },
            ],
        },
        {
            slug: "nieng-rang", title: t("catOrtho"),
            items: [
                { service: t("ortho1"), price: t("ortho1Price") },
                { service: t("ortho2"), price: t("ortho2Price") },
                { service: t("ortho3"), price: t("ortho3Price") },
                { service: t("ortho4"), price: t("ortho4Price") },
            ],
        },
        {
            slug: "rang-su", title: t("catVeneer"),
            items: [
                { service: t("veneer1"), price: t("veneer1Price") },
                { service: t("veneer2"), price: t("veneer2Price") },
                { service: t("veneer3"), price: t("veneer3Price") },
                { service: t("veneer4"), price: t("veneer4Price") },
            ],
        },
        {
            slug: "phau-thuat", title: t("catSurgery"),
            items: [
                { service: t("surgery1"), price: t("surgery1Price") },
                { service: t("surgery2"), price: t("surgery2Price") },
                { service: t("surgery3"), price: t("surgery3Price") },
            ],
        },
        {
            slug: "khac", title: t("catOther"),
            items: [
                { service: t("other1"), price: t("other1Price") },
                { service: t("other2"), price: t("other2Price") },
                { service: t("other3"), price: t("other3Price") },
                { service: t("other4"), price: t("other4Price") },
            ],
        },
    ];

    const notes = [
        { icon: CreditCard, title: t("installment"), desc: t("installmentDesc") },
        { icon: Shield, title: t("warranty"), desc: t("warrantyDesc") },
        { icon: Gift, title: t("promotion"), desc: t("promotionDesc") },
    ];

    return (
        <div>
            <section className="py-12 bg-gradient-to-br from-surface to-white">
                <div className="container-custom text-center">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
                        {t("title")} <span className="text-gradient-gold">{t("titleHighlight")}</span>
                    </h1>
                    <p className="text-text-muted max-w-xl mx-auto text-lg">
                        {t("subtitle")}
                    </p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    {/* Tabs */}
                    <div className="flex flex-wrap gap-2 mb-10 justify-center">
                        {categories.map((cat) => (
                            <button
                                key={cat.slug}
                                onClick={() => setActive(cat.slug)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${active === cat.slug
                                    ? "gradient-gold text-white shadow-[var(--shadow-gold)]"
                                    : "bg-surface text-text-muted hover:bg-accent/10 hover:text-accent"
                                    }`}
                            >
                                {cat.title}
                            </button>
                        ))}
                    </div>

                    {/* Table */}
                    {categories.filter((c) => c.slug === active).map((cat) => (
                        <motion.div
                            key={cat.slug}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-2xl border border-border-light overflow-hidden"
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-primary text-white">
                                            <th className="text-left px-6 py-4 font-medium">{t("thService")}</th>
                                            <th className="text-right px-6 py-4 font-medium">{t("thPrice")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cat.items.map((item, i) => (
                                            <tr key={item.service} className={`border-t border-border-light ${i % 2 === 0 ? "bg-white" : "bg-surface/50"}`}>
                                                <td className="px-6 py-4 text-text font-medium">{item.service}</td>
                                                <td className="px-6 py-4 text-right text-accent font-semibold">{item.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    ))}

                    {/* Notes */}
                    <div className="mt-8 grid sm:grid-cols-3 gap-4">
                        {notes.map((note) => (
                            <div key={note.title} className="flex items-start gap-3 p-4 rounded-xl bg-surface">
                                <note.icon size={20} className="text-accent shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-semibold text-primary text-sm">{note.title}</div>
                                    <div className="text-xs text-text-muted">{note.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 mt-6 flex items-start gap-3">
                        <Info size={18} className="text-accent shrink-0 mt-0.5" />
                        <p className="text-sm text-text-muted">
                            <strong className="text-primary">{t("noteTitle")}</strong> {t("noteDesc")}
                        </p>
                    </div>

                    <div className="text-center mt-10">
                        <IntlLink href="/dat-lich-kham" className="btn-primary cursor-pointer">
                            <Calendar size={18} /> {t("ctaBtn")}
                        </IntlLink>
                    </div>
                </div>
            </section>
        </div>
    );
}
