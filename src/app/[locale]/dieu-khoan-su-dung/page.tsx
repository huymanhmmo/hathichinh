import { getTranslations, setRequestLocale } from "next-intl/server";
import Breadcrumb from "@/components/layout/Breadcrumb";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "termsPage" });
    return { title: t("metaTitle"), description: t("metaDesc") };
}

export default async function DieuKhoanPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: "termsPage" });
    return (
        <>
            <div className="container-custom">
                <Breadcrumb items={[{ label: t("breadcrumb") }]} />
            </div>
            <section className="section-padding bg-white">
                <div className="container-custom max-w-3xl prose prose-primary">
                    <h1 className="font-heading text-3xl font-bold text-primary">{t("title")}</h1>
                    <p className="text-text-muted">{t("lastUpdated")}</p>

                    <h2>{t("h1")}</h2>
                    <p>{t("p1")}</p>

                    <h2>{t("h2")}</h2>
                    <p>{t("p2")}</p>

                    <h2>{t("h3")}</h2>
                    <p>{t("p3")}</p>

                    <h2>{t("h4")}</h2>
                    <p>{t("p4")}</p>

                    <h2>{t("h5")}</h2>
                    <p>{t("p5")}</p>

                    <h2>{t("h6")}</h2>
                    <p>{t("p6")}</p>
                </div>
            </section>
        </>
    );
}
