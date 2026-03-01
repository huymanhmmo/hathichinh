import { getTranslations, setRequestLocale } from "next-intl/server";
import Breadcrumb from "@/components/layout/Breadcrumb";
import BangGiaClient from "./BangGiaClient";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "pricingPage" });
    return { title: t("metaTitle"), description: t("metaDesc") };
}

export default async function BangGiaPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "pricingPage" });
    return (
        <>
            <div className="container-custom">
                <Breadcrumb items={[{ label: t("breadcrumb") }]} />
            </div>
            <BangGiaClient />
        </>
    );
}
