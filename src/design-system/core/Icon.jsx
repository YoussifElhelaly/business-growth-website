import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Check,
  CheckCircle,
  ChevronDown,
  Clock,
  Cpu,
  FileCheck,
  FileText,
  Globe,
  GraduationCap,
  Handshake,
  HardHat,
  HelpCircle,
  Instagram,
  Landmark,
  Languages,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Scale,
  ShieldCheck,
  ShoppingBag,
  Star,
  Stethoscope,
  Target,
  Truck,
  Twitter,
  Users,
  X,
  Youtube,
} from "lucide-react";

const ICONS = {
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  calculator: Calculator,
  check: Check,
  "check-circle": CheckCircle,
  "chevron-down": ChevronDown,
  clock: Clock,
  cpu: Cpu,
  "file-check": FileCheck,
  "file-text": FileText,
  globe: Globe,
  "graduation-cap": GraduationCap,
  handshake: Handshake,
  "hard-hat": HardHat,
  instagram: Instagram,
  landmark: Landmark,
  languages: Languages,
  linkedin: Linkedin,
  lock: Lock,
  mail: Mail,
  "map-pin": MapPin,
  menu: Menu,
  "message-circle": MessageCircle,
  minus: Minus,
  phone: Phone,
  plus: Plus,
  scale: Scale,
  "shield-check": ShieldCheck,
  "shopping-bag": ShoppingBag,
  star: Star,
  stethoscope: Stethoscope,
  target: Target,
  truck: Truck,
  twitter: Twitter,
  users: Users,
  x: X,
  youtube: Youtube,
};

const DIRECTIONAL_MIRROR = { "arrow-left": "arrow-right", "arrow-right": "arrow-left" };

function resolveIcon(name) {
  const cmp = ICONS[name];
  if (!cmp && import.meta.env.DEV) {
    console.warn(`[Icon] "${name}" is not registered in design-system/core/Icon.jsx — add it to the ICONS map.`);
  }
  return cmp || HelpCircle;
}

export function Icon({ name, size = 20, strokeWidth = 1.75, className = "", title, style }) {
  const { i18n } = useTranslation();
  const resolvedName = i18n.dir() === "ltr" && DIRECTIONAL_MIRROR[name] ? DIRECTIONAL_MIRROR[name] : name;
  const Cmp = resolveIcon(resolvedName);
  return (
    <Cmp
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      className={`inline-flex shrink-0 ${className}`}
      style={style}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    />
  );
}
