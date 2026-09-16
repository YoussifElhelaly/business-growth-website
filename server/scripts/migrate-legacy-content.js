// One-off migration: converts the old two-file (content.ar.js / content.en.js)
// static content into the new per-resource bilingual JSON seed files under
// server/data/. Source data is inlined here (copied from the pre-migration
// content files) rather than imported, because those files transitively
// import a .webp asset via a Vite-only import that plain Node can't resolve.
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "data");

const TEAM_PHOTOS = {
  khalid: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&h=1200&q=80",
  noura: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&h=1200&q=80",
  abdulrahman: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&h=1200&q=80",
  layan: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&h=1200&q=80",
};
const ARTICLE_IMAGES = {
  est: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&h=800&q=80",
  invest: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&h=800&q=80",
  tax: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&h=800&q=80",
  legal: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&h=800&q=80",
  est2: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&h=800&q=80",
};

const ar = {
  brand: { name: "بزنس جروث", tagline: "تأسيس · تنظيم · نمو" },
  promise: ["خبرة مرخّصة", "سرعة في الإنجاز", "وضوح في الأتعاب", "متابعة بعد التأسيس"],
  stats: [
    { value: 14, suffix: "+", label: "سنة خبرة في السوق السعودي" },
    { value: 860, label: "شركة تم تأسيسها" },
    { value: 12, label: "قطاعاً نخدمه" },
    { value: 98, suffix: "%", label: "نسبة رضا العملاء" },
  ],
  heroStats: [
    { value: "+120", label: "شركة تم تأسيسها" },
    { value: "14", label: "سنة خبرة في السوق السعودي" },
    { value: "12", label: "جنسية لعملائنا" },
    { value: "18", label: "خدمة تحت سقف واحد" },
  ],
  whyStats: [
    { value: "+20", label: "سنة خبرة" },
    { value: "+500", label: "عميل" },
    { value: "98%", label: "التزام بالمواعيد" },
    { value: "+25", label: "ترخيصًا نُصدره شهريًا" },
  ],
  pillars: [
    { icon: "landmark", title: "بداية صحيحة", description: "نختار الكيان والترخيص المناسبين لطبيعة نشاطك وملكيتك وطموحك، قبل أن تُفتح أي معاملة." },
    { icon: "shield-check", title: "حماية مبكرة", description: "علامتك التجارية وعقودك وأصولك الفكرية محمية قبل أن تنفق على التسويق وتدخل في شراكات." },
    { icon: "trending-up", title: "جاهزية للنمو", description: "كيان منظّم بعقود وإجراءات وتصنيف يسمح لك بالتوسع والمنافسة على مشاريع أكبر." },
  ],
  audience: [
    { icon: "globe", title: "مستثمر أجنبي", description: "تريد دخول السوق السعودي بثقة ومسار نظامي واضح من البداية." },
    { icon: "handshake", title: "مستثمر خليجي", description: "تريد تأسيس نشاطك والاستفادة من المسار المناسب لصفتك." },
    { icon: "sparkles", title: "رائد أعمال سعودي", description: "تريد تأسيس شركة منظّمة بدلاً من إدارة نشاطك بشكل عشوائي." },
    { icon: "building", title: "صاحب شركة قائمة", description: "تحتاج تراخيص أو عقوداً أو إعادة تنظيم أو تجهيزاً للتوسع." },
  ],
  risk: {
    items: [
      { title: "كيان غير مناسب", description: "شكل نظامي لا يناسب طبيعة نشاطك ولا هيكل ملكيتك." },
      { title: "ترخيص غير متوافق", description: "رخصة لا تغطي نموذج عملك الفعلي فتتعطل قبل أن تبدأ." },
      { title: "تأخير التشغيل", description: "شهور تمضي قبل أن تتمكن من تحقيق أول ريال إيراد." },
      { title: "عقود ضعيفة", description: "عقود لا تحمي حقوق الشركاء يوم يظهر الخلاف فعلاً." },
      { title: "علامة غير محمية", description: "اسم بنيته بالمال والوقت يمكن أن يسجّله غيرك باسمه." },
      { title: "شراكة غير منظّمة", description: "علاقة قائمة على الثقة وحدها دون تنظيم مكتوب للأدوار." },
      { title: "استثمار بلا جدوى", description: "ضخ رأس مال في مشروع لم تُختبر أرقامه ولا سوقه." },
      { title: "مخاطر بعد الاستحواذ", description: "التزامات وقضايا تظهر بعد شراء شركة قائمة بلا فحص." },
    ],
    note: "لهذا نحن لا نبدأ بالمعاملة... بل نبدأ بفهم مشروعك.",
  },
  journey: [
    { title: "فكرة", description: "نفهم نشاطك وهدفك" },
    { title: "جدوى", description: "نختبر الأرقام والسوق" },
    { title: "كيان", description: "نؤسس الشكل الأنسب" },
    { title: "ترخيص", description: "نُجهّزك لممارسة النشاط" },
    { title: "حماية", description: "علامتك وعقودك وأصولك" },
    { title: "نمو", description: "تشغيل وتنظيم وتوسّع" },
  ],
  sectors: [
    { label: "مقاولات", icon: "hard-hat" },
    { label: "تجزئة", icon: "shopping-bag" },
    { label: "تقنية", icon: "cpu" },
    { label: "لوجستيك", icon: "truck" },
    { label: "رعاية صحية", icon: "stethoscope" },
    { label: "تعليم", icon: "graduation-cap" },
  ],
  clients: ["الواحة الطبية", "مسار اللوجستيك", "برج الرياض العقارية", "سُحُب للتقنية", "معهد الرافد"],
  whyPoints: [
    { title: "نفهم الأعمال، لا الإجراءات فقط", description: "ننظر إلى التأسيس من زاوية المستثمر ورائد الأعمال، وليس من زاوية المعاملة وحدها." },
    { title: "نقلّل المفاجآت", description: "قبل أن تبدأ، تعرف المسار المتوقع والمتطلبات والتكاليف والمدة التقديرية بحسب حالتك." },
    { title: "نربط الخدمات ببعضها", description: "التأسيس والترخيص والعلامة والعقود والدراسة ليست ملفات منفصلة — نربطها حين ترتبط بنجاح مشروعك." },
    { title: "نقلّل الأخطاء المكلفة", description: "نراجع المسار قبل التنفيذ، لأن تصحيح الخطأ بعد وقوعه أكثر تكلفة من منعه." },
    { title: "وضوح من البداية", description: "ماذا سنفعل، ولماذا، وكم سيكلف، وما المتوقع زمنياً — تعرف الإجابات قبل أن تبدأ." },
    { title: "شخص يتابع ملفك", description: "لا نريدك أن تشعر أنك رقم طلب — نتابع ملفك ونبقيك على اطلاع بمراحله." },
  ],
  about: {
    paragraphs: [
      "بزنس جروث تعمل على مساعدة المستثمرين ورواد الأعمال في بناء وتنظيم أعمالهم داخل المملكة.",
      "نجمع بين الخبرة النظامية في الإجراءات والتراخيص والعقود، وبين التفكير التجاري الذي يركز على السوق والجدوى والنمو.",
    ],
    closing: "تأسيس الشركة ليس الهدف النهائي. الهدف أن تبدأ بشكل صحيح، وتتحرك بثقة، وتبني شيئاً قابلاً للنمو.",
  },
  advantages: [
    { icon: "users", title: "فريق مرخّص", description: "محامون ومحاسبون قانونيون مرخّصون من الجهات السعودية المختصة." },
    { icon: "clock", title: "سرعة الإنجاز", description: "متوسط سبعة أيام عمل لإتمام التأسيس بعد استكمال المستندات." },
    { icon: "languages", title: "خدمة بلغتين", description: "مراسلات ومستندات بالعربية والإنجليزية للمستثمرين من خارج المملكة." },
    { icon: "file-check", title: "وضوح في الأتعاب", description: "عرض سعر مكتوب قبل البدء، دون رسوم مفاجئة في منتصف الإجراء." },
  ],
  values: [
    { icon: "shield-check", title: "الأمانة", description: "نقول للعميل ما يحتاج معرفته، وليس ما يرغب في سماعه." },
    { icon: "target", title: "الدقة", description: "مراجعة مزدوجة لكل مستند قبل تقديمه للجهات الرسمية." },
    { icon: "lock", title: "السرية", description: "تُعالَج بيانات العملاء وفق سياسة سرية مكتوبة وملزمة." },
    { icon: "handshake", title: "الشراكة", description: "نبقى مع العميل بعد التأسيس، لا نتوقف عند إصدار السجل." },
  ],
  segs: [
    { title: "مستثمر أجنبي", subtitle: "دخول السوق السعودي يبدأ بالقرار الصحيح", description: "لا تبدأ بإرسال الأوراق قبل أن تعرف: ما الكيان المناسب؟ ما التراخيص المطلوبة؟ ما القيود المرتبطة بالنشاط؟ وما التكلفة المتوقعة؟", cta: "ابدأ استثمارك في السعودية" },
    { title: "رائد أعمال سعودي أو خليجي", subtitle: "لا تجعل مشروعك أكبر من نظامه", description: "إذا كان مشروعك ينمو، فقد حان وقت أن يكون الكيان والعقود والإجراءات الداخلية على مستوى هذا النمو.", cta: "تحدّث معنا عن مشروعك" },
    { title: "شركة قائمة", subtitle: "ربما لا تحتاج شركة جديدة... بل إعادة تنظيم", description: "مشكلات في التراخيص أو العقود أو الهيكلة أو التصنيف أو العلامة التجارية؟ نقيّم وضعك ونحدد الأولويات.", cta: "اطلب تقييم وضع شركتك" },
  ],
  team: [
    { name: "د. خالد المطيري", role: "الشريك المؤسس", credentials: "محامٍ مرخص · ماجستير قانون تجاري", photo: TEAM_PHOTOS.khalid },
    { name: "نورة الشمري", role: "مديرة الامتثال", credentials: "محاسب قانوني · زميل SOCPA", photo: TEAM_PHOTOS.noura },
    { name: "عبدالرحمن السالم", role: "رئيس قسم التأسيس", credentials: "12 سنة خبرة في السجلات التجارية", photo: TEAM_PHOTOS.abdulrahman },
    { name: "ليان القحطاني", role: "مستشارة ضرائب", credentials: "معتمدة في ضريبة القيمة المضافة", photo: TEAM_PHOTOS.layan },
  ],
  steps: [
    { number: "01", title: "جلسة تشخيص", description: "نستمع لنشاطك وهيكل الملكية ونحدد المسار النظامي المناسب." },
    { number: "02", title: "عرض وخطة", description: "عرض سعر مكتوب وجدول زمني وقائمة بالمستندات المطلوبة." },
    { number: "03", title: "التنفيذ", description: "ننهي الإجراءات لدى الجهات ونوافيك بتحديث أسبوعي." },
    { number: "04", title: "المتابعة", description: "متابعة الامتثال والتجديدات بعد بدء النشاط." },
  ],
  officeCaptions: ["واجهة المكتب", "قاعة الاجتماعات", "منطقة الاستقبال", "مساحة العمل", "الدور الثاني"],
  faqCats: [
    { id: "all", label: "الكل" },
    { id: "est", label: "تأسيس" },
    { id: "legal", label: "قانوني" },
    { id: "tax", label: "محاسبة وضرائب" },
    { id: "billing", label: "الأتعاب" },
  ],
  faqs: [
    { category: "est", q: "هل يمكن للمستثمر الأجنبي تأسيس شركة في السعودية؟", a: "يختلف ذلك بحسب النشاط والهيكل والمتطلبات النظامية ذات العلاقة. نحدد لك المسار المناسب قبل بدء الإجراءات." },
    { category: "billing", q: "كم تكلفة تأسيس الشركة؟", a: "لا توجد تكلفة واحدة تناسب الجميع؛ فهي تختلف بحسب نوع المستثمر والكيان والنشاط والتراخيص المطلوبة. تحصل على تصور واضح للتكلفة قبل البدء." },
    { category: "est", q: "كم يستغرق التأسيس؟", a: "تختلف المدة بحسب نوع الكيان والنشاط والتراخيص والجهات ذات العلاقة. نوضح لك المدة التقديرية لمسارك قبل التنفيذ." },
    { category: "est", q: "هل أحتاج إلى دراسة جدوى؟", a: "ليس كل مشروع يحتاج نفس مستوى الدراسة، لكن إذا كان المشروع يتطلب استثماراً كبيراً، فاختبار الفكرة والسوق والأرقام قبل ضخ رأس المال قد يكون من أهم القرارات التي تتخذها." },
    { category: "legal", q: "هل أحتاج إلى تسجيل العلامة التجارية؟", a: "إذا كانت العلامة جزءاً أساسياً من مشروعك، فإن حمايتها مبكراً تساعدك على حماية الاسم الذي ستنفق وقتاً ومالاً في بنائه." },
    { category: "legal", q: "لماذا أحتاج إلى عقد شراكة؟", a: "لأن الثقة وحدها لا تكفي عندما يكبر المال والعمل والمسؤوليات. العقد الجيد ينظم العلاقة قبل ظهور الخلاف." },
    { category: "est", q: "هل تقدمون خدمات بعد تأسيس الشركة؟", a: "نعم. تشمل خدماتنا المساعدة في الحسابات الإلكترونية، العقود، الاستشارات الإدارية وغيرها من الخدمات التي تحتاجها الشركة خلال مراحل نموها." },
    { category: "est", q: "ماذا أحتاج لأبدأ؟", a: "في البداية نحتاج إلى فهم نشاطك وهدفك ووضعك الحالي. بعدها نحدد لك المسار المناسب والمستندات والخطوات والتكلفة التقديرية." },
    { category: "tax", q: "متى يجب التسجيل في ضريبة القيمة المضافة؟", a: "عند بلوغ الإيرادات السنوية الحد الإلزامي المقرر نظاماً، ويمكن التسجيل الاختياري قبل ذلك." },
    { category: "tax", q: "هل تتولون إعداد القوائم المالية؟", a: "نعم، تُعد القوائم وفق المعايير المعتمدة وتُراجع من محاسب قانوني." },
  ],
  blogCats: [
    { id: "all", label: "الكل" },
    { id: "est", label: "تأسيس" },
    { id: "legal", label: "قانوني" },
    { id: "tax", label: "ضرائب" },
    { id: "invest", label: "استثمار أجنبي" },
  ],
  articles: [
    { image: ARTICLE_IMAGES.est, category: "est", cat: "تأسيس", title: "كم تكلفة تأسيس شركة في السعودية فعلياً؟", excerpt: "تفصيل واقعي للرسوم الحكومية والتكاليف المتغيرة، ولماذا لا توجد تكلفة واحدة تناسب الجميع.", date: "12 أغسطس 2026", readTime: "6 دقائق" },
    { image: ARTICLE_IMAGES.invest, category: "invest", cat: "التراخيص", title: "خمسة أسباب تجعل طلب ترخيصك يُرفض", excerpt: "الأخطاء المتكررة في ملفات التراخيص، وكيف تتفاداها قبل التقديم بدل معالجتها بعد الرفض.", date: "4 أغسطس 2026", readTime: "4 دقائق" },
    { image: ARTICLE_IMAGES.tax, category: "legal", cat: "الملكية الفكرية", title: "لماذا قد تخسر علامتك التجارية إن لم تسجّلها؟", excerpt: "ما الذي يحدث فعلياً حين يسجّل شخص آخر الاسم الذي بنيته، وما خياراتك حينها.", date: "27 يوليو 2026", readTime: "5 دقائق" },
    { image: ARTICLE_IMAGES.legal, category: "legal", cat: "قانوني", title: "خمسة بنود لا يجب إغفالها في عقد الشركاء", excerpt: "من آليات الخروج إلى فض النزاعات، بنود تحمي الشركة قبل نشوء الخلاف.", date: "18 يوليو 2026", readTime: "7 دقائق" },
    { image: ARTICLE_IMAGES.est2, category: "est", cat: "تأسيس", title: "الفروع أم الشركة المستقلة؟ مقارنة نظامية", excerpt: "أثر الاختيار على المسؤولية والضريبة والتراخيص التشغيلية.", date: "9 يوليو 2026", readTime: "6 دقائق" },
  ],
  cases: [
    { who: "مستثمر مصري", sector: "قطاع الأغذية · مطعم ومصنع صغير", challenge: "دخول السوق بدون إقامة استثمارية، ونشاط يتطلب ترخيصاً غذائياً واشتراطات بلدية.", solution: "ترخيص استثماري، سجل تجاري، رخصة بلدي، وتفعيل المنصات الحكومية.", result: "رخصة مشغّلة وافتتاح فعلي", duration: "45" },
    { who: "شركة مقاولات سعودية", sector: "قطاع الإنشاءات", challenge: "شركة قائمة لا تستطيع التقديم على مناقصات حكومية لعدم وجود تصنيف.", solution: "تجهيز ملف التصنيف، معالجة النواقص النظامية، ورفع الطلب ومتابعته.", result: "تصنيف معتمد وأهلية للمناقصات", duration: "60" },
    { who: "رائد أعمال خليجي", sector: "قطاع التجزئة · علامة أزياء", challenge: "علامة تجارية أُطلقت قبل تسجيلها، مع شراكة بلا عقد مكتوب.", solution: "تسجيل العلامة، صياغة عقد شراكة منظّم للأدوار والخروج وحل الخلاف.", result: "علامة محمية وشراكة موثّقة", duration: "30" },
  ],
  testimonials: [
    { featured: true, quote: "أنجزوا تأسيس شركتنا في أسبوع واحد، وكانت المتابعة دقيقة في كل خطوة. أهم ما لمسناه هو الوضوح في الأتعاب والمدة قبل البدء.", name: "سارة العتيبي", role: "المدير المالي", company: "مجموعة نُهى" },
    { quote: "استفدنا من مراجعة العقود قبل التوقيع، ووفّرت علينا التزامات غير محسوبة.", name: "ماجد الدوسري", role: "الشريك المؤسس", company: "شركة أفق للمقاولات" },
    { quote: "كمستثمر غير سعودي، أنهى الفريق الترخيص والتأسيس عن بُعد دون أي زيارة.", name: "Omar Haddad", role: "Managing Director", company: "Levant Retail" },
  ],
  contact: {
    address: "طريق الملك فهد، حي العليا، الرياض ١٢٢١١، المملكة العربية السعودية",
    phone: "920 000 000",
    whatsapp: "+966 55 000 0000",
    email: "info@businessgrowth.sa",
    hours: "الأحد – الخميس · 9:00 – 18:00",
  },
};

