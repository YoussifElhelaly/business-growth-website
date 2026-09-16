import aboutLocal from '../assets/meeting-of-saudi-arab-gulf-co-workers-thumbnail-29819.webp'
const U = (id, w, h) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const PIC = {
  hero: [
    "https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?w=1800&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1694018359679-49465b4c0d61?w=1800&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1674386491555-5b92161e4d04?w=1800&q=80&auto=format&fit=crop",
  ],
  about: [U("1497215728101-856f4ea42174", 1200, 1500), aboutLocal],
  cta: U("1519389950473-47ba0277781c", 2000, 1000),
  pageHead: {
    about: U("1497366811353-6870744d04b2", 2000, 900),
    services: U("1497215728101-856f4ea42174", 2000, 900),
    faq: U("1454165804606-c3d57bc86b40", 2000, 900),
    blog: U("1450101499163-c8848c66ca85", 2000, 900),
    contact: U("1486406146926-c627a92ad1ab", 2000, 900),
  },
  audience: [
    U("1674386491555-5b92161e4d04", 700, 500),
    U("1672257694085-3a5c603cda1a", 700, 500),
    U("1669529250752-9f5b54b30491", 700, 500),
    U("1605237165959-dcc784975d51", 700, 500),
  ],
  segs: [
    U("1506795213373-430e921fe2ed", 900, 700),
    U("1543282649-6d12df6b5fc2", 900, 700),
    U("1674386491555-5b92161e4d04", 900, 700),
  ],
  risk: "https://images.unsplash.com/photo-1676055003135-489fda067670?w=1600&q=80&auto=format&fit=crop",
};

