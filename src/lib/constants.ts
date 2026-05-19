// Site constants
export const SITE_NAME = "Ths. Bs. Hà Thị Chinh";
export const SITE_TITLE = "Ths. Bs. Hà Thị Chinh – Nha Khoa Chuyên Sâu";
export const SITE_DESCRIPTION =
    "Bác sĩ Hà Thị Chinh - Cựu sinh viên ĐH Y Hà Nội, Giảng viên ĐHKT Y tế Hải Dương. Chuyên gia Implant, Niềng răng, Răng sứ thẩm mỹ, Phẫu thuật trong miệng. Hơn 15 năm kinh nghiệm.";
export const SITE_URL = "https://hathichinh.com";

export const CONTACT = {
    phone: "0906 150 389",
    phoneLink: "tel:0906150389",
    email: "hachinh.rhm@gmail.com",
    zalo: "https://zalo.me/0906150389",
    facebook: "#",
    workingHours: "8:00 - 20:00 (Thứ 2 - Chủ nhật)",
};

export const DOCTOR = {
    name: "Hà Thị Chinh",
    title: "Ths. Bs.",
    fullTitle: "Thạc sĩ Bác sĩ",
    tagline: "Nụ cười tự tin, cuộc sống trọn vẹn",
    description: "Cựu sinh viên Đại học Y Hà Nội, Giảng viên tại trường ĐHKT Y tế Hải Dương",
    specialties: ["Cấy ghép Implant", "Niềng răng – Chỉnh nha", "Răng sứ thẩm mỹ", "Phẫu thuật trong miệng"],
    stats: {
        years: 15,
        cases: 10000,
        clinics: 5,
        satisfaction: 98,
    },
};

export interface Clinic {
    id: string;
    slugs: {
        vi: string;
        en: string;
    };
    name: string;
    address: string;
    city: string;
    isMain?: boolean;
    mapUrl?: string;
}

export const CLINICS: Clinic[] = [
    {
        id: "dc-dental",
        slugs: { vi: "nha-khoa-dc-dental", en: "dc-dental-clinic" },
        name: "Nha khoa DC Dental",
        address: "Số 2 Giang Cao, Bát Tràng, Gia Lâm, Hà Nội",
        city: "Hà Nội",
        isMain: true,
    },
    {
        id: "ocean",
        slugs: { vi: "nha-khoa-ocean", en: "ocean-dental" },
        name: "Nha khoa Ocean",
        address: "S208 Vinhomes Ocean Park, Đa Tốn, Gia Lâm, Hà Nội",
        city: "Hà Nội",
    },
    {
        id: "eco-dental",
        slugs: { vi: "nha-khoa-eco-dental", en: "eco-dental-clinic" },
        name: "Nha khoa Eco Dental",
        address: "150C Thủy Nguyên, Ecopark, Văn Giang, Hưng Yên",
        city: "Hưng Yên",
    },
    {
        id: "an-nam",
        slugs: { vi: "nha-khoa-an-nam", en: "an-nam-dental" },
        name: "Nha Khoa An Nam",
        address: "Ngã 5 Phi Liệt, Liên Nghĩa, Văn Giang, Hưng Yên",
        city: "Hưng Yên",
    },
    {
        id: "hai-duong",
        slugs: { vi: "nha-khoa-hai-duong", en: "hai-duong-dental" },
        name: "Nha Khoa Hải Dương",
        address: "Phường Hải Dương, Thành phố Hải Phòng",
        city: "Hải Phòng",
    },
];

export const NAV_ITEMS = [
    { labelKey: "home", href: "/" },
    { labelKey: "about", href: "/gioi-thieu" },
    {
        labelKey: "services",
        href: "/dich-vu",
        children: [
            { labelKey: "implant", slug: "cay-ghep-implant" },
            { labelKey: "ortho", slug: "nieng-rang" },
            { labelKey: "veneer", slug: "rang-su-tham-my" },
            { labelKey: "surgery", slug: "phau-thuat-trong-mieng" },
            { labelKey: "endo", slug: "dieu-tri-noi-nha" },
            { labelKey: "pediatric", slug: "nha-khoa-tre-em" },
            { labelKey: "whitening", slug: "tay-trang-rang" },
        ],
    },
    { labelKey: "process", href: "/quy-trinh-dieu-tri" },
    { labelKey: "results", href: "/ket-qua-dieu-tri" },
    { labelKey: "pricing", href: "/bang-gia" },
    { labelKey: "blog", href: "/blog" },
    { labelKey: "reviews", href: "/danh-gia" },
    { labelKey: "faq", href: "/hoi-dap" },
    { labelKey: "contact", href: "/lien-he" },
    { labelKey: "booking", href: "/dat-lich-kham" },
];

// Shared service slug → translation key mapping
export const SERVICE_KEY_MAP: Record<string, string> = {
    "cay-ghep-implant": "implant",
    "nieng-rang-chinh-nha": "ortho",
    "nieng-rang": "ortho",
    "rang-su-tham-my": "veneer",
    "phau-thuat-trong-mieng": "surgery",
    "dieu-tri-noi-nha": "endo",
    "nha-khoa-tre-em": "pediatric",
    "tay-trang-rang": "whitening",
};

