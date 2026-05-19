"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link as IntlLink } from "@/i18n/navigation";
import { Clock, Calendar, ArrowRight, Search } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blogData";

export default function BlogListClient() {
    const t = useTranslations("blogPage");
    const locale = useLocale();
    const [filterKey, setFilterKey] = useState("filterAll");
    const [search, setSearch] = useState("");

    const filterTabs = [
        { key: "filterAll", label: t("filterAll") },
        { key: "filterImplant", label: t("filterImplant") },
        { key: "filterOrtho", label: t("filterOrtho") },
        { key: "filterVeneer", label: t("filterVeneer") },
        { key: "filterKnowledge", label: t("filterKnowledge") },
    ];

    const posts = BLOG_POSTS.map((bp) => ({
        slugs: bp.slugs,
        title: t(`post${bp.num}Title`),
        excerpt: t(`post${bp.num}Excerpt`),
        categoryKey: bp.categoryKey,
        categoryLabel: t(bp.categoryKey as any),
        date: bp.date,
        readTime: bp.readTime,
        image: `/images/blog/blog${bp.num}.png`,
    }));

    const filtered = posts
        .filter((p) => filterKey === "filterAll" || p.categoryKey === filterKey)
        .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <section className="py-12 bg-gradient-to-br from-surface to-white">
                <div className="container-custom text-center">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
                        {t("title")} <span className="text-gradient-gold">{t("titleHighlight")}</span>
                    </h1>
                    <p className="text-text-muted max-w-xl mx-auto text-lg mb-8">
                        {t("subtitle")}
                    </p>
                    <div className="max-w-md mx-auto relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                        <input type="text" placeholder={t("searchPlaceholder")} value={search} onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-white focus:border-accent outline-none transition-colors" />
                    </div>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="flex flex-wrap gap-2 mb-10 justify-center">
                        {filterTabs.map((tab) => (
                            <button key={tab.key} onClick={() => setFilterKey(tab.key)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${filterKey === tab.key ? "gradient-gold text-white shadow-[var(--shadow-gold)]" : "bg-surface text-text-muted hover:bg-accent/10 hover:text-accent"
                                    }`}>{tab.label}</button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((post, i) => (
                            <motion.article key={post.slugs.vi} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                                <IntlLink href={{ pathname: '/blog/[...slug]', params: { slug: (locale === 'vi' ? post.slugs.vi : post.slugs.en).split('/') } }} className="block bg-white rounded-2xl overflow-hidden border border-border-light shadow-sm hover:shadow-[var(--shadow-card)] transition-all cursor-pointer group h-full">
                                    <div className="aspect-[16/9] overflow-hidden">
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent">{post.categoryLabel}</span>
                                            <span className="flex items-center gap-1 text-xs text-text-muted"><Clock size={12} />{t("readTime", { minutes: String(post.readTime) })}</span>
                                        </div>
                                        <h2 className="font-heading text-lg font-bold text-primary leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">{post.title}</h2>
                                        <p className="text-sm text-text-muted leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                                        <div className="flex items-center justify-between pt-3 border-t border-border-light">
                                            <span className="flex items-center gap-1 text-xs text-text-muted"><Calendar size={12} />{new Date(post.date).toLocaleDateString(locale === "en" ? "en-US" : "vi-VN")}</span>
                                            <span className="text-sm font-medium text-accent flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">{t("read")} <ArrowRight size={12} /></span>
                                        </div>
                                    </div>
                                </IntlLink>
                            </motion.article>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center py-12 text-text-muted">{t("noResults")}</div>
                    )}
                </div>
            </section>
        </div>
    );
}
