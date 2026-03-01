import { getTranslations, setRequestLocale } from "next-intl/server";
import Breadcrumb from "@/components/layout/Breadcrumb";
import QuyTrinhClient from "./QuyTrinhClient";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "processPage" });
    return { title: t("metaTitle"), description: t("metaDesc") };
}

export default async function QuyTrinhPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "processPage" });
    return (
        <>
            <div className="container-custom">
                <Breadcrumb items={[{ label: t("breadcrumb") }]} />
            </div>
            <QuyTrinhClient />
        </>
    );
}
