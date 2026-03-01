import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
    localePrefix: 'as-needed', // Don't show /vi prefix for default locale
    pathnames: {
        '/': '/',
        '/gioi-thieu': {
            vi: '/gioi-thieu',
            en: '/about',
        },
        '/dich-vu': {
            vi: '/dich-vu',
            en: '/services',
        },
        '/dich-vu/[slug]': {
            vi: '/dich-vu/[slug]',
            en: '/services/[slug]',
        },
        '/quy-trinh-dieu-tri': {
            vi: '/quy-trinh-dieu-tri',
            en: '/process',
        },
        '/ket-qua-dieu-tri': {
            vi: '/ket-qua-dieu-tri',
            en: '/results',
        },
        '/bang-gia': {
            vi: '/bang-gia',
            en: '/pricing',
        },
        '/blog': '/blog',
        '/blog/[...slug]': '/blog/[...slug]',
        '/danh-gia': {
            vi: '/danh-gia',
            en: '/reviews',
        },
        '/hoi-dap': {
            vi: '/hoi-dap',
            en: '/faq',
        },
        '/lien-he': {
            vi: '/lien-he',
            en: '/contact',
        },
        '/dat-lich-kham': {
            vi: '/dat-lich-kham',
            en: '/booking',
        },
        '/chinh-sach-bao-mat': {
            vi: '/chinh-sach-bao-mat',
            en: '/privacy-policy',
        },
        '/dieu-khoan-su-dung': {
            vi: '/dieu-khoan-su-dung',
            en: '/terms',
        },
    },
});
