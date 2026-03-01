import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import { CONTACT, CLINICS, DOCTOR, SITE_URL, SITE_DESCRIPTION } from "@/lib/constants";

function SchemaOrg({ locale }: { locale: string }) {
    const isEn = locale === "en";
    const schema = [
        {
            "@context": "https://schema.org",
            "@type": "Person",
            name: `${DOCTOR.title} ${DOCTOR.name}`,
            jobTitle: isEn ? "Maxillofacial Dentist" : "Bác sĩ Răng Hàm Mặt",
            description: SITE_DESCRIPTION,
            url: SITE_URL,
            telephone: CONTACT.phone,
            email: CONTACT.email,
            alumniOf: [
                { "@type": "EducationalOrganization", name: isEn ? "Hanoi Medical University" : "Đại học Y Hà Nội" },
                { "@type": "EducationalOrganization", name: isEn ? "Hai Duong Medical Technical University" : "ĐHKT Y tế Hải Dương" },
            ],
            knowsAbout: isEn
                ? ["Dental Implants", "Orthodontics", "Cosmetic Veneers", "Oral Surgery"]
                : DOCTOR.specialties,
        },
        ...CLINICS.map((clinic) => ({
            "@context": "https://schema.org",
            "@type": "Dentist",
            name: clinic.name,
            address: {
                "@type": "PostalAddress",
                streetAddress: clinic.address,
                addressLocality: clinic.city,
                addressCountry: "VN",
            },
            telephone: CONTACT.phone,
            url: SITE_URL,
            openingHours: "Mo-Su 08:00-20:00",
        })),
    ];

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    setRequestLocale(locale);

    const messages = (await import(`../../../messages/${locale}.json`)).default;

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <SchemaOrg locale={locale} />
            <Header />
            <main>{children}</main>
            <Footer />
            <FloatingCTA />
        </NextIntlClientProvider>
    );
}