// Sub-service slug → translation key mapping (keyed by "parentSlug/subSlug")
export const SUB_SERVICE_KEY_MAP: Record<string, string> = {
    "cay-ghep-implant/1-rang": "sub_implant_1rang",
    "cay-ghep-implant/nhieu-rang": "sub_implant_nhieurang",
    "cay-ghep-implant/all-on-4": "sub_implant_allon4",
    "cay-ghep-implant/tuc-thi": "sub_implant_tucthi",
    "nieng-rang/mac-cai-kim-loai": "sub_ortho_maccaikimloai",
    "nieng-rang/mac-cai-su": "sub_ortho_maccaisu",
    "nieng-rang/invisalign": "sub_ortho_invisalign",
    "nieng-rang/mat-luoi": "sub_ortho_matluoi",
    "rang-su-tham-my/boc-rang-su": "sub_veneer_bocrangsu",
    "rang-su-tham-my/dan-veneer": "sub_veneer_danveneer",
    "rang-su-tham-my/smile-design": "sub_veneer_smiledesign",
    "phau-thuat-trong-mieng/nho-rang-khon": "sub_surgery_nhorangkhon",
    "phau-thuat-trong-mieng/cuoi-ho-loi": "sub_surgery_cuoiholoi",
    "phau-thuat-trong-mieng/ghep-xuong": "sub_surgery_ghepxuong",
    "phau-thuat-trong-mieng/nang-xoang": "sub_surgery_nangxoang",
};

export const SERVICES = [
    {
        slugs: { vi: "cay-ghep-implant", en: "dental-implant" },
        title: "Cấy ghép Implant",
        shortDesc: "Phục hồi răng mất bằng công nghệ Implant hiện đại, bền vững như răng thật.",
        icon: "implant",
        featured: true,
        subServices: [
            { slugs: { vi: "1-rang", en: "single-tooth" }, title: "Implant 1 răng" },
            { slugs: { vi: "nhieu-rang", en: "multiple-teeth" }, title: "Implant nhiều răng" },
            { slugs: { vi: "all-on-4", en: "all-on-4" }, title: "All-on-4" },
            { slugs: { vi: "tuc-thi", en: "immediate" }, title: "Implant tức thì" },
        ],
    },
    {
        slugs: { vi: "nieng-rang", en: "orthodontics" },
        title: "Niềng răng – Chỉnh nha",
        shortDesc: "Chỉnh nha thẩm mỹ với nhiều phương pháp từ mắc cài đến trong suốt.",
        icon: "orthodontic",
        featured: true,
        subServices: [
            { slugs: { vi: "mac-cai-kim-loai", en: "metal-braces" }, title: "Mắc cài kim loại" },
            { slugs: { vi: "mac-cai-su", en: "ceramic-braces" }, title: "Mắc cài sứ" },
            { slugs: { vi: "invisalign", en: "invisalign" }, title: "Invisalign" },
            { slugs: { vi: "mat-luoi", en: "lingual-braces" }, title: "Mắc cài mặt lưỡi" },
        ],
    },
    {
        slugs: { vi: "rang-su-tham-my", en: "cosmetic-dentistry" },
        title: "Răng sứ thẩm mỹ",
        shortDesc: "Phục hình thẩm mỹ với răng sứ cao cấp, tự nhiên và bền đẹp.",
        icon: "veneer",
        featured: true,
        subServices: [
            { slugs: { vi: "boc-rang-su", en: "porcelain-crowns" }, title: "Bọc răng sứ" },
            { slugs: { vi: "dan-veneer", en: "veneers" }, title: "Dán Veneer" },
            { slugs: { vi: "smile-design", en: "smile-design" }, title: "Smile Design" },
        ],
    },
    {
        slugs: { vi: "phau-thuat-trong-mieng", en: "oral-surgery" },
        title: "Phẫu thuật trong miệng",
        shortDesc: "Phẫu thuật chuyên sâu: nhổ răng khôn, cười hở lợi, ghép xương.",
        icon: "surgery",
        featured: true,
        subServices: [
            { slugs: { vi: "nho-rang-khon", en: "wisdom-teeth" }, title: "Nhổ răng khôn" },
            { slugs: { vi: "cuoi-ho-loi", en: "gummy-smile" }, title: "Cười hở lợi" },
            { slugs: { vi: "ghep-xuong", en: "bone-grafting" }, title: "Ghép xương" },
            { slugs: { vi: "nang-xoang", en: "sinus-lift" }, title: "Nâng xoang" },
        ],
    },
    {
        slugs: { vi: "dieu-tri-noi-nha", en: "endodontics" },
        title: "Điều trị nội nha",
        shortDesc: "Điều trị tủy răng chuyên sâu, bảo tồn răng tối đa.",
        icon: "endodontic",
        featured: false,
        subServices: [],
    },
    {
        slugs: { vi: "nha-khoa-tre-em", en: "pediatric-dentistry" },
        title: "Nha khoa trẻ em",
        shortDesc: "Chăm sóc răng miệng toàn diện cho trẻ em trong môi trường thân thiện.",
        icon: "pediatric",
        featured: false,
        subServices: [],
    },
    {
        slugs: { vi: "tay-trang-rang", en: "teeth-whitening" },
        title: "Tẩy trắng răng",
        shortDesc: "Trắng sáng tự nhiên với công nghệ tẩy trắng an toàn, hiệu quả.",
        icon: "whitening",
        featured: false,
        subServices: [],
    },
];
