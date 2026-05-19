import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { CLINICS, SITE_URL } from "@/lib/constants";
import ClinicDetailClient from "./ClinicDetailClient";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
    const locales = ["vi", "en"];
    const params: { locale: string; slug: string }[] = [];

    locales.forEach((locale) => {
        CLINICS.forEach((c) => {
            params.push({ locale, slug: (locale === "en" ? c.slugs.en : c.slugs.vi) });
        });
    });
    return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const clinic = CLINICS.find((c) => c.slugs.vi === slug || c.slugs.en === slug);
    if (!clinic) return {};
    const t = await getTranslations({ locale, namespace: "clinicDetailPage" });

    const prefix = locale === "vi" ? "/phong-kham" : "/clinics";
    const currentSlug = locale === "en" ? clinic.slugs.en : clinic.slugs.vi;
    const canonical = `${SITE_URL}/${locale}${prefix}/${currentSlug}`;

    return {
        title: t("metaTitle", { name: clinic.name }),
        description: t("metaDesc", { name: clinic.name }),
        alternates: {
            canonical,
            languages: {
                vi: `${SITE_URL}/vi/phong-kham/${clinic.slugs.vi}`,
                en: `${SITE_URL}/en/clinics/${clinic.slugs.en}`,
            },
        },
    };
}

export default async function ClinicDetailPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const clinic = CLINICS.find((c) => c.slugs.vi === slug || c.slugs.en === slug);
    if (!clinic) notFound();
    const tList = await getTranslations({ locale, namespace: "clinicListPage" });
    return (
        <>
            <div className="container-custom">
                <Breadcrumb
                    items={[
                        { label: tList("breadcrumb"), href: "/phong-kham" },
                        { label: clinic.name },
                    ]}
                />
            </div>
            <ClinicDetailClient slug={slug} />
        </>
    );
}
