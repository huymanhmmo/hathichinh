import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { SERVICES, SERVICE_KEY_MAP } from "@/lib/constants";
import ServiceDetailClient from "./ServiceDetailClient";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
    return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const service = SERVICES.find((s) => s.slug === slug);
    if (!service) return {};

    const svcKey = SERVICE_KEY_MAP[slug] || slug;
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
    const service = SERVICES.find((s) => s.slug === slug);
    if (!service) notFound();

    const tSvc = await getTranslations({ locale, namespace: "services" });
    const tList = await getTranslations({ locale, namespace: "serviceListPage" });

    const svcKey = SERVICE_KEY_MAP[slug] || slug;

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
