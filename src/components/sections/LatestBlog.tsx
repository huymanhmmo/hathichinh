"use client";

import { motion } from "framer-motion";
import { Link as IntlLink } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Calendar, ArrowRight, Clock } from "lucide-react";

import { BLOG_POSTS } from "@/lib/blogData";

const POSTS = BLOG_POSTS.slice(0, 3);

export default function LatestBlog() {
    const t = useTranslations("latestBlog");
    const tc = useTranslations("common");
    const locale = useLocale();
    return (
        <section className="section-padding bg-surface">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14"
                >
                    <div>
                        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                            {t("badge")}
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary">
                            {t("title")} <span className="text-gradient-gold">{t("titleHighlight")}</span>
                        </h2>
                    </div>
                    <IntlLink href="/blog" className="btn-secondary cursor-pointer text-sm">
                        {t("allPosts")} <ArrowRight size={14} />
                    </IntlLink>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {POSTS.map((post, i) => (
                        <motion.article
                            key={post.num}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <IntlLink
                                href={{ pathname: '/blog/[...slug]', params: { slug: (locale === 'vi' ? post.slugs.vi : post.slugs.en).split('/') } }}
                                className="block bg-white rounded-2xl overflow-hidden border border-border-light shadow-sm hover:shadow-[var(--shadow-card)] transition-all duration-300 cursor-pointer group h-full"
                            >
                                {/* Image placeholder */}
                                <div className="aspect-[16/9] bg-gradient-to-br from-primary/5 via-surface to-accent/5 flex items-center justify-center">
                                    <span className="text-4xl font-heading font-bold text-primary/10">{t(`post${post.num}Category`)}</span>
                                </div>

                                <div className="p-5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent/10 text-accent">
                                            {t(`post${post.num}Category`)}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-text-muted">
                                            <Clock size={12} />
                                            {post.readTime} {tc("minutes")}
                                        </span>
                                    </div>

                                    <h3 className="font-heading text-lg font-bold text-primary leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
                                        {t(`post${post.num}Title`)}
                                    </h3>

                                    <p className="text-sm text-text-muted leading-relaxed line-clamp-2 mb-4">
                                        {t(`post${post.num}Excerpt`)}
                                    </p>

                                    <div className="flex items-center justify-between pt-3 border-t border-border-light">
                                        <span className="flex items-center gap-1 text-xs text-text-muted">
                                            <Calendar size={12} />
                                            {new Date(post.date).toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US")}
                                        </span>
                                        <span className="text-sm font-medium text-accent flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {tc("readMore")} <ArrowRight size={12} />
                                        </span>
                                    </div>
                                </div>
                            </IntlLink>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
