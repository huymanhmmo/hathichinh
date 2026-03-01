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
    name: string;
    address: string;
    city: string;
    isMain?: boolean;
    mapUrl?: string;
}

export const CLINICS: Clinic[] = [
    {
        id: "dc-dental",
        name: "Nha khoa DC Dental",
        address: "Số 2 Giang Cao, Bát Tràng, Gia Lâm, Hà Nội",
        city: "Hà Nội",
        isMain: true,
    },
    {
        id: "ocean",
        name: "Nha khoa Ocean",
        address: "S208 Vinhomes Ocean Park, Đa Tốn, Gia Lâm, Hà Nội",
        city: "Hà Nội",
    },
    {
        id: "eco-dental",
        name: "Nha khoa Eco Dental",
        address: "150C Thủy Nguyên, Ecopark, Văn Giang, Hưng Yên",
        city: "Hưng Yên",
    },
    {
        id: "an-nam",
        name: "Nha Khoa An Nam",
        address: "Ngã 5 Phi Liệt, Liên Nghĩa, Văn Giang, Hưng Yên",
        city: "Hưng Yên",
    },
    {
        id: "hai-duong",
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
        slug: "cay-ghep-implant",
        title: "Cấy ghép Implant",
        shortDesc: "Phục hồi răng mất bằng công nghệ Implant hiện đại, bền vững như răng thật.",
        icon: "implant",
        featured: true,
        subServices: [
            { slug: "1-rang", title: "Implant 1 răng" },
            { slug: "nhieu-rang", title: "Implant nhiều răng" },
            { slug: "all-on-4", title: "All-on-4" },
            { slug: "tuc-thi", title: "Implant tức thì" },
        ],
    },
    {
        slug: "nieng-rang",
        title: "Niềng răng – Chỉnh nha",
        shortDesc: "Chỉnh nha thẩm mỹ với nhiều phương pháp từ mắc cài đến trong suốt.",
        icon: "orthodontic",
        featured: true,
        subServices: [
            { slug: "mac-cai-kim-loai", title: "Mắc cài kim loại" },
            { slug: "mac-cai-su", title: "Mắc cài sứ" },
            { slug: "invisalign", title: "Invisalign" },
            { slug: "mat-luoi", title: "Mắc cài mặt lưỡi" },
        ],
    },
    {
        slug: "rang-su-tham-my",
        title: "Răng sứ thẩm mỹ",
        shortDesc: "Phục hình thẩm mỹ với răng sứ cao cấp, tự nhiên và bền đẹp.",
        icon: "veneer",
        featured: true,
        subServices: [
            { slug: "boc-rang-su", title: "Bọc răng sứ" },
            { slug: "dan-veneer", title: "Dán Veneer" },
            { slug: "smile-design", title: "Smile Design" },
        ],
    },
    {
        slug: "phau-thuat-trong-mieng",
        title: "Phẫu thuật trong miệng",
        shortDesc: "Phẫu thuật chuyên sâu: nhổ răng khôn, cười hở lợi, ghép xương.",
        icon: "surgery",
        featured: true,
        subServices: [
            { slug: "nho-rang-khon", title: "Nhổ răng khôn" },
            { slug: "cuoi-ho-loi", title: "Cười hở lợi" },
            { slug: "ghep-xuong", title: "Ghép xương" },
            { slug: "nang-xoang", title: "Nâng xoang" },
        ],
    },
    {
        slug: "dieu-tri-noi-nha",
        title: "Điều trị nội nha",
        shortDesc: "Điều trị tủy răng chuyên sâu, bảo tồn răng tối đa.",
        icon: "endodontic",
        featured: false,
        subServices: [],
    },
    {
        slug: "nha-khoa-tre-em",
        title: "Nha khoa trẻ em",
        shortDesc: "Chăm sóc răng miệng toàn diện cho trẻ em trong môi trường thân thiện.",
        icon: "pediatric",
        featured: false,
        subServices: [],
    },
    {
        slug: "tay-trang-rang",
        title: "Tẩy trắng răng",
        shortDesc: "Trắng sáng tự nhiên với công nghệ tẩy trắng an toàn, hiệu quả.",
        icon: "whitening",
        featured: false,
        subServices: [],
    },
];
