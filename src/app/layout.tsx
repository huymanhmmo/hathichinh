import { Metadata } from "next";
import "./globals.css";
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL, DOCTOR } from "@/lib/constants";

// Fonts are initialized in locale layout to support HTML tags properly

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${DOCTOR.title} ${DOCTOR.name}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "nha khoa", "bác sĩ nha khoa", "Hà Thị Chinh", "implant", "niềng răng",
    "răng sứ", "phẫu thuật trong miệng", "nha khoa Hà Nội", "nha khoa Hưng Yên",
    "cấy ghép implant", "chỉnh nha", "veneer", "tẩy trắng răng",
    "dental clinic", "dentist vietnam", "dental implant hanoi",
  ],
  authors: [{ name: `${DOCTOR.title} ${DOCTOR.name}` }],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      vi: SITE_URL,
      en: `${SITE_URL}/en`,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