const en = {
  brand: { name: "Business Growth", tagline: "Formation · Structuring · Growth" },
  promise: ["Licensed expertise", "Fast turnaround", "Clear, written fees", "Support after formation"],
  stats: [
    { value: 14, suffix: "+", label: "years of experience in the Saudi market" },
    { value: 860, label: "companies formed" },
    { value: 12, label: "sectors we serve" },
    { value: 98, suffix: "%", label: "client satisfaction rate" },
  ],
  heroStats: [
    { value: "120+", label: "companies formed" },
    { value: "14", label: "years in the Saudi market" },
    { value: "12", label: "nationalities served" },
    { value: "18", label: "services under one roof" },
  ],
  whyStats: [
    { value: "20+", label: "years of experience" },
    { value: "500+", label: "clients" },
    { value: "98%", label: "on-time delivery" },
    { value: "25+", label: "licenses issued monthly" },
  ],
  pillars: [
    { icon: "landmark", title: "The right start", description: "We choose the entity and license that fit your activity, ownership, and ambition — before any paperwork is filed." },
    { icon: "shield-check", title: "Early protection", description: "Your brand, contracts, and intellectual assets are protected before you spend on marketing or enter partnerships." },
    { icon: "trending-up", title: "Ready to grow", description: "An entity organized with contracts, procedures, and classification that lets you expand and compete for bigger projects." },
  ],
  audience: [
    { icon: "globe", title: "Foreign investor", description: "You want to enter the Saudi market with confidence and a clear regulatory path from day one." },
    { icon: "handshake", title: "Gulf investor", description: "You want to set up your business and make the most of the path suited to your status." },
    { icon: "sparkles", title: "Saudi entrepreneur", description: "You want a properly organized company instead of running your activity informally." },
    { icon: "building", title: "Existing company owner", description: "You need licenses, contracts, restructuring, or preparation for expansion." },
  ],
  risk: {
    items: [
      { title: "Wrong entity type", description: "A legal form that doesn't fit your activity or ownership structure." },
      { title: "Mismatched license", description: "A license that doesn't cover your actual business model, stalling before you start." },
      { title: "Delayed launch", description: "Months pass before you can generate your first riyal of revenue." },
      { title: "Weak contracts", description: "Contracts that fail to protect partners' rights when a dispute actually arises." },
      { title: "Unprotected brand", description: "A name you built with money and time that someone else can register first." },
      { title: "Unstructured partnership", description: "A relationship built on trust alone, with no written organization of roles." },
      { title: "Investment without feasibility", description: "Capital poured into a project whose numbers and market were never tested." },
      { title: "Post-acquisition risk", description: "Liabilities and disputes surfacing after buying an existing company without due diligence." },
    ],
    note: "That's why we don't start with the transaction... we start by understanding your business.",
  },
  journey: [
    { title: "Idea", description: "We understand your activity and goal" },
    { title: "Feasibility", description: "We test the numbers and the market" },
    { title: "Entity", description: "We form the right legal structure" },
    { title: "License", description: "We get you ready to operate" },
    { title: "Protection", description: "Your brand, contracts, and assets" },
    { title: "Growth", description: "Operations, structuring, and expansion" },
  ],
  sectors: [
    { label: "Contracting", icon: "hard-hat" },
    { label: "Retail", icon: "shopping-bag" },
    { label: "Technology", icon: "cpu" },
    { label: "Logistics", icon: "truck" },
    { label: "Healthcare", icon: "stethoscope" },
    { label: "Education", icon: "graduation-cap" },
  ],
  clients: ["Nuha Group", "Ufuq Contracting", "Levant Retail", "Dar Al Saraya", "Taqniya", "Al Waha Medical", "Masar Logistics", "Riyadh Tower Real Estate", "Suhub Technology", "Al Rafid Institute"],
  whyPoints: [
    { title: "We understand business, not just procedures", description: "We look at formation from the investor's and founder's perspective, not just the transaction itself." },
    { title: "We reduce surprises", description: "Before you start, you know the expected path, requirements, costs, and estimated timeline for your case." },
    { title: "We connect the services", description: "Formation, licensing, trademarks, contracts, and studies aren't separate files — we connect them when your project's success depends on it." },
    { title: "We reduce costly mistakes", description: "We review the path before execution, because fixing a mistake after it happens costs more than preventing it." },
    { title: "Clarity from the start", description: "What we'll do, why, how much it will cost, and the expected timeline — you know the answers before you begin." },
    { title: "One person tracks your file", description: "We don't want you to feel like a ticket number — we track your file and keep you informed at every stage." },
  ],
  about: {
    paragraphs: [
      "Business Growth helps investors and entrepreneurs build and organize their businesses inside the Kingdom.",
      "We combine regulatory expertise in procedures, licensing, and contracts with a commercial mindset focused on market, feasibility, and growth.",
    ],
    closing: "Forming the company isn't the end goal. The goal is to start correctly, move with confidence, and build something capable of growing.",
  },
  advantages: [
    { icon: "users", title: "Licensed team", description: "Lawyers and chartered accountants licensed by the relevant Saudi authorities." },
    { icon: "clock", title: "Fast turnaround", description: "An average of seven business days to complete formation once documents are ready." },
    { icon: "languages", title: "Bilingual service", description: "Correspondence and documents in Arabic and English for investors from outside the Kingdom." },
    { icon: "file-check", title: "Clear, written fees", description: "A written quote before we start — no surprise charges mid-process." },
  ],
  values: [
    { icon: "shield-check", title: "Honesty", description: "We tell clients what they need to know, not what they want to hear." },
    { icon: "target", title: "Precision", description: "Every document gets a double review before it's submitted to official bodies." },
    { icon: "lock", title: "Confidentiality", description: "Client data is handled under a written, binding confidentiality policy." },
    { icon: "handshake", title: "Partnership", description: "We stay with the client after formation — we don't stop once the registration is issued." },
  ],
  segs: [
    { title: "Foreign investor", subtitle: "Entering the Saudi market starts with the right decision", description: "Don't start filing paperwork before you know: what entity fits? What licenses are required? What restrictions apply to your activity? And what's the expected cost?", cta: "Start your investment in Saudi Arabia" },
    { title: "Saudi or Gulf entrepreneur", subtitle: "Don't let your project outgrow its legal structure", description: "If your project is growing, it may be time for your entity, contracts, and internal procedures to match that growth.", cta: "Talk to us about your project" },
    { title: "Existing company", subtitle: "You may not need a new company... just a reorganization", description: "Problems with licenses, contracts, structuring, classification, or your trademark? We assess your situation and set the priorities.", cta: "Request an assessment of your company" },
  ],
  team: [
    { name: "Dr. Khalid Al-Mutairi", role: "Founding Partner", credentials: "Licensed attorney · Master's in Commercial Law", photo: TEAM_PHOTOS.khalid },
    { name: "Noura Al-Shammari", role: "Head of Compliance", credentials: "Chartered accountant · SOCPA fellow", photo: TEAM_PHOTOS.noura },
    { name: "Abdulrahman Al-Salem", role: "Head of Formation", credentials: "12 years of experience in commercial registrations", photo: TEAM_PHOTOS.abdulrahman },
    { name: "Layan Al-Qahtani", role: "Tax Advisor", credentials: "Certified in VAT", photo: TEAM_PHOTOS.layan },
  ],
  steps: [
    { number: "01", title: "Diagnostic session", description: "We learn about your activity and ownership structure and define the right regulatory path." },
    { number: "02", title: "Proposal & plan", description: "A written quote, timeline, and list of required documents." },
    { number: "03", title: "Execution", description: "We complete the procedures with the authorities and send you a weekly update." },
    { number: "04", title: "Ongoing support", description: "Compliance and renewal tracking once your business is up and running." },
  ],
  officeCaptions: ["Office entrance", "Meeting room", "Reception area", "Workspace", "Second floor"],
  faqCats: [
    { id: "all", label: "All" },
    { id: "est", label: "Formation" },
    { id: "legal", label: "Legal" },
    { id: "tax", label: "Accounting & Tax" },
    { id: "billing", label: "Fees" },
  ],
  faqs: [
    { category: "est", q: "Can a foreign investor form a company in Saudi Arabia?", a: "It depends on the activity, structure, and related regulatory requirements. We define the right path for you before starting the procedures." },
    { category: "billing", q: "How much does company formation cost?", a: "There's no single cost that fits everyone; it varies by investor type, entity, activity, and required licenses. You get a clear cost picture before starting." },
    { category: "est", q: "How long does formation take?", a: "The timeline varies by entity type, activity, licenses, and the authorities involved. We outline the estimated timeline for your path before execution." },
    { category: "est", q: "Do I need a feasibility study?", a: "Not every project needs the same level of study, but if it requires significant investment, testing the idea, market, and numbers before committing capital may be one of the most important decisions you make." },
    { category: "legal", q: "Do I need to register a trademark?", a: "If the brand is a core part of your project, protecting it early helps safeguard the name you'll spend time and money building." },
    { category: "legal", q: "Why do I need a partnership agreement?", a: "Because trust alone isn't enough once money, work, and responsibilities grow. A good contract organizes the relationship before a dispute appears." },
    { category: "est", q: "Do you provide services after the company is formed?", a: "Yes. Our services include e-invoicing support, contracts, administrative advisory, and other services the company needs as it grows." },
    { category: "est", q: "What do I need to get started?", a: "At the start, we need to understand your activity, goal, and current situation. Then we define the right path, documents, steps, and estimated cost." },
    { category: "tax", q: "When must a company register for VAT?", a: "Once annual revenue reaches the mandatory statutory threshold; voluntary registration is possible before that." },
    { category: "tax", q: "Do you prepare financial statements?", a: "Yes, statements are prepared to approved standards and reviewed by a chartered accountant." },
  ],
  blogCats: [
    { id: "all", label: "All" },
    { id: "est", label: "Formation" },
    { id: "legal", label: "Legal" },
    { id: "tax", label: "Tax" },
    { id: "invest", label: "Foreign Investment" },
  ],
  articles: [
    { image: ARTICLE_IMAGES.est, category: "est", cat: "Formation", title: "What does forming a company in Saudi Arabia actually cost?", excerpt: "A realistic breakdown of government fees and variable costs, and why there's no single cost that fits everyone.", date: "August 12, 2026", readTime: "6 min read" },
    { image: ARTICLE_IMAGES.invest, category: "invest", cat: "Licensing", title: "Five reasons your license application gets rejected", excerpt: "The recurring mistakes in license filings, and how to avoid them before applying instead of fixing them after rejection.", date: "August 4, 2026", readTime: "4 min read" },
    { image: ARTICLE_IMAGES.tax, category: "legal", cat: "Intellectual Property", title: "Why you could lose your trademark if you don't register it", excerpt: "What actually happens when someone else registers the name you built, and what your options are then.", date: "July 27, 2026", readTime: "5 min read" },
    { image: ARTICLE_IMAGES.legal, category: "legal", cat: "Legal", title: "Five clauses you shouldn't skip in a partnership agreement", excerpt: "From exit mechanisms to dispute resolution — clauses that protect the company before a conflict arises.", date: "July 18, 2026", readTime: "7 min read" },
    { image: ARTICLE_IMAGES.est2, category: "est", cat: "Formation", title: "Branch or standalone company? A regulatory comparison", excerpt: "How the choice affects liability, tax, and operating licenses.", date: "July 9, 2026", readTime: "6 min read" },
  ],
  cases: [
    { who: "Egyptian investor", sector: "Food sector · restaurant and small factory", challenge: "Entering the market without an investor residency, with an activity requiring a food license and municipal conditions.", solution: "Investment license, commercial registration, municipal license, and activation of government platforms.", result: "Operating license and an actual opening", duration: "45" },
    { who: "Saudi contracting company", sector: "Construction sector", challenge: "An existing company unable to bid on government tenders due to a lack of classification.", solution: "Preparing the classification file, resolving regulatory gaps, and submitting and following up on the application.", result: "Approved classification and tender eligibility", duration: "60" },
    { who: "Gulf entrepreneur", sector: "Retail sector · fashion brand", challenge: "A trademark launched before registration, with a partnership lacking a written contract.", solution: "Registering the trademark, drafting a partnership agreement organizing roles, exit, and dispute resolution.", result: "Protected trademark and a documented partnership", duration: "30" },
  ],
  testimonials: [
    { featured: true, quote: "They formed our company in a single week, and the follow-up was precise at every step. What stood out most was the clarity on fees and timeline before we even started.", name: "Sarah Al-Otaibi", role: "CFO", company: "Nuha Group" },
    { quote: "The contract review before signing saved us from liabilities we hadn't accounted for.", name: "Majed Al-Dosari", role: "Founding Partner", company: "Ufuq Contracting" },
    { quote: "As a non-Saudi investor, the team completed licensing and formation remotely without a single visit.", name: "Omar Haddad", role: "Managing Director", company: "Levant Retail" },
  ],
  contact: {
    address: "King Fahd Road, Al Olaya, Riyadh 12211, Saudi Arabia",
    phone: "920 000 000",
    whatsapp: "+966 55 000 0000",
    email: "info@businessgrowth.sa",
    hours: "Sun – Thu · 9:00 AM – 6:00 PM",
  },
};

