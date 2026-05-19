import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ClinicListClient from "./ClinicListClient";
import { SITE_URL } from "@/lib/constants";

const PAGE_PATH = "/phong-kham";
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "clinicListPage" });
    const canonical = `${SITE_URL}/${locale}${PAGE_PATH}`;
    return {
        title: t("metaTitle"),
        description: t("metaDesc"),
        alternates: {
            canonical,
            languages: { vi: `${SITE_URL}/vi/phong-kham`, en: `${SITE_URL}/en/clinics` },
        },
    };
}

export default async function ClinicListPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "clinicListPage" });
    return (
        <>
            <div className="container-custom">
                <Breadcrumb items={[{ label: t("breadcrumb") }]} />
            </div>
            <ClinicListClient />
        </>
    );
}
