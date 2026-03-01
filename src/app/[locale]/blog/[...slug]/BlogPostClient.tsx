"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link as IntlLink } from "@/i18n/navigation";
import { Clock, Calendar, ArrowLeft, Tag } from "lucide-react";
import type { BlogPost } from "@/lib/blogData";

export default function BlogPostClient({ post }: { post: BlogPost }) {
    const t = useTranslations("blogPage");
    const tb = useTranslations("blogPost");
    const locale = useLocale();

    const title = t(`post${post.num}Title`);
    const excerpt = t(`post${post.num}Excerpt`);
    const category = t(post.categoryKey as any);

    // Body paragraphs from blogPost namespace
    const bodyParagraphs: string[] = [];
    for (let i = 1; i <= 6; i++) {
        try {
            const key = `post${post.num}Body${i}` as any;
            const val = tb(key);
            if (val && !val.startsWith("blogPost.")) bodyParagraphs.push(val);
        } catch {
            break;
        }
    }

    return (
        <article className="section-padding bg-white">
            <div className="container-custom max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Back link */}
                    <IntlLink
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors mb-8"
                    >
                        <ArrowLeft size={14} />
                        {tb("backToBlog")}
                    </IntlLink>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-accent/10 text-accent">
                            <Tag size={12} />
                            {category}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-text-muted">
                            <Calendar size={14} />
                            {new Date(post.date).toLocaleDateString(locale === "en" ? "en-US" : "vi-VN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-text-muted">
                            <Clock size={14} />
                            {t("readTime", { minutes: String(post.readTime) })}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary leading-tight mb-6">
                        {title}
                    </h1>

                    {/* Summary */}
                    <div className="bg-surface rounded-xl p-6 mb-10 border-l-4 border-accent">
                        <p className="text-text-muted leading-relaxed italic">{excerpt}</p>
                    </div>

                    {/* Body */}
                    <div className="prose prose-lg max-w-none">
                        {bodyParagraphs.map((p, i) => (
                            <p key={i} className="text-text leading-relaxed mb-5">{p}</p>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-12 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl text-center">
                        <h3 className="font-heading text-xl font-bold text-primary mb-3">
                            {tb("ctaTitle")}
                        </h3>
                        <p className="text-text-muted mb-6">{tb("ctaDesc")}</p>
                        <IntlLink
                            href="/dat-lich-kham"
                            className="btn-primary inline-flex cursor-pointer"
                        >
                            {tb("ctaButton")}
                        </IntlLink>
                    </div>
                </motion.div>
            </div>
        </article>
    );
}