const uid = () => crypto.randomUUID();
const bi = (a, e) => ({ ar: a, en: e });

async function writeSeed(key, data) {
  await fs.writeFile(path.join(dataDir, `${key}.json`), JSON.stringify(data, null, 2) + "\n");
  console.log(`wrote ${key}.json`);
}

function zip(icon, arList, enList, mapFn) {
  return arList.map((arItem, i) => mapFn(arItem, enList[i], icon));
}

async function run() {
  await fs.mkdir(dataDir, { recursive: true });

  await writeSeed("brand", { name: bi(ar.brand.name, en.brand.name), tagline: bi(ar.brand.tagline, en.brand.tagline) });

  await writeSeed("about", {
    paragraphs: ar.about.paragraphs.map((p, i) => bi(p, en.about.paragraphs[i])),
    closing: bi(ar.about.closing, en.about.closing),
  });

  await writeSeed("contact", {
    address: bi(ar.contact.address, en.contact.address),
    phone: ar.contact.phone,
    whatsapp: ar.contact.whatsapp,
    email: ar.contact.email,
    hours: bi(ar.contact.hours, en.contact.hours),
  });

  await writeSeed("risk", {
    items: ar.risk.items.map((item, i) => ({
      title: bi(item.title, en.risk.items[i].title),
      description: bi(item.description, en.risk.items[i].description),
    })),
    note: bi(ar.risk.note, en.risk.note),
  });

  await writeSeed(
    "promise",
    ar.promise.map((v, i) => ({ id: uid(), value: bi(v, en.promise[i]) }))
  );

  await writeSeed(
    "officeCaptions",
    ar.officeCaptions.map((v, i) => ({ id: uid(), value: bi(v, en.officeCaptions[i]) }))
  );

  await writeSeed(
    "stats",
    ar.stats.map((s, i) => ({ id: uid(), value: s.value, suffix: s.suffix || "", label: bi(s.label, en.stats[i].label) }))
  );

  await writeSeed(
    "heroStats",
    ar.heroStats.map((s, i) => ({ id: uid(), value: bi(s.value, en.heroStats[i].value), label: bi(s.label, en.heroStats[i].label) }))
  );

  await writeSeed(
    "whyStats",
    ar.whyStats.map((s, i) => ({ id: uid(), value: bi(s.value, en.whyStats[i].value), label: bi(s.label, en.whyStats[i].label) }))
  );

  for (const key of ["pillars", "audience", "advantages", "values"]) {
    await writeSeed(
      key,
      ar[key].map((item, i) => ({ id: uid(), icon: item.icon, title: bi(item.title, en[key][i].title), description: bi(item.description, en[key][i].description) }))
    );
  }

  for (const key of ["journey", "whyPoints"]) {
    await writeSeed(
      key,
      ar[key].map((item, i) => ({ id: uid(), title: bi(item.title, en[key][i].title), description: bi(item.description, en[key][i].description) }))
    );
  }

  await writeSeed(
    "sectors",
    ar.sectors.map((s, i) => ({ id: uid(), icon: s.icon, label: bi(s.label, en.sectors[i].label) }))
  );

  await writeSeed(
    "segs",
    ar.segs.map((s, i) => ({
      id: uid(),
      title: bi(s.title, en.segs[i].title),
      subtitle: bi(s.subtitle, en.segs[i].subtitle),
      description: bi(s.description, en.segs[i].description),
      cta: bi(s.cta, en.segs[i].cta),
    }))
  );

  await writeSeed(
    "steps",
    ar.steps.map((s, i) => ({ id: uid(), number: s.number, title: bi(s.title, en.steps[i].title), description: bi(s.description, en.steps[i].description) }))
  );

  await writeSeed(
    "team",
    ar.team.map((m, i) => ({ id: uid(), photo: m.photo, name: bi(m.name, en.team[i].name), role: bi(m.role, en.team[i].role), credentials: bi(m.credentials, en.team[i].credentials) }))
  );

  // NOTE: ar.clients has 5 entries, en.clients has 10 — a pre-existing content
  // gap (5 client names were never translated to Arabic). The first 5 EN-only
  // names are seeded with the English text as a placeholder in the `ar` slot;
  // the remaining 5 pair up correctly with their Arabic translations.
  const clientPairs = [
    ...en.clients.slice(0, 5).map((name) => ({ ar: name, en: name })),
    ...ar.clients.map((name, i) => ({ ar: name, en: en.clients[5 + i] })),
  ];
  await writeSeed(
    "clients",
    clientPairs.map((c) => ({ id: uid(), value: bi(c.ar, c.en) }))
  );

  await writeSeed(
    "testimonials",
    ar.testimonials.map((t, i) => ({
      id: uid(),
      featured: Boolean(t.featured),
      quote: bi(t.quote, en.testimonials[i].quote),
      name: bi(t.name, en.testimonials[i].name),
      role: bi(t.role, en.testimonials[i].role),
      company: bi(t.company, en.testimonials[i].company),
    }))
  );

  await writeSeed(
    "cases",
    ar.cases.map((c, i) => ({
      id: uid(),
      who: bi(c.who, en.cases[i].who),
      sector: bi(c.sector, en.cases[i].sector),
      challenge: bi(c.challenge, en.cases[i].challenge),
      solution: bi(c.solution, en.cases[i].solution),
      result: bi(c.result, en.cases[i].result),
      duration: c.duration,
    }))
  );

  // faqCategories/blogCategories keep their original ids ("est", "legal", ...)
  // because faqs/articles reference them by that exact id.
  await writeSeed(
    "faqCats",
    ar.faqCats.map((c, i) => ({ id: c.id, label: bi(c.label, en.faqCats[i].label) }))
  );

  await writeSeed(
    "faqs",
    ar.faqs.map((f, i) => ({ id: uid(), category: f.category, q: bi(f.q, en.faqs[i].q), a: bi(f.a, en.faqs[i].a) }))
  );

  await writeSeed(
    "blogCats",
    ar.blogCats.map((c, i) => ({ id: c.id, label: bi(c.label, en.blogCats[i].label) }))
  );

  await writeSeed(
    "articles",
    ar.articles.map((a, i) => ({
      id: uid(),
      image: a.image,
      category: a.category,
      cat: bi(a.cat, en.articles[i].cat),
      title: bi(a.title, en.articles[i].title),
      excerpt: bi(a.excerpt, en.articles[i].excerpt),
      date: bi(a.date, en.articles[i].date),
      readTime: bi(a.readTime, en.articles[i].readTime),
    }))
  );

  console.log("Migration complete.");
}

run();
