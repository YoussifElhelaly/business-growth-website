import heroLocal1 from "../assets/1620763_0.jpeg.webp";
import heroLocal2 from "../assets/4161701-1813469462.jpeg";
import heroLocal3 from "../assets/1000_F_230591499_S9enqjKZLQc5vjHMXHVtf1TIUFyP6ZqP.jpg";
import aboutLocal from '../assets/meeting-of-saudi-arab-gulf-co-workers-thumbnail-29819.webp'
const U = (id, w, h) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const PIC = {
  hero: [heroLocal1, heroLocal2, heroLocal3],
  about: [U("1497215728101-856f4ea42174", 1200, 1500), aboutLocal],
  cta: U("1519389950473-47ba0277781c", 2000, 1000),
  pageHead: {
    about: U("1497366811353-6870744d04b2", 2000, 900),
    services: U("1497215728101-856f4ea42174", 2000, 900),
    faq: U("1454165804606-c3d57bc86b40", 2000, 900),
    blog: U("1450101499163-c8848c66ca85", 2000, 900),
    contact: U("1486406146926-c627a92ad1ab", 2000, 900),
  },
  gallery: [
    U("1497366811353-6870744d04b2", 1200, 1500),
    U("1524758631624-e2822e304c36", 1200, 900),
    U("1541746972996-4e0b0f43e02a", 1200, 900),
    U("1497366754035-f200968a6e72", 1200, 1500),
    U("1497215728101-856f4ea42174", 1200, 900),
  ],
};

export const TEAM_PHOTOS = {
  khalid: U("1472099645785-5658abf4ff4e", 900, 1200),
  noura: U("1573496359142-b8d87734a5a2", 900, 1200),
  abdulrahman: U("1507003211169-0a1dd7228f2d", 900, 1200),
  layan: U("1580489944761-15a19d654956", 900, 1200),
};

export const ARTICLE_IMAGES = {
  est: U("1521737604893-d14cc237f11d", 1200, 800),
  invest: U("1541888946425-d81bb19240f5", 1200, 800),
  tax: U("1552664730-d307ca884978", 1200, 800),
  legal: U("1521791136064-7986c2920216", 1200, 800),
  est2: U("1486406146926-c627a92ad1ab", 1200, 800),
};

export const SERVICE_IMAGES = {
  formation: U("1450101499163-c8848c66ca85", 1400, 1000),
  investment: U("1512453979798-5ea266f8880c", 1400, 1000),
  legal: U("1517048676732-d65bc937f952", 1400, 1000),
  accounting: U("1454165804606-c3d57bc86b40", 1400, 1000),
  contracts: U("1521791136064-7986c2920216", 1400, 1000),
  compliance: U("1431540015161-0bf868a2d407", 1400, 1000),
};
