// Single source of truth for every admin-managed content section (besides
// "services", which has its own bespoke implementation in server/routes and
// src/admin). Both the Express server (validation + storage shape) and the
// React admin UI (form rendering) read this file.
//
// Field types:
//  - text / textarea: a string. `bilingual: true` stores {ar, en}.
//  - plain: a shared (non-language) string, e.g. an id, phone number, number-as-string.
//  - icon: a shared string, rendered as a Select of the design-system icon registry.
//  - image: a shared URL string.
//  - checkbox: a shared boolean.
//  - select-ref: a shared string that must equal the `id` of an item in another
//    collection (refKey). refLabelField says which field of that item to show as the option label.
//  - string-list: an array of strings. `bilingual: true` stores {ar: string[], en: string[]}.
//  - object-list: an array of small objects, each shaped by `subFields` (text/textarea, bilingual or not).
//
// A resource is either `mode: "collection"` (an ordered array of records, each
// with an id, full CRUD + reorder) or `mode: "singleton"` (one object, get/update only).
//
// `simpleList: true` marks a collection whose records are just a single
// `value` field — the admin list/form skips the "one row per record" title
// treatment and shows a single input per row instead.

export const RESOURCES = [
  // ---- site settings / singletons ----
  {
    key: "brand",
    mode: "singleton",
    navGroup: "site",
    navLabel: "اسم الموقع",
    fields: [
      { key: "name", label: "اسم الشركة", type: "text", bilingual: true, required: true },
      { key: "tagline", label: "الشعار الفرعي", type: "text", bilingual: true },
    ],
  },
  {
    key: "about",
    mode: "singleton",
    navGroup: "site",
    navLabel: "من نحن",
    fields: [
      { key: "paragraphs", label: "فقرات النص", type: "string-list", bilingual: true, required: true },
      { key: "closing", label: "جملة الخلاصة", type: "textarea", bilingual: true },
    ],
  },
  {
    key: "contact",
    mode: "singleton",
    navGroup: "site",
    navLabel: "بيانات التواصل",
    fields: [
      { key: "address", label: "العنوان", type: "textarea", bilingual: true, required: true },
      { key: "phone", label: "الهاتف", type: "plain", required: true },
      { key: "whatsapp", label: "واتساب", type: "plain" },
      { key: "email", label: "البريد الإلكتروني", type: "plain", required: true },
      { key: "hours", label: "ساعات العمل", type: "text", bilingual: true },
    ],
  },
  {
    key: "risk",
    mode: "singleton",
    navGroup: "site",
    navLabel: "قسم المخاطر",
    fields: [
      {
        key: "items",
        label: "بنود المخاطر",
        type: "object-list",
        required: true,
        subFields: [
          { key: "title", label: "العنوان", type: "text", bilingual: true },
          { key: "description", label: "الوصف", type: "textarea", bilingual: true },
        ],
      },
      { key: "note", label: "ملاحظة الخلاصة", type: "textarea", bilingual: true },
    ],
  },
  {
    key: "promise",
    mode: "collection",
    navGroup: "site",
    navLabel: "وعود الموقع",
    simpleList: true,
    itemLabelField: "value",
    fields: [{ key: "value", label: "النص", type: "text", bilingual: true, required: true }],
  },
  {
    key: "officeCaptions",
    mode: "collection",
    navGroup: "site",
    navLabel: "صور المكتب",
    itemLabelField: "value",
    fields: [
      { key: "image", label: "الصورة (رابط)", type: "image" },
      { key: "value", label: "التعليق", type: "text", bilingual: true, required: true },
    ],
  },

  // ---- stats ----
  {
    key: "stats",
    mode: "collection",
    navGroup: "stats",
    navLabel: "الإحصائيات الرئيسية",
    itemLabelField: "label",
    fields: [
      { key: "value", label: "القيمة", type: "plain", required: true },
      { key: "suffix", label: "الإضافة (+ أو %)", type: "plain" },
      { key: "label", label: "التسمية", type: "text", bilingual: true, required: true },
    ],
  },
  {
    key: "heroStats",
    mode: "collection",
    navGroup: "stats",
    navLabel: "إحصائيات الهيرو",
    itemLabelField: "label",
    fields: [
      { key: "value", label: "القيمة", type: "text", bilingual: true, required: true },
      { key: "label", label: "التسمية", type: "text", bilingual: true, required: true },
    ],
  },
  {
    key: "whyStats",
    mode: "collection",
    navGroup: "stats",
    navLabel: "إحصائيات لماذا نحن",
    itemLabelField: "label",
    fields: [
      { key: "value", label: "القيمة", type: "text", bilingual: true, required: true },
      { key: "label", label: "التسمية", type: "text", bilingual: true, required: true },
    ],
  },

  // ---- icon + title + description style lists ----
  {
    key: "pillars",
    mode: "collection",
    navGroup: "main",
    navLabel: "الأسس",
    itemLabelField: "title",
    fields: [
      { key: "icon", label: "الأيقونة", type: "icon", required: true },
      { key: "title", label: "العنوان", type: "text", bilingual: true, required: true },
      { key: "description", label: "الوصف", type: "textarea", bilingual: true, required: true },
    ],
  },
  {
    key: "audience",
    mode: "collection",
    navGroup: "main",
    navLabel: "الفئات المستهدفة",
    itemLabelField: "title",
    fields: [
      { key: "icon", label: "الأيقونة", type: "icon", required: true },
      { key: "title", label: "العنوان", type: "text", bilingual: true, required: true },
      { key: "description", label: "الوصف", type: "textarea", bilingual: true, required: true },
    ],
  },
  {
    key: "advantages",
    mode: "collection",
    navGroup: "main",
    navLabel: "مميزاتنا",
    itemLabelField: "title",
    fields: [
      { key: "icon", label: "الأيقونة", type: "icon", required: true },
      { key: "title", label: "العنوان", type: "text", bilingual: true, required: true },
      { key: "description", label: "الوصف", type: "textarea", bilingual: true, required: true },
    ],
  },
  {
    key: "values",
    mode: "collection",
    navGroup: "main",
    navLabel: "قيمنا",
    itemLabelField: "title",
    fields: [
      { key: "icon", label: "الأيقونة", type: "icon", required: true },
      { key: "title", label: "العنوان", type: "text", bilingual: true, required: true },
      { key: "description", label: "الوصف", type: "textarea", bilingual: true, required: true },
    ],
  },
  {
    key: "journey",
    mode: "collection",
    navGroup: "main",
    navLabel: "رحلة العميل",
    itemLabelField: "title",
    fields: [
      { key: "title", label: "العنوان", type: "text", bilingual: true, required: true },
      { key: "description", label: "الوصف", type: "textarea", bilingual: true, required: true },
    ],
  },
  {
    key: "whyPoints",
    mode: "collection",
    navGroup: "main",
    navLabel: "لماذا نحن",
    itemLabelField: "title",
    fields: [
      { key: "title", label: "العنوان", type: "text", bilingual: true, required: true },
      { key: "description", label: "الوصف", type: "textarea", bilingual: true, required: true },
    ],
  },
  {
    key: "sectors",
    mode: "collection",
    navGroup: "main",
    navLabel: "القطاعات",
    itemLabelField: "label",
    fields: [
      { key: "icon", label: "الأيقونة", type: "icon", required: true },
      { key: "label", label: "التسمية", type: "text", bilingual: true, required: true },
    ],
  },
  {
    key: "segs",
    mode: "collection",
    navGroup: "main",
    navLabel: "شرائح العملاء",
    itemLabelField: "title",
    fields: [
      { key: "title", label: "العنوان", type: "text", bilingual: true, required: true },
      { key: "subtitle", label: "العنوان الفرعي", type: "text", bilingual: true },
      { key: "description", label: "الوصف", type: "textarea", bilingual: true, required: true },
      { key: "cta", label: "نص الزر", type: "text", bilingual: true },
    ],
  },
  {
    key: "steps",
    mode: "collection",
    navGroup: "main",
    navLabel: "خطوات العمل",
    itemLabelField: "title",
    fields: [
      { key: "number", label: "الرقم", type: "plain", required: true },
      { key: "title", label: "العنوان", type: "text", bilingual: true, required: true },
      { key: "description", label: "الوصف", type: "textarea", bilingual: true, required: true },
    ],
  },

  // ---- team / clients / testimonials / cases ----
  {
    key: "team",
    mode: "collection",
    navGroup: "people",
    navLabel: "الفريق",
    itemLabelField: "name",
    fields: [
      { key: "photo", label: "الصورة (رابط)", type: "image" },
      { key: "name", label: "الاسم", type: "text", bilingual: true, required: true },
      { key: "role", label: "المنصب", type: "text", bilingual: true, required: true },
      { key: "credentials", label: "المؤهلات", type: "text", bilingual: true },
    ],
  },
  {
    key: "clients",
    mode: "collection",
    navGroup: "people",
    navLabel: "عملاؤنا",
    simpleList: true,
    itemLabelField: "value",
    fields: [{ key: "value", label: "اسم العميل", type: "text", bilingual: true, required: true }],
  },
  {
    key: "testimonials",
    mode: "collection",
    navGroup: "people",
    navLabel: "آراء العملاء",
    itemLabelField: "name",
    fields: [
      { key: "featured", label: "مميّز (يظهر بشكل أكبر)", type: "checkbox" },
      { key: "quote", label: "نص الرأي", type: "textarea", bilingual: true, required: true },
      { key: "name", label: "الاسم", type: "text", bilingual: true, required: true },
      { key: "role", label: "المنصب", type: "text", bilingual: true },
      { key: "company", label: "الشركة", type: "text", bilingual: true },
    ],
  },
  {
    key: "cases",
    mode: "collection",
    navGroup: "people",
    navLabel: "قصص عملاء",
    itemLabelField: "who",
    fields: [
      { key: "who", label: "العميل", type: "text", bilingual: true, required: true },
      { key: "sector", label: "القطاع", type: "text", bilingual: true },
      { key: "challenge", label: "التحدي", type: "textarea", bilingual: true, required: true },
      { key: "solution", label: "الحل", type: "textarea", bilingual: true, required: true },
      { key: "result", label: "النتيجة", type: "text", bilingual: true },
      { key: "duration", label: "المدة (بالأيام)", type: "plain" },
    ],
  },

  // ---- FAQ ----
  {
    key: "faqCats",
    mode: "collection",
    navGroup: "faqBlog",
    navLabel: "تصنيفات الأسئلة",
    itemLabelField: "label",
    fields: [{ key: "label", label: "التسمية", type: "text", bilingual: true, required: true }],
  },
  {
    key: "faqs",
    mode: "collection",
    navGroup: "faqBlog",
    navLabel: "الأسئلة الشائعة",
    itemLabelField: "q",
    fields: [
      { key: "category", label: "التصنيف", type: "select-ref", refKey: "faqCats", refLabelField: "label", required: true },
      { key: "q", label: "السؤال", type: "text", bilingual: true, required: true },
      { key: "a", label: "الإجابة", type: "textarea", bilingual: true, required: true },
    ],
  },

  // ---- Blog ----
  {
    key: "blogCats",
    mode: "collection",
    navGroup: "faqBlog",
    navLabel: "تصنيفات المدونة",
    itemLabelField: "label",
    fields: [{ key: "label", label: "التسمية", type: "text", bilingual: true, required: true }],
  },
  {
    key: "articles",
    mode: "collection",
    navGroup: "faqBlog",
    navLabel: "مقالات المدونة",
    itemLabelField: "title",
    fields: [
      { key: "image", label: "الصورة (رابط)", type: "image" },
      { key: "category", label: "التصنيف", type: "select-ref", refKey: "blogCats", refLabelField: "label", required: true },
      { key: "cat", label: "اسم التصنيف المعروض", type: "text", bilingual: true },
      { key: "title", label: "العنوان", type: "text", bilingual: true, required: true },
      { key: "excerpt", label: "المقتطف", type: "textarea", bilingual: true, required: true },
      { key: "body", label: "محتوى المقال", type: "richtext", bilingual: true },
      { key: "date", label: "التاريخ", type: "text", bilingual: true },
      { key: "readTime", label: "مدة القراءة", type: "text", bilingual: true },
    ],
  },
  {
    key: "consultations",
    mode: "collection",
    navGroup: "site",
    navLabel: "طلبات الاستشارة",
    fields: [
      { key: "name", label: "الاسم", type: "plain", required: true },
      { key: "phone", label: "الهاتف", type: "plain", required: true },
      { key: "email", label: "البريد الإلكتروني", type: "plain" },
      { key: "service", label: "الخدمة المطلوبة", type: "plain" },
      { key: "note", label: "الملاحظات", type: "textarea" },
      { key: "date", label: "تاريخ الطلب", type: "plain" }
    ],
  },
];

export function getResource(key) {
  return RESOURCES.find((r) => r.key === key);
}

export const NAV_GROUPS = [
  { key: "main", label: "المحتوى الرئيسي" },
  { key: "stats", label: "الإحصائيات" },
  { key: "people", label: "الفريق والعملاء" },
  { key: "faqBlog", label: "الأسئلة والمدونة" },
  { key: "site", label: "إعدادات الموقع" },
];
