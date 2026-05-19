import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { BLOG_POSTS, findPostBySlug } from "@/lib/blogData";
import BlogPostClient from "./BlogPostClient";

type Props = { params: Promise<{ locale: string; slug: string[] }> };

export async function generateStaticParams() {
    const locales = ["vi", "en"];
    const params: { locale: string; slug: string[] }[] = [];
    locales.forEach((locale) => {
        BLOG_POSTS.forEach((post) => {
            params.push({
                locale,
                slug: (locale === "en" ? post.slugs.en : post.slugs.vi).split("/"),
            });
        });
    });
    return params;
}

export async function generateMetadata({ params }: Props) {
    const { locale, slug } = await params;
    const post = findPostBySlug(slug);
    if (!post) return {};
    const t = await getTranslations({ locale, namespace: "blogPage" });
    return {
        title: t(`post${post.num}Title`),
        description: t(`post${post.num}Excerpt`),
    };
}

export default async function BlogDetailPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);

    const post = findPostBySlug(slug);
    if (!post) notFound();

    const t = await getTranslations({ locale, namespace: "blogPage" });
    const tb = await getTranslations({ locale, namespace: "blogPost" });

    return (
        <>
            <div className="container-custom">
                <Breadcrumb
                    items={[
                        { label: t("breadcrumb"), href: "/blog" },
                        { label: t(`post${post.num}Title`) },
                    ]}
                />
            </div>
            <BlogPostClient post={post} />
        </>
    );
}
