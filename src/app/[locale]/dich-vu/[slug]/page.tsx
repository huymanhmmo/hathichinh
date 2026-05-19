import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { SERVICES, SERVICE_KEY_MAP } from "@/lib/constants";
import ServiceDetailClient from "./ServiceDetailClient";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
    const locales = ["vi", "en"];
    const params: { locale: string; slug: string }[] = [];
    locales.forEach((locale) => {
        SERVICES.forEach((s) => {
            params.push({ locale, slug: (locale === "en" ? s.slugs.en : s.slugs.vi) });
        });
    });
    return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const service = SERVICES.find((s) => s.slugs.vi === slug || s.slugs.en === slug);
    if (!service) return {};

    const svcKey = SERVICE_KEY_MAP[service.slugs.vi] || service.slugs.vi;
    const tSvc = await getTranslations({ locale, namespace: "services" });
    const tPage = await getTranslations({ locale, namespace: "serviceDetailPage" });

    return {
        title: `${tSvc(svcKey)} – ${tPage("metaSuffix")}`,
        description: tSvc(`${svcKey}Desc`),
    };
}

export default async function ServiceDetailPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const service = SERVICES.find((s) => s.slugs.vi === slug || s.slugs.en === slug);
    if (!service) notFound();

    const tSvc = await getTranslations({ locale, namespace: "services" });
    const tList = await getTranslations({ locale, namespace: "serviceListPage" });

    const svcKey = SERVICE_KEY_MAP[service.slugs.vi] || service.slugs.vi;

    return (
        <>
            <div className="container-custom">
                <Breadcrumb
                    items={[
                        { label: tList("breadcrumb"), href: "/dich-vu" },
                        { label: tSvc(svcKey) },
                    ]}
                />
            </div>
            <ServiceDetailClient slug={slug} />
        </>
    );
}
