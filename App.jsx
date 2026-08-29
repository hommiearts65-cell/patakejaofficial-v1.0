import { useState, useEffect, useRef, useMemo } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Search,
  MapPin,
  Bed,
  Bath,
  Ruler,
  Heart,
  ChevronRight,
  ChevronDown,
  Check,
  Star,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  Home as HomeIcon,
  Building2,
  TreePine,
  KeyRound,
  Users,
  UserPlus,
  ShieldCheck,
  ArrowUpRight,
  LayoutGrid,
  Shield,
  LogOut,
  LayoutDashboard,
  ClipboardList,
  UserCog,
  BadgeCheck,
  Ban,
  Trash2,
  Pause,
  RotateCcw,
  Plus,
  Lock,
  Eye,
  EyeOff,
  MessageCircle,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

/* ---------------------------------------------------------------- */
/* Data                                                              */
/* ---------------------------------------------------------------- */

const NAV_LINKS = [
  { key: "buy", label: "Buy" },
  { key: "rent", label: "Rent" },
  { key: "commercial", label: "Commercial" },
  { key: "land", label: "Land" },
  { key: "agents", label: "Agents" },
];

const TAB_META = {
  buy: {
    label: "Buy",
    icon: HomeIcon,
    secondaryLabel: "Bedrooms",
    secondaryOptions: ["Any", "1+", "2+", "3+", "4+"],
    budgetOptions: ["Any budget", "Under KSh 5M", "KSh 5M – 20M", "KSh 20M+"],
  },
  rent: {
    label: "Rent",
    icon: KeyRound,
    secondaryLabel: "Bedrooms",
    secondaryOptions: ["Any", "Studio", "1+", "2+", "3+"],
    budgetOptions: ["Any budget", "Under KSh 40K/mo", "KSh 40K – 120K/mo", "KSh 120K+/mo"],
  },
  commercial: {
    label: "Commercial",
    icon: Building2,
    secondaryLabel: "Space type",
    secondaryOptions: ["Any", "Office", "Retail", "Warehouse"],
    budgetOptions: ["Any budget", "Under KSh 100K/mo", "KSh 100K – 300K/mo", "KSh 300K+/mo"],
  },
  land: {
    label: "Land",
    icon: TreePine,
    secondaryLabel: "Plot size",
    secondaryOptions: ["Any", "Under ¼ acre", "¼ – 1 acre", "1 acre+"],
    budgetOptions: ["Any budget", "Under KSh 3M", "KSh 3M – 10M", "KSh 10M+"],
  },
};

const CATEGORIES = [
  {
    key: "buy",
    icon: HomeIcon,
    title: "Buy",
    blurb: "Houses, apartments and townhouses ready to own.",
    count: "1,050+ listings",
  },
  {
    key: "rent",
    icon: KeyRound,
    title: "Rent",
    blurb: "Monthly homes across every price bracket.",
    count: "820+ listings",
  },
  {
    key: "commercial",
    icon: Building2,
    title: "Commercial",
    blurb: "Offices, retail shopfronts and warehouses.",
    count: "240+ listings",
  },
  {
    key: "land",
    icon: TreePine,
    title: "Land",
    blurb: "Plots for building, farming or holding.",
    count: "180+ listings",
  },
];

const PROPERTIES = [
  {
    id: 1,
    title: "3BR Townhouse",
    location: "Kilimani, Nairobi",
    price: "KSh 18.5M",
    priceValue: 18500000,
    period: "",
    tag: "Buy",
    beds: 3,
    baths: 3,
    size: "210 m²",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
    featured: true,
    description: "A bright, low-maintenance townhouse tucked into a quiet cul-de-sac just off Argwings Kodhek Road. Finished with porcelain tiling throughout, a fitted kitchen, and a small private garden — walking distance to Yaya Centre and Kilimani's café strip.",
    amenities: ["Gated compound", "Fitted kitchen", "Private garden", "24-hour security", "Ample parking"],
    contact: { name: "Wanjiru Kamau", role: "Listing Agent", phone: "+254 722 145 830", email: "wanjiru.kamau@patakeja.co.ke", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=60" },
  },
  {
    id: 2,
    title: "Modern 2BR Apartment",
    location: "Kileleshwa, Nairobi",
    price: "KSh 85,000",
    priceValue: 85000,
    period: "/mo",
    tag: "Rent",
    beds: 2,
    baths: 2,
    size: "120 m²",
    img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=60",
    featured: false,
    description: "A newly refurbished two-bedroom unit on the third floor of a gated block, with backup water, secure parking, and a shared rooftop lounge. Close to Kileleshwa's restaurants and a five-minute drive from the CBD.",
    amenities: ["Backup water", "Secure parking", "Rooftop lounge", "CCTV surveillance"],
    contact: { name: "Peter Mwaura", role: "Property Owner", phone: "+254 733 208 471", email: "peter.mwaura@gmail.com" },
  },
  {
    id: 3,
    title: "Gated 4BR Villa",
    location: "Karen, Nairobi",
    price: "KSh 42M",
    priceValue: 42000000,
    period: "",
    tag: "Buy",
    beds: 4,
    baths: 4,
    size: "380 m²",
    img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=60",
    featured: true,
    description: "Set on a mature half-acre garden plot, this four-bedroom villa has a separate staff wing, a covered patio, and borehole water. A short drive from Karen Shopping Centre and the Nairobi National Park gate.",
    amenities: ["Borehole water", "Staff quarters", "Covered patio", "Electric fence", "Mature garden"],
    contact: { name: "Grace Njoroge", role: "Property Owner", phone: "+254 711 356 902", email: "grace.njoroge@outlook.com" },
  },
  {
    id: 4,
    title: "Studio Apartment",
    location: "Westlands, Nairobi",
    price: "KSh 45,000",
    priceValue: 45000,
    period: "/mo",
    tag: "Rent",
    beds: 1,
    baths: 1,
    size: "48 m²",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=60",
    featured: false,
    description: "A compact, well-lit studio in a serviced block with 24-hour security and a small gym. Ideal for a single professional working in Westlands or the nearby UN complex.",
    amenities: ["24-hour security", "Small gym", "Backup water", "Serviced block"],
    contact: { name: "David Mwangi", role: "Listing Agent", phone: "+254 700 981 244", email: "david.mwangi@patakeja.co.ke", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=60" },
  },
  {
    id: 5,
    title: "Open-Plan Office Suite",
    location: "Upper Hill, Nairobi",
    price: "KSh 220,000",
    priceValue: 220000,
    period: "/mo",
    tag: "Commercial",
    spaceType: "Office",
    beds: null,
    baths: 2,
    size: "340 m² floor area",
    img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=60",
    featured: false,
    description: "Open-plan floor with fibre-ready cabling, a boardroom, and dedicated parking bays in a Grade-A building along Hospital Road. Backup generator and standby water included in the service charge.",
    amenities: ["Fibre-ready", "Boardroom", "Backup generator", "Dedicated parking", "Standby water"],
    contact: { name: "Brian Otieno", role: "Listing Agent", phone: "+254 720 664 118", email: "brian.otieno@patakeja.co.ke", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=60" },
  },
  {
    id: 6,
    title: "Retail Shopfront",
    location: "Ngong Road, Nairobi",
    price: "KSh 9.2M",
    priceValue: 9200000,
    period: "",
    tag: "Commercial",
    spaceType: "Retail",
    beds: null,
    baths: 1,
    size: "95 m² floor area",
    img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=60",
    featured: false,
    description: "Ground-floor shopfront with wide street frontage and high foot traffic, previously fitted out as a pharmacy. Suits retail, a clinic, or a salon looking for visibility along Ngong Road.",
    amenities: ["High foot traffic", "Wide street frontage", "Previously fitted", "Ample signage space"],
    contact: { name: "Samuel Kariuki", role: "Property Owner", phone: "+254 745 129 887", email: "s.kariuki82@gmail.com" },
  },
  {
    id: 7,
    title: "Half-Acre Plot",
    location: "Lanet, Nakuru",
    price: "KSh 3.4M",
    priceValue: 3400000,
    period: "",
    tag: "Land",
    acres: 0.5,
    beds: null,
    baths: null,
    size: "0.5 acre",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=60",
    featured: false,
    description: "A flat, ready-to-build half-acre parcel with an existing access road and a power line along the boundary. Ten minutes from Nakuru town and close to Lanet's growing residential pocket.",
    amenities: ["Access road", "Power line at boundary", "Flat terrain", "Ready to build"],
    contact: { name: "Amina Hassan", role: "Listing Agent", phone: "+254 733 590 214", email: "amina.hassan@patakeja.co.ke", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=60" },
  },
  {
    id: 8,
    title: "Prime Corner Plot",
    location: "London, Nakuru",
    price: "KSh 15M",
    priceValue: 15000000,
    period: "",
    tag: "Land",
    acres: 1,
    beds: null,
    baths: null,
    size: "1 acre",
    img: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=60",
    featured: true,
    description: "A fenced one-acre plot in a fast-developing pocket of Nakuru, with title deed ready for transfer. Suited to a gated development or a family home with room to expand.",
    amenities: ["Fenced", "Title deed ready", "Ready to build", "Growing neighbourhood"],
    contact: { name: "Amina Hassan", role: "Listing Agent", phone: "+254 733 590 214", email: "amina.hassan@patakeja.co.ke", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=60" },
  },
  {
    id: 9,
    title: "4BR Maisonette",
    location: "Lavington, Nairobi",
    price: "KSh 32M",
    priceValue: 32000000,
    period: "",
    tag: "Buy",
    beds: 4,
    baths: 4,
    size: "320 m²",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=60",
    featured: false,
    description: "A four-bedroom maisonette with an ensuite master, a fitted kitchen, and a small backyard for entertaining. Close to Lavington Mall and the Nairobi International School.",
    amenities: ["DSQ", "Fitted kitchen", "Backyard", "Gated compound", "Ensuite master"],
    contact: { name: "Esther Wambui", role: "Property Owner", phone: "+254 712 447 903", email: "esther.wambui@yahoo.com" },
  },
  {
    id: 10,
    title: "3BR Bungalow",
    location: "Milimani, Nakuru",
    price: "KSh 26M",
    priceValue: 26000000,
    period: "",
    tag: "Buy",
    beds: 3,
    baths: 3,
    size: "260 m²",
    img: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&w=800&q=60",
    featured: false,
    description: "A classic three-bedroom bungalow on a leafy street in Nakuru's Milimani estate, with a mature garden and covered parking for two cars. Five minutes from Nakuru town centre.",
    amenities: ["Mature garden", "Covered parking", "Quiet street", "Close to town"],
    contact: { name: "John Kamotho", role: "Property Owner", phone: "+254 728 561 340", email: "john.kamotho@gmail.com" },
  },
  {
    id: 11,
    title: "3BR Apartment",
    location: "Lavington, Nairobi",
    price: "KSh 140,000",
    priceValue: 140000,
    period: "/mo",
    tag: "Rent",
    beds: 3,
    baths: 3,
    size: "150 m²",
    img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=60",
    featured: true,
    description: "A spacious three-bedroom apartment with a DSQ, in a gated compound with a swimming pool and a children's play area. Close to Lavington's shopping and dining strip.",
    amenities: ["Swimming pool", "Children's play area", "DSQ", "Gated compound"],
    contact: { name: "David Mwangi", role: "Listing Agent", phone: "+254 700 981 244", email: "david.mwangi@patakeja.co.ke", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=60" },
  },
  {
    id: 12,
    title: "1BR Apartment",
    location: "Section 58, Nakuru",
    price: "KSh 55,000",
    priceValue: 55000,
    period: "/mo",
    tag: "Rent",
    beds: 1,
    baths: 1,
    size: "60 m²",
    img: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=800&q=60",
    featured: false,
    description: "A one-bedroom unit in a quiet residential block, freshly painted with new fittings throughout. Walking distance to Nakuru's Section 58 market and matatu stage.",
    amenities: ["Freshly painted", "New fittings", "Close to market", "Secure block"],
    contact: { name: "Mary Chebet", role: "Property Owner", phone: "+254 719 803 265", email: "mary.chebet@gmail.com" },
  },
  {
    id: 13,
    title: "Warehouse Space",
    location: "Industrial Area, Nairobi",
    price: "KSh 180,000",
    priceValue: 180000,
    period: "/mo",
    tag: "Commercial",
    spaceType: "Warehouse",
    beds: null,
    baths: 1,
    size: "500 m² floor area",
    img: "https://images.unsplash.com/photo-1553413077-190083ec01ff?auto=format&fit=crop&w=800&q=60",
    featured: false,
    description: "A high-clearance warehouse with a loading dock, three-phase power, and easy truck access off Enterprise Road. Suited to storage, light assembly, or distribution.",
    amenities: ["Loading dock", "Three-phase power", "High clearance", "Truck access"],
    contact: { name: "Brian Otieno", role: "Listing Agent", phone: "+254 720 664 118", email: "brian.otieno@patakeja.co.ke", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=60" },
  },
  {
    id: 14,
    title: "Office Suite",
    location: "Kenyatta Avenue, Nakuru",
    price: "KSh 5.8M",
    priceValue: 5800000,
    period: "",
    tag: "Commercial",
    spaceType: "Office",
    beds: null,
    baths: 1,
    size: "210 m² floor area",
    img: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=800&q=60",
    featured: false,
    description: "A ground-floor office suite on Nakuru's main street, freshly renovated with new wiring and a reception area. High visibility for a bank, sacco, or professional practice.",
    amenities: ["Newly renovated", "Reception area", "High street visibility", "New wiring"],
    contact: { name: "Daniel Kiprotich", role: "Property Owner", phone: "+254 741 226 590", email: "daniel.kiprotich@gmail.com" },
  },
  {
    id: 15,
    title: "Eighth-Acre Plot",
    location: "Kiamunyi, Nakuru",
    price: "KSh 1.8M",
    priceValue: 1800000,
    period: "",
    tag: "Land",
    acres: 0.125,
    beds: null,
    baths: null,
    size: "0.125 acre",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=60",
    featured: false,
    description: "A compact eighth-acre plot in a fast-growing Nakuru suburb, fully serviced with piped water and electricity at the boundary. A good starter plot for a first home.",
    amenities: ["Piped water", "Electricity at boundary", "Fully serviced", "Fenced boundary"],
    contact: { name: "Amina Hassan", role: "Listing Agent", phone: "+254 733 590 214", email: "amina.hassan@patakeja.co.ke", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=60" },
  },
  {
    id: 16,
    title: "Two-Acre Farmland",
    location: "Njoro, Nakuru",
    price: "KSh 6M",
    priceValue: 6000000,
    period: "",
    tag: "Land",
    acres: 2,
    beds: null,
    baths: null,
    size: "2 acres",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=60",
    featured: false,
    description: "Two acres of fertile land in Njoro's farming belt, currently under maize with a seasonal stream at the lower boundary. Suited to continued farming or a rural homestead.",
    amenities: ["Seasonal stream", "Fertile soil", "Currently under maize", "Rural setting"],
    contact: { name: "Susan Wanjiku", role: "Property Owner", phone: "+254 707 913 468", email: "susan.wanjiku@gmail.com" },
  },
];

const BUDGET_RANGES = {
  "Any budget": [0, Infinity],
  "Under KSh 5M": [0, 5000000],
  "KSh 5M – 20M": [5000000, 20000000],
  "KSh 20M+": [20000000, Infinity],
  "Under KSh 40K/mo": [0, 40000],
  "KSh 40K – 120K/mo": [40000, 120000],
  "KSh 120K+/mo": [120000, Infinity],
  "Under KSh 100K/mo": [0, 100000],
  "KSh 100K – 300K/mo": [100000, 300000],
  "KSh 300K+/mo": [300000, Infinity],
  "Under KSh 3M": [0, 3000000],
  "KSh 3M – 10M": [3000000, 10000000],
  "KSh 10M+": [10000000, Infinity],
};

const LAND_SIZE_RANGES = {
  "Any": [0, Infinity],
  "Under ¼ acre": [0, 0.25],
  "¼ – 1 acre": [0.25, 1],
  "1 acre+": [1, Infinity],
};

const LISTING_FILTERS = [
  { key: "all", label: "All", icon: LayoutGrid },
  { key: "buy", label: "Buy", icon: HomeIcon },
  { key: "rent", label: "Rent", icon: KeyRound },
  { key: "commercial", label: "Commercial", icon: Building2 },
  { key: "land", label: "Land", icon: TreePine },
];

const LISTING_META = {
  all: { title: "All listings", label: "All" },
  buy: { title: "Homes for sale", label: "Buy" },
  rent: { title: "Homes for rent", label: "Rent" },
  commercial: { title: "Commercial spaces", label: "Commercial" },
  land: { title: "Land for sale", label: "Land" },
};

const SORT_OPTIONS = ["Newest", "Price: Low to High", "Price: High to Low"];

/* ---------------------------------------------------------------- */
/* Superadmin configuration                                          */
/* ---------------------------------------------------------------- */
// TODO: add your second superadmin email below when you have it.
const SUPERADMIN_EMAILS = ["elvismwangi24@gmail.com", "superadmin2@patakeja.co.ke"];
// Client-side gate only — see the note at the bottom of the chat response for why this isn't real security.
const SUPERADMIN_PASSPHRASE = "Pata@2026";

const STORAGE_KEYS = {
  listings: "patakeja:listings",
  agents: "patakeja:agents",
  admins: "patakeja:admins",
  stats: "patakeja:usage-stats",
};

const LISTING_STATUS_META = {
  pending: { label: "Pending", color: "var(--accent)" },
  approved: { label: "Approved", color: "var(--primary)" },
  held: { label: "On hold", color: "var(--ink-soft)" },
  revoked: { label: "Revoked", color: "var(--brick)" },
};

function formatPrice(value) {
  const n = Number(value) || 0;
  if (n >= 1000000) {
    const m = n / 1000000;
    return `KSh ${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  return `KSh ${n.toLocaleString()}`;
}

function matchesSecondary(p, category, value) {
  if (!value || value === "Any") return true;
  if (category === "buy" || category === "rent") {
    if (value === "Studio") return p.beds != null && p.beds <= 1;
    const min = parseInt(value, 10);
    return p.beds != null && !Number.isNaN(min) && p.beds >= min;
  }
  if (category === "commercial") return p.spaceType === value;
  if (category === "land") {
    const [min, max] = LAND_SIZE_RANGES[value] || [0, Infinity];
    return p.acres != null && p.acres >= min && p.acres <= max;
  }
  return true;
}

const STATS = [
  { target: 2400, prefix: "", suffix: "+", comma: true, label: "Active listings" },
  { target: 180, prefix: "", suffix: "", comma: true, label: "Verified agents" },
  { target: 2, prefix: "", suffix: "", comma: false, label: "Counties live now" },
  { target: 9, prefix: "", suffix: " min", comma: false, label: "Median reply time" },
];

const STEPS = [
  {
    n: "01",
    title: "Search",
    body: "Filter by location, budget and type across Buy, Rent, Commercial and Land in one search.",
  },
  {
    n: "02",
    title: "Connect",
    body: "Message a verified agent directly or book a viewing in a few taps — no middlemen guessing.",
  },
  {
    n: "03",
    title: "Move in",
    body: "Sign, pay and get the keys to your keja, with every step tracked in one place.",
  },
];

const AGENTS = [
  {
    id: 1,
    name: "Wanjiru Kamau",
    focus: "Residential Sales",
    area: "Kilimani & Kileleshwa",
    listings: 42,
    status: "verified",
    rating: 4.9,
    reviews: 58,
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=60",
  },
  {
    id: 2,
    name: "Brian Otieno",
    focus: "Commercial Leasing",
    area: "Upper Hill & CBD",
    listings: 31,
    status: "verified",
    rating: 4.7,
    reviews: 41,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=60",
  },
  {
    id: 3,
    name: "Amina Hassan",
    focus: "Land & Development",
    area: "Nakuru County",
    listings: 27,
    status: "verified",
    rating: 4.8,
    reviews: 33,
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=60",
  },
  {
    id: 4,
    name: "David Mwangi",
    focus: "Rentals",
    area: "Westlands & Lavington",
    listings: 58,
    status: "verified",
    rating: 4.6,
    reviews: 72,
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=60",
  },
];

/* ---------------------------------------------------------------- */
/* Small building blocks                                             */
/* ---------------------------------------------------------------- */

function Roofline({ className = "", flip = false, style = {} }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 20"
      preserveAspectRatio="none"
      style={{ display: "block", width: "100%", height: 16, transform: flip ? "scaleY(-1)" : "none", ...style }}
      aria-hidden="true"
    >
      <polyline
        points="0,20 20,2 40,20 60,2 80,20 100,2 120,20 140,2 160,20 180,2 200,20 220,2 240,20 260,2 280,20 300,2 320,20 340,2 360,20 380,2 400,20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// TODO: this is a temporary logo asset — swap LOGO_IMAGE_SRC for the final logo when ready.
const LOGO_IMAGE_SRC = "data:image/png;base64,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";

function LogoMark({ size = 34 }) {
  return (
    <span className="pk-logo-badge" style={{ width: size, height: size }}>
      <img src={LOGO_IMAGE_SRC} alt="Patakeja" className="pk-logo-img" />
    </span>
  );
}

function ImageWithFallback({ src, alt, className, iconFallback: Icon = HomeIcon }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`${className} pk-img-fallback`}>
        <Icon size={28} strokeWidth={1.5} />
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />;
}

function useCountUp(target, duration = 1500) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setValue(target);
      return;
    }
    let raf;
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return [value, nodeRef];
}

function StatItem({ stat }) {
  const [value, ref] = useCountUp(stat.target);
  const display = stat.comma ? value.toLocaleString() : value;
  return (
    <div ref={ref} className="pk-stat-cell">
      <div className="pk-mono pk-stat-num pk-primary-text">
        {stat.prefix}
        {display}
        {stat.suffix}
      </div>
      <div className="pk-ink-soft text-sm mt-1">{stat.label}</div>
    </div>
  );
}

function CustomSelect({ id, label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="pk-field" ref={wrapRef} style={{ position: "relative" }}>
      <label id={`${id}-label`}>{label}</label>
      <button
        type="button"
        className="pk-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label`}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{value}</span>
        <ChevronDown size={15} className={`pk-select-chevron ${open ? "pk-select-chevron-open" : ""}`} />
      </button>
      <ul className={`pk-select-panel pk-glass ${open ? "pk-select-panel-open" : ""}`} role="listbox" aria-labelledby={`${id}-label`}>
        {options.map((opt) => (
          <li key={opt}>
            <button
              type="button"
              role="option"
              aria-selected={opt === value}
              className={`pk-select-option ${opt === value ? "pk-select-option-active" : ""}`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
              {opt === value && <Check size={14} />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PropertyCard({ property, isFavorite, onToggleFavorite, onSelect, style }) {
  return (
    <article
      className="pk-card overflow-hidden"
      style={{ cursor: onSelect ? "pointer" : "default", ...style }}
      onClick={() => onSelect && onSelect(property.id)}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={(e) => {
        if (onSelect && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onSelect(property.id);
        }
      }}
    >
      <div className="pk-prop-media">
        <ImageWithFallback src={property.img} alt={property.title} className="pk-prop-media-img" iconFallback={HomeIcon} />
        <span className="pk-prop-tag">{property.featured ? "Featured" : property.tag}</span>
        <button
          className="pk-fav-btn"
          aria-label={isFavorite ? "Remove from saved" : "Save property"}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
        >
          <Heart size={16} color={isFavorite ? "#C0392B" : "#333"} fill={isFavorite ? "#C0392B" : "none"} />
        </button>
      </div>
      <div className="p-4">
        <div className="pk-mono pk-prop-price pk-primary-text">
          {property.price}
          <span className="text-sm pk-ink-soft font-normal">{property.period}</span>
        </div>
        <h3 className="font-semibold mt-1">{property.title}</h3>
        <p className="pk-ink-soft text-sm flex items-center gap-1 mt-1">
          <MapPin size={13} /> {property.location}
        </p>
        <div className="flex items-center gap-3 mt-3 pt-3 text-sm pk-ink-soft" style={{ borderTop: "1px solid var(--border)" }}>
          {property.beds != null && (
            <span className="flex items-center gap-1"><Bed size={14} /> {property.beds}</span>
          )}
          {property.baths != null && (
            <span className="flex items-center gap-1"><Bath size={14} /> {property.baths}</span>
          )}
          <span className="flex items-center gap-1"><Ruler size={14} /> {property.size}</span>
        </div>
      </div>
    </article>
  );
}

const LOADING_ITEMS = [
  { icon: HomeIcon, label: "Buy" },
  { icon: KeyRound, label: "Rent" },
  { icon: Building2, label: "Commercial" },
  { icon: TreePine, label: "Land" },
];

function LoadingScreen({ fadingOut }) {
  return (
    <div className={`pk-loading-screen ${fadingOut ? "pk-loading-fade-out" : ""}`}>
      <div className="pk-loading-inner">
        <div className="flex items-center justify-center gap-2.5 mb-10">
          <LogoMark size={40} />
          <span className="pk-display pk-loading-wordmark">patakeja</span>
        </div>

        <div className="pk-loading-path-wrap">
          <div className="pk-loading-row">
            {LOADING_ITEMS.map((item, i) => {
              const ItemIcon = item.icon;
              return (
                <div key={item.label} className="pk-loading-tile">
                  <div className={`pk-loading-tile-icon pk-loading-pulse-${i + 1}`}>
                    <ItemIcon size={24} />
                  </div>
                  <span className="pk-loading-tile-label">{item.label}</span>
                </div>
              );
            })}
          </div>
          <div className="pk-loading-track">
            <span className="pk-loading-track-line" />
            {LOADING_ITEMS.map((_, i) => (
              <span key={i} className="pk-loading-node" style={{ left: `${(i / (LOADING_ITEMS.length - 1)) * 100}%` }} />
            ))}
            <div className="pk-loading-pin">
              <MapPin size={22} fill="var(--accent)" />
            </div>
          </div>
        </div>

        <h2 className="pk-display pk-loading-heading">Finding your perfect place…</h2>
        <div className="pk-loading-bar-track">
          <div className="pk-loading-bar-fill" />
        </div>
        <p className="pk-loading-subtext">This may take a few seconds</p>
      </div>
    </div>
  );
}

function InitialsAvatar({ name, size = 48 }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="pk-initials-avatar" style={{ width: size, height: size, fontSize: size * 0.36 }}>
      {initials}
    </div>
  );
}

function PropertyDetailPage({
  property,
  category,
  onBackHome,
  onBackCategory,
  favorites,
  onToggleFavorite,
  similar,
  onSelectProperty,
  onOpenModal,
}) {
  const isFavorite = favorites.has(property.id);
  const contact = property.contact;

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 pt-8 md:pt-12 pb-20">
      <p className="pk-mono text-xs uppercase tracking-wide mb-3 pk-breadcrumb">
        <button onClick={onBackHome} className="pk-primary-text font-semibold">Home</button>
        <span className="pk-ink-soft"> / </span>
        <button onClick={onBackCategory} className="pk-primary-text font-semibold">{LISTING_META[category].label}</button>
        <span className="pk-ink-soft"> / {property.title}</span>
      </p>

      <div className="pk-detail-grid">
        <div>
          <div className="pk-detail-media">
            <ImageWithFallback src={property.img} alt={property.title} className="pk-detail-media-img" iconFallback={HomeIcon} />
            <span className="pk-prop-tag">{property.featured ? "Featured" : property.tag}</span>
          </div>

          <div className="flex items-start justify-between gap-4 mt-6">
            <div>
              <h1 className="pk-display text-2xl md:text-4xl font-semibold mb-2">{property.title}</h1>
              <p className="pk-ink-soft flex items-center gap-1">
                <MapPin size={15} /> {property.location}
              </p>
            </div>
            <button
              className="pk-icon-btn flex-shrink-0"
              aria-label={isFavorite ? "Remove from saved" : "Save property"}
              onClick={() => onToggleFavorite(property.id)}
            >
              <Heart size={18} color={isFavorite ? "#C0392B" : "currentColor"} fill={isFavorite ? "#C0392B" : "none"} />
            </button>
          </div>

          <div className="pk-detail-facts">
            {property.beds != null && (
              <span><Bed size={16} /> {property.beds} Bedrooms</span>
            )}
            {property.baths != null && (
              <span><Bath size={16} /> {property.baths} Bathrooms</span>
            )}
            <span><Ruler size={16} /> {property.size}</span>
          </div>

          <div className="pk-detail-section">
            <h2 className="pk-display text-xl font-semibold mb-3">About this property</h2>
            <p className="pk-ink-soft leading-relaxed">{property.description}</p>
          </div>

          <div className="pk-detail-section">
            <h2 className="pk-display text-xl font-semibold mb-3">Features</h2>
            <ul className="pk-amenity-list">
              {property.amenities.map((a) => (
                <li key={a}>
                  <Check size={15} className="pk-primary-text" /> {a}
                </li>
              ))}
            </ul>
          </div>

          {similar.length > 0 && (
            <div className="pk-detail-section">
              <h2 className="pk-display text-xl font-semibold mb-4">Similar listings</h2>
              <div className="pk-listing-grid" style={{ marginTop: 0 }}>
                {similar.map((p) => (
                  <PropertyCard
                    key={p.id}
                    property={p}
                    isFavorite={favorites.has(p.id)}
                    onToggleFavorite={onToggleFavorite}
                    onSelect={onSelectProperty}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="pk-detail-sidebar">
          <div className="pk-contact-card">
            <div className="pk-mono pk-primary-text" style={{ fontSize: "1.7rem", fontWeight: 600 }}>
              {property.price}
              <span className="text-sm pk-ink-soft font-normal">{property.period}</span>
            </div>

            <div className="pk-contact-person">
              {contact.avatar ? (
                <ImageWithFallback src={contact.avatar} alt={contact.name} className="pk-agent-photo" iconFallback={Users} />
              ) : (
                <InitialsAvatar name={contact.name} />
              )}
              <div>
                <div className="font-semibold">{contact.name}</div>
                <div className="pk-primary-text text-xs font-semibold">{contact.role}</div>
              </div>
            </div>

            <div className="pk-contact-actions">
              <a className="pk-btn-primary justify-center" href={`tel:${contact.phone.replace(/\s+/g, "")}`}>
                <Phone size={15} /> {contact.phone}
              </a>
              <a className="pk-btn-outline justify-center" href={`mailto:${contact.email}`}>
                <Mail size={15} /> Email
              </a>
              <button className="pk-btn-outline justify-center" onClick={() => onOpenModal("signup")}>
                Message on patakeja
              </button>
            </div>

            <p className="pk-ink-soft text-xs mt-4 text-center leading-relaxed">
              <ShieldCheck size={13} className="inline-block mr-1" style={{ verticalAlign: "-2px" }} />
              Always view a property in person before making any payment.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function AgentScore({ rating, reviews, size = 13 }) {
  return (
    <span className="pk-agent-score">
      <Star size={size} className="pk-accent-text" fill="var(--accent)" />
      <span className="pk-mono font-semibold">{rating.toFixed(1)}</span>
      <span className="pk-ink-soft">({reviews})</span>
    </span>
  );
}

// TODO: swap in your real number/inbox — these mirror the footer's placeholder contact details.
const AGENT_CONTACT = {
  phone: "+254 700 000 000",
  whatsapp: "254700000000",
  email: "hello@patakeja.co.ke",
};

function AgentContactModal({ open, onClose }) {
  return (
    <div className={`pk-modal-backdrop ${open ? "pk-open" : ""}`} onClick={onClose}>
      <div className="pk-modal" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <span className="pk-display text-lg font-semibold">Join as an agent</span>
          <button className="pk-icon-btn" aria-label="Close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <p className="pk-ink-soft text-sm mb-5 leading-relaxed">
          Reach out via any of the channels below and our team will walk you through verification and onboarding.
        </p>

        <div className="pk-contact-row">
          <div className="pk-contact-row-icon">
            <Phone size={17} />
          </div>
          <div className="flex-1">
            <div className="text-xs pk-ink-soft font-semibold uppercase tracking-wide">Phone</div>
            <div className="font-semibold">{AGENT_CONTACT.phone}</div>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <a className="pk-btn-primary justify-center flex-1" href={`tel:${AGENT_CONTACT.phone.replace(/\s+/g, "")}`}>
            <Phone size={15} /> Call
          </a>
          <a
            className="pk-btn-outline justify-center flex-1"
            href={`https://wa.me/${AGENT_CONTACT.whatsapp}?text=${encodeURIComponent(
              "Hi, I'm interested in joining Patakeja as an agent."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={15} /> WhatsApp
          </a>
        </div>

        <div className="pk-contact-row mt-5">
          <div className="pk-contact-row-icon">
            <Mail size={17} />
          </div>
          <div className="flex-1">
            <div className="text-xs pk-ink-soft font-semibold uppercase tracking-wide">Email</div>
            <div className="font-semibold">{AGENT_CONTACT.email}</div>
          </div>
        </div>
        <a
          className="pk-btn-outline justify-center mt-3"
          href={`mailto:${AGENT_CONTACT.email}?subject=${encodeURIComponent("Joining Patakeja as an agent")}`}
        >
          <Mail size={15} /> Email us
        </a>
      </div>
    </div>
  );
}

function AgentsPage({ agents, onBackHome, onOpenModal }) {
  const visible = agents.filter((a) => a.status !== "banned");
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 pt-8 md:pt-12 pb-20">
      <p className="pk-mono text-xs uppercase tracking-wide mb-3 pk-breadcrumb">
        <button onClick={onBackHome} className="pk-primary-text font-semibold">Home</button>
        <span className="pk-ink-soft"> / Agents</span>
      </p>
      <h1 className="pk-display text-3xl md:text-5xl font-semibold mb-2">Our agents</h1>
      <p className="pk-ink-soft">
        {visible.length} agent{visible.length === 1 ? "" : "s"} across Nairobi &amp; Nakuru
      </p>

      <div className="pk-agents-grid">
        {visible.map((a) => (
          <div key={a.id} className="pk-card p-6 flex flex-col items-center text-center gap-2">
            <ImageWithFallback src={a.img} alt={a.name} className="pk-agent-photo-lg" iconFallback={Users} />
            <h3 className="font-semibold mt-2 flex items-center gap-1">
              {a.name}
              {a.status === "verified" && <BadgeCheck size={15} className="pk-primary-text" />}
            </h3>
            <p className="pk-primary-text text-xs font-semibold">{a.focus}</p>
            <p className="pk-ink-soft text-xs flex items-center gap-1">
              <MapPin size={12} /> {a.area}
            </p>
            <AgentScore rating={a.rating} reviews={a.reviews} />
            <p className="pk-mono text-xs pk-ink-soft mt-1">{a.listings} listings</p>
            <button className="pk-btn-outline mt-3" onClick={() => onOpenModal("signup")}>
              Message {a.name.split(" ")[0]}
            </button>
          </div>
        ))}
      </div>

      <p className="pk-ink-soft text-sm text-center mt-14">
        Selling homes or land yourself?{" "}
        <button className="pk-primary-text font-semibold" onClick={() => setContactOpen(true)}>
          Join as an agent
        </button>
      </p>

      <AgentContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </section>
  );
}

function ListingsPage({
  category,
  onCategoryChange,
  onBackHome,
  location,
  setLocation,
  secondary,
  setSecondary,
  secondaryLabel,
  secondaryOptions,
  budget,
  setBudget,
  budgetOptions,
  sortBy,
  setSortBy,
  results,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onClearFilters,
}) {
  const meta = LISTING_META[category];

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 pt-8 md:pt-12 pb-20">
      <p className="pk-mono text-xs uppercase tracking-wide mb-3 pk-breadcrumb">
        <button onClick={onBackHome} className="pk-primary-text font-semibold">Home</button>
        <span className="pk-ink-soft"> / {meta.label}</span>
      </p>
      <h1 className="pk-display text-3xl md:text-5xl font-semibold mb-2">{meta.title}</h1>
      <p className="pk-ink-soft">
        {results.length} propert{results.length === 1 ? "y" : "ies"} found · Nairobi &amp; Nakuru
      </p>

      <div className="pk-chip-row mt-7">
        {LISTING_FILTERS.map((f) => {
          const FIcon = f.icon;
          return (
            <button
              key={f.key}
              className={`pk-chip ${category === f.key ? "pk-chip-active" : ""}`}
              onClick={() => onCategoryChange(f.key)}
            >
              <FIcon size={15} /> {f.label}
            </button>
          );
        })}
      </div>

      <div className="pk-filter-card">
        <div className="pk-field">
          <label htmlFor="pk-listing-location">Location</label>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="pk-ink-soft" />
            <input
              id="pk-listing-location"
              type="text"
              placeholder="Try Kilimani, Karen, Milimani…"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        {category !== "all" && (
          <CustomSelect id="pk-listing-secondary" label={secondaryLabel} value={secondary} options={secondaryOptions} onChange={setSecondary} />
        )}
        <CustomSelect id="pk-listing-budget" label="Budget" value={budget} options={budgetOptions} onChange={setBudget} />
        <CustomSelect id="pk-listing-sort" label="Sort by" value={sortBy} options={SORT_OPTIONS} onChange={setSortBy} />
        <button className="pk-btn-outline justify-center" onClick={onClearFilters}>
          <X size={15} /> Clear filters
        </button>
      </div>

      {results.length === 0 ? (
        <div className="pk-empty-state">
          <Search size={32} strokeWidth={1.5} className="pk-ink-soft mx-auto mb-4" />
          <h3 className="pk-display text-xl font-semibold mb-2">No properties match yet</h3>
          <p className="pk-ink-soft text-sm max-w-sm mx-auto mb-5">
            Try widening your budget or clearing a filter — new listings are added to patakeja every day.
          </p>
          <button className="pk-btn-primary" style={{ margin: "0 auto" }} onClick={onClearFilters}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="pk-listing-grid">
          {results.map((p) => (
            <PropertyCard key={p.id} property={p} isFavorite={favorites.has(p.id)} onToggleFavorite={onToggleFavorite} onSelect={onSelectProperty} />
          ))}
        </div>
      )}
    </section>
  );
}

function AdminGate({ onAuthenticate, onExit }) {
  const [email, setEmail] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const normalized = email.trim().toLowerCase();
    if (!SUPERADMIN_EMAILS.includes(normalized)) {
      setError("This email isn't on the superadmin list.");
      return;
    }
    if (passphrase !== SUPERADMIN_PASSPHRASE) {
      setError("That passphrase doesn't match.");
      return;
    }
    setError("");
    onAuthenticate();
  };

  return (
    <div className="pk-admin-gate">
      <div className="pk-admin-gate-card">
        <div className="pk-admin-gate-icon">
          <Lock size={22} />
        </div>
        <h1 className="pk-display text-2xl font-semibold mb-1">Superadmin access</h1>
        <p className="pk-ink-soft text-sm mb-6">Restricted to authorized superadmin emails only.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label>
            Email
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@patakeja.co.ke" />
          </label>
          <label>
            Passphrase
            <input type="password" required value={passphrase} onChange={(e) => setPassphrase(e.target.value)} placeholder="••••••••" />
          </label>
          {error && <p className="pk-admin-error">{error}</p>}
          <button type="submit" className="pk-btn-primary justify-center">
            Enter console
          </button>
        </form>
        <button className="pk-admin-gate-back" onClick={onExit}>
          ← Back to site
        </button>
      </div>
    </div>
  );
}

function AdminOverview({ listings, agents, admins, stats }) {
  const categoryData = [
    { name: "Buy", views: stats?.buyViews || 0 },
    { name: "Rent", views: stats?.rentViews || 0 },
    { name: "Commercial", views: stats?.commercialViews || 0 },
    { name: "Land", views: stats?.landViews || 0 },
  ];

  const statCards = [
    { label: "Live listings", value: listings.filter((l) => l.status === "approved").length },
    { label: "Pending review", value: listings.filter((l) => l.status === "pending").length },
    { label: "Active agents", value: agents.filter((a) => a.status !== "banned").length },
    { label: "Admin accounts", value: admins.length },
    { label: "Page views", value: stats?.pageViews || 0 },
    { label: "Searches run", value: stats?.searches || 0 },
    { label: "Property views", value: stats?.propertyDetailViews || 0 },
    { label: "Signup taps", value: stats?.signupClicks || 0 },
  ];

  return (
    <div>
      <h2 className="pk-display text-2xl font-semibold mb-1">Overview</h2>
      <p className="pk-ink-soft text-sm mb-2">Live counts from real visits to this site.</p>

      <div className="pk-admin-stat-grid">
        {statCards.map((s) => (
          <div key={s.label} className="pk-admin-stat-card">
            <div className="pk-mono pk-primary-text pk-admin-stat-value">{s.value.toLocaleString()}</div>
            <div className="pk-ink-soft text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="pk-admin-chart-card">
        <h3 className="font-semibold mb-4">Category interest (page views)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" stroke="var(--ink-soft)" fontSize={12} />
            <YAxis stroke="var(--ink-soft)" fontSize={12} allowDecimals={false} />
            <Tooltip contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 13 }} />
            <Bar dataKey="views" fill="var(--primary)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="pk-ink-soft text-xs mt-4">
        Counts are aggregated from real visits to this site and refresh every few seconds while this tab is open.
      </p>
    </div>
  );
}

const EMPTY_LISTING_FORM = {
  title: "",
  tag: "Buy",
  location: "",
  priceValue: "",
  period: "",
  beds: "",
  baths: "",
  size: "",
  spaceType: "Office",
  acres: "",
  img: "",
  description: "",
  amenities: "",
  contactName: "",
  contactRole: "Property Owner",
  contactPhone: "",
  contactEmail: "",
};

function AdminListingsPanel({ listings, onUpdateListings }) {
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_LISTING_FORM);

  const visible = filter === "all" ? listings : listings.filter((l) => l.status === filter);
  const sorted = [...visible].sort((a, b) => b.id - a.id);

  const setStatus = (id, status) => {
    onUpdateListings(listings.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const deleteListing = (id) => {
    onUpdateListings(listings.filter((l) => l.id !== id));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.location.trim() || !form.priceValue) return;
    const nextId = listings.length ? Math.max(...listings.map((l) => l.id)) + 1 : 1;
    const priceValue = Number(form.priceValue) || 0;
    const newListing = {
      id: nextId,
      title: form.title.trim(),
      location: form.location.trim(),
      price: formatPrice(priceValue),
      priceValue,
      period: form.period,
      tag: form.tag,
      beds: form.tag === "Buy" || form.tag === "Rent" ? Number(form.beds) || 0 : null,
      baths: form.tag !== "Land" ? Number(form.baths) || 0 : null,
      size: form.tag === "Land" ? `${form.acres || 0} acre${Number(form.acres) === 1 ? "" : "s"}` : form.size.trim() || "—",
      acres: form.tag === "Land" ? Number(form.acres) || 0 : undefined,
      spaceType: form.tag === "Commercial" ? form.spaceType : undefined,
      img: form.img.trim() || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
      featured: false,
      description: form.description.trim() || "No description provided yet.",
      amenities: form.amenities.split(",").map((a) => a.trim()).filter(Boolean),
      contact: {
        name: form.contactName.trim() || "Patakeja Team",
        role: form.contactRole,
        phone: form.contactPhone.trim() || "+254 700 000 000",
        email: form.contactEmail.trim() || "hello@patakeja.co.ke",
      },
      status: "approved",
      source: "admin",
      submittedBy: "Superadmin",
    };
    onUpdateListings([...listings, newListing]);
    setForm(EMPTY_LISTING_FORM);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-1 flex-wrap">
        <div>
          <h2 className="pk-display text-2xl font-semibold mb-1">Listings</h2>
          <p className="pk-ink-soft text-sm">
            {listings.length} total · admin-submitted listings will land here as "Pending" once admin posting is wired up.
          </p>
        </div>
        <button className="pk-btn-primary" onClick={() => setShowForm((s) => !s)}>
          <Plus size={16} /> {showForm ? "Close form" : "Add listing"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="pk-admin-form">
          <div className="pk-admin-form-grid">
            <label>
              Title
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </label>
            <label>
              Category
              <select value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })}>
                <option>Buy</option>
                <option>Rent</option>
                <option>Commercial</option>
                <option>Land</option>
              </select>
            </label>
            <label>
              Location
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Kilimani, Nairobi"
                required
              />
            </label>
            <label>
              Price (KSh)
              <input type="number" min="0" value={form.priceValue} onChange={(e) => setForm({ ...form, priceValue: e.target.value })} required />
            </label>
            <label>
              Billing
              <select value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })}>
                <option value="">One-off (sale price)</option>
                <option value="/mo">Monthly (rent/lease)</option>
              </select>
            </label>
            {(form.tag === "Buy" || form.tag === "Rent") && (
              <>
                <label>
                  Bedrooms
                  <input type="number" min="0" value={form.beds} onChange={(e) => setForm({ ...form, beds: e.target.value })} />
                </label>
                <label>
                  Bathrooms
                  <input type="number" min="0" value={form.baths} onChange={(e) => setForm({ ...form, baths: e.target.value })} />
                </label>
                <label>
                  Size
                  <input value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} placeholder="e.g. 120 m²" />
                </label>
              </>
            )}
            {form.tag === "Commercial" && (
              <>
                <label>
                  Space type
                  <select value={form.spaceType} onChange={(e) => setForm({ ...form, spaceType: e.target.value })}>
                    <option>Office</option>
                    <option>Retail</option>
                    <option>Warehouse</option>
                  </select>
                </label>
                <label>
                  Bathrooms
                  <input type="number" min="0" value={form.baths} onChange={(e) => setForm({ ...form, baths: e.target.value })} />
                </label>
                <label>
                  Floor area
                  <input value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} placeholder="e.g. 200 m² floor area" />
                </label>
              </>
            )}
            {form.tag === "Land" && (
              <label>
                Size (acres)
                <input type="number" min="0" step="0.01" value={form.acres} onChange={(e) => setForm({ ...form, acres: e.target.value })} />
              </label>
            )}
            <label className="pk-admin-form-full">
              Image URL
              <input value={form.img} onChange={(e) => setForm({ ...form, img: e.target.value })} placeholder="https://…" />
            </label>
            <label className="pk-admin-form-full">
              Description
              <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </label>
            <label className="pk-admin-form-full">
              Features (comma-separated)
              <input
                value={form.amenities}
                onChange={(e) => setForm({ ...form, amenities: e.target.value })}
                placeholder="Parking, Gated compound, Backup water"
              />
            </label>
            <label>
              Contact name
              <input value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} />
            </label>
            <label>
              Contact role
              <select value={form.contactRole} onChange={(e) => setForm({ ...form, contactRole: e.target.value })}>
                <option>Property Owner</option>
                <option>Listing Agent</option>
              </select>
            </label>
            <label>
              Phone
              <input value={form.contactPhone} onChange={(e) => setForm({ ...form, contactPhone: e.target.value })} placeholder="+254 7xx xxx xxx" />
            </label>
            <label>
              Email
              <input type="email" value={form.contactEmail} onChange={(e) => setForm({ ...form, contactEmail: e.target.value })} />
            </label>
          </div>
          <button type="submit" className="pk-btn-primary justify-center mt-5">
            Publish listing
          </button>
        </form>
      )}

      <div className="pk-chip-row mt-6">
        {["all", "pending", "approved", "held", "revoked"].map((f) => (
          <button key={f} className={`pk-chip ${filter === f ? "pk-chip-active" : ""}`} onClick={() => setFilter(f)}>
            {f === "all" ? "All" : LISTING_STATUS_META[f].label}
          </button>
        ))}
      </div>

      <div className="pk-admin-listing-list">
        {sorted.length === 0 && <p className="pk-ink-soft text-sm mt-6">No listings in this view.</p>}
        {sorted.map((l) => (
          <div key={l.id} className="pk-admin-listing-row">
            <ImageWithFallback src={l.img} alt={l.title} className="pk-admin-listing-thumb" iconFallback={HomeIcon} />
            <div className="pk-admin-listing-info">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">{l.title}</span>
                <span className="pk-status-badge" style={{ "--badge-color": LISTING_STATUS_META[l.status].color }}>
                  {LISTING_STATUS_META[l.status].label}
                </span>
              </div>
              <p className="pk-ink-soft text-xs mt-1">
                {l.location} · {l.price}
                {l.period} · {l.tag}
              </p>
              <p className="pk-ink-soft text-xs">Submitted by {l.submittedBy || "—"}</p>
            </div>
            <div className="pk-admin-listing-actions">
              {l.status !== "approved" && (
                <button className="pk-icon-btn" title="Approve" onClick={() => setStatus(l.id, "approved")}>
                  <Check size={15} />
                </button>
              )}
              {l.status !== "held" && (
                <button className="pk-icon-btn" title="Hold" onClick={() => setStatus(l.id, "held")}>
                  <Pause size={15} />
                </button>
              )}
              {l.status !== "revoked" && (
                <button className="pk-icon-btn" title="Revoke" onClick={() => setStatus(l.id, "revoked")}>
                  <RotateCcw size={15} />
                </button>
              )}
              <button className="pk-icon-btn" title="Delete" onClick={() => deleteListing(l.id)}>
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminAdminsPanel({ admins, onUpdateAdmins }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastCode, setLastCode] = useState(null);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    const code = Math.random().toString(36).slice(2, 10).toUpperCase();
    const newAdmin = {
      id: admins.length ? Math.max(...admins.map((a) => a.id)) + 1 : 1,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      status: "active",
      accessCode: code,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    onUpdateAdmins([...admins, newAdmin]);
    setLastCode({ email: newAdmin.email, code });
    setName("");
    setEmail("");
  };

  const toggleStatus = (id) => {
    onUpdateAdmins(admins.map((a) => (a.id === id ? { ...a, status: a.status === "active" ? "suspended" : "active" } : a)));
  };

  const deleteAdmin = (id) => {
    onUpdateAdmins(admins.filter((a) => a.id !== id));
  };

  return (
    <div>
      <h2 className="pk-display text-2xl font-semibold mb-1">Admin accounts</h2>
      <p className="pk-ink-soft text-sm mb-6">Create admin accounts here. Their own posting and moderation tools get wired up separately.</p>

      <form onSubmit={handleCreate} className="pk-admin-form">
        <div className="pk-admin-form-grid">
          <label>
            Full name
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
        </div>
        <button type="submit" className="pk-btn-primary justify-center mt-5">
          <UserCog size={16} /> Create admin account
        </button>
      </form>

      {lastCode && (
        <div className="pk-admin-notice">
          Temporary access code for <strong>{lastCode.email}</strong>: <span className="pk-mono">{lastCode.code}</span>
          <br />
          Share this securely — a real system would email a signed invite link instead.
        </div>
      )}

      <div className="pk-admin-listing-list mt-6">
        {admins.length === 0 && <p className="pk-ink-soft text-sm">No admin accounts yet.</p>}
        {admins.map((a) => (
          <div key={a.id} className="pk-admin-listing-row">
            <InitialsAvatar name={a.name} size={44} />
            <div className="pk-admin-listing-info">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">{a.name}</span>
                <span className="pk-status-badge" style={{ "--badge-color": a.status === "active" ? "var(--primary)" : "var(--brick)" }}>
                  {a.status === "active" ? "Active" : "Suspended"}
                </span>
              </div>
              <p className="pk-ink-soft text-xs mt-1">
                {a.email} · added {a.createdAt}
              </p>
            </div>
            <div className="pk-admin-listing-actions">
              <button className="pk-icon-btn" title={a.status === "active" ? "Suspend" : "Reactivate"} onClick={() => toggleStatus(a.id)}>
                {a.status === "active" ? <Pause size={15} /> : <RotateCcw size={15} />}
              </button>
              <button className="pk-icon-btn" title="Delete" onClick={() => deleteAdmin(a.id)}>
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminAgentsPanel({ agents, onUpdateAgents }) {
  const setStatus = (id, status) => {
    onUpdateAgents(agents.map((a) => (a.id === id ? { ...a, status } : a)));
  };
  const deleteAgent = (id) => {
    onUpdateAgents(agents.filter((a) => a.id !== id));
  };

  return (
    <div>
      <h2 className="pk-display text-2xl font-semibold mb-1">Agents</h2>
      <p className="pk-ink-soft text-sm mb-6">Verify, ban, or remove agents. Banned agents are hidden from the public site immediately.</p>

      <div className="pk-admin-listing-list">
        {agents.map((a) => (
          <div key={a.id} className="pk-admin-listing-row">
            <ImageWithFallback src={a.img} alt={a.name} className="pk-agent-photo" iconFallback={Users} />
            <div className="pk-admin-listing-info">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">{a.name}</span>
                <span
                  className="pk-status-badge"
                  style={{
                    "--badge-color":
                      a.status === "banned" ? "var(--brick)" : a.status === "verified" ? "var(--primary)" : "var(--ink-soft)",
                  }}
                >
                  {a.status === "banned" ? "Banned" : a.status === "verified" ? "Verified" : "Unverified"}
                </span>
              </div>
              <p className="pk-ink-soft text-xs mt-1">
                {a.focus} · {a.area} · {a.listings} listings
              </p>
            </div>
            <div className="pk-admin-listing-actions">
              {a.status !== "verified" && (
                <button className="pk-icon-btn" title="Verify" onClick={() => setStatus(a.id, "verified")}>
                  <BadgeCheck size={15} />
                </button>
              )}
              {a.status !== "banned" && (
                <button className="pk-icon-btn" title="Ban" onClick={() => setStatus(a.id, "banned")}>
                  <Ban size={15} />
                </button>
              )}
              <button className="pk-icon-btn" title="Delete" onClick={() => deleteAgent(a.id)}>
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminConsole({ theme, setTheme, onExit, listings, onUpdateListings, agents, onUpdateAgents, initialAuthed = false }) {
  const [authed, setAuthed] = useState(initialAuthed);
  const [tab, setTab] = useState("overview");
  const [admins, setAdmins] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!authed) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEYS.admins, true);
        if (!cancelled && res && res.value) setAdmins(JSON.parse(res.value));
      } catch (e) {
        /* no admins saved yet */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authed]);

  useEffect(() => {
    if (!authed) return;
    let cancelled = false;
    const loadStats = async () => {
      try {
        const res = await window.storage.get(STORAGE_KEYS.stats, true);
        if (!cancelled && res && res.value) setStats(JSON.parse(res.value));
      } catch (e) {
        /* no stats saved yet */
      }
    };
    loadStats();
    const interval = setInterval(loadStats, 8000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [authed]);

  const updateAdmins = (next) => {
    setAdmins(next);
    window.storage?.set(STORAGE_KEYS.admins, JSON.stringify(next), true).catch(() => {});
  };

  if (!authed) {
    return <AdminGate onAuthenticate={() => setAuthed(true)} onExit={onExit} />;
  }

  const TABS = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "listings", label: "Listings", icon: ClipboardList },
    { key: "admins", label: "Admins", icon: UserCog },
    { key: "agents", label: "Agents", icon: BadgeCheck },
  ];

  return (
    <div className="pk-admin-shell">
      <div className="pk-admin-topbar">
        <div className="flex items-center gap-2">
          <Shield size={18} className="pk-primary-text" />
          <span className="pk-display font-semibold">patakeja admin</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="pk-icon-btn" aria-label="Toggle theme" onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
          <button className="pk-btn-outline" onClick={onExit}>
            <LogOut size={15} /> Exit to site
          </button>
        </div>
      </div>
      <div className="pk-admin-body">
        <nav className="pk-admin-sidebar">
          {TABS.map((t) => {
            const TIcon = t.icon;
            return (
              <button key={t.key} className={`pk-admin-nav-item ${tab === t.key ? "pk-admin-nav-active" : ""}`} onClick={() => setTab(t.key)}>
                <TIcon size={16} /> {t.label}
              </button>
            );
          })}
        </nav>
        <main className="pk-admin-main">
          {tab === "overview" && <AdminOverview listings={listings} agents={agents} admins={admins} stats={stats} />}
          {tab === "listings" && <AdminListingsPanel listings={listings} onUpdateListings={onUpdateListings} />}
          {tab === "admins" && <AdminAdminsPanel admins={admins} onUpdateAdmins={updateAdmins} />}
          {tab === "agents" && <AdminAgentsPanel agents={agents} onUpdateAgents={onUpdateAgents} />}
        </main>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Main component                                                     */
/* ---------------------------------------------------------------- */

export default function Patakeja() {
  const [theme, setTheme] = useState("light");
  const [appLoading, setAppLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [page, setPage] = useState("home");
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [activeTab, setActiveTab] = useState("buy");
  const [listingCategory, setListingCategory] = useState("buy");
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [scrollTarget, setScrollTarget] = useState(null);
  const [budget, setBudget] = useState(TAB_META.buy.budgetOptions[0]);
  const [secondary, setSecondary] = useState(TAB_META.buy.secondaryOptions[0]);
  const [location, setLocation] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [listings, setListings] = useState(() =>
    PROPERTIES.map((p) => ({ ...p, status: "approved", source: "seed", submittedBy: "Patakeja Team" }))
  );
  const [agents, setAgents] = useState(AGENTS);

  const pendingStatsRef = useRef({});
  const statsFlushScheduled = useRef(false);

  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const agentsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const hide = setTimeout(() => setAppLoading(false), 2800);
    return () => clearTimeout(hide);
  }, []);

  useEffect(() => {
    if (!appLoading) {
      const remove = setTimeout(() => setShowLoader(false), 500);
      return () => clearTimeout(remove);
    }
  }, [appLoading]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen || modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, modalOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setModalOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Hydrate listings from persistent storage (shared across everyone using this site).
  // Falls back to — and seeds — the static PROPERTIES array on first-ever load.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEYS.listings, true);
        if (!cancelled && res && res.value) {
          setListings(JSON.parse(res.value));
        } else {
          await window.storage.set(STORAGE_KEYS.listings, JSON.stringify(listings), true);
        }
      } catch (e) {
        try {
          await window.storage.set(STORAGE_KEYS.listings, JSON.stringify(listings), true);
        } catch (e2) {
          /* storage unavailable — continue with in-memory seed data */
        }
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEYS.agents, true);
        if (!cancelled && res && res.value) {
          setAgents(JSON.parse(res.value));
        } else {
          await window.storage.set(STORAGE_KEYS.agents, JSON.stringify(agents), true);
        }
      } catch (e) {
        try {
          await window.storage.set(STORAGE_KEYS.agents, JSON.stringify(agents), true);
        } catch (e2) {
          /* storage unavailable — continue with in-memory seed data */
        }
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateListings = (next) => {
    setListings(next);
    window.storage?.set(STORAGE_KEYS.listings, JSON.stringify(next), true).catch(() => {});
  };

  const updateAgents = (next) => {
    setAgents(next);
    window.storage?.set(STORAGE_KEYS.agents, JSON.stringify(next), true).catch(() => {});
  };

  // Real usage tracking: increments are batched in memory and flushed to shared
  // storage every few seconds, so the admin Overview reflects genuine visits
  // to this site rather than fabricated numbers.
  const flushStats = async () => {
    const pending = pendingStatsRef.current;
    pendingStatsRef.current = {};
    statsFlushScheduled.current = false;
    try {
      const res = await window.storage.get(STORAGE_KEYS.stats, true);
      const current = res && res.value ? JSON.parse(res.value) : {};
      const merged = { ...current };
      Object.entries(pending).forEach(([key, amount]) => {
        merged[key] = (merged[key] || 0) + amount;
      });
      await window.storage.set(STORAGE_KEYS.stats, JSON.stringify(merged), true);
    } catch (e) {
      /* stats are best-effort only */
    }
  };

  const logEvent = (key, amount = 1) => {
    pendingStatsRef.current[key] = (pendingStatsRef.current[key] || 0) + amount;
    if (!statsFlushScheduled.current) {
      statsFlushScheduled.current = true;
      setTimeout(flushStats, 4000);
    }
  };

  useEffect(() => {
    if (!scrollTarget) return;
    const id = requestAnimationFrame(() => {
      if (scrollTarget === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const refMap = { agents: agentsRef, cta: ctaRef, hero: heroRef, featured: featuredRef };
        refMap[scrollTarget]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setScrollTarget(null);
    });
    return () => cancelAnimationFrame(id);
  }, [scrollTarget, page]);

  const scrollTo = (ref) => {
    setMenuOpen(false);
    ref?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goHome = () => {
    setPage("home");
    setScrollTarget("top");
    setMenuOpen(false);
  };

  const switchListingCategory = (key) => {
    setListingCategory(key);
    if (key !== "all") setActiveTab(key);
    if (key === "all") {
      setSecondary("Any");
      setBudget(TAB_META.buy.budgetOptions[0]);
    } else {
      setSecondary(TAB_META[key].secondaryOptions[0]);
      setBudget(TAB_META[key].budgetOptions[0]);
    }
    setSortBy(SORT_OPTIONS[0]);
  };

  const goToListings = (key, { resetFilters = true } = {}) => {
    if (resetFilters) {
      switchListingCategory(key);
      setLocation("");
    } else {
      setListingCategory(key);
      if (key !== "all") setActiveTab(key);
      logEvent("searches");
    }
    logEvent("pageViews");
    if (key !== "all") logEvent(`${key}Views`);
    setPage("listings");
    setScrollTarget("top");
    setMenuOpen(false);
  };

  const handleClearFilters = () => {
    switchListingCategory(listingCategory);
    setLocation("");
  };

  const goToAgents = () => {
    setPage("agents");
    setScrollTarget("top");
    setMenuOpen(false);
    logEvent("pageViews");
  };

  const handleNavClick = (key) => {
    if (key === "agents") {
      goToAgents();
      return;
    }
    goToListings(key);
  };

  const viewProperty = (id) => {
    setSelectedPropertyId(id);
    logEvent("pageViews");
    logEvent("propertyDetailViews");
    setPage("detail");
    setScrollTarget("top");
    setMenuOpen(false);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    setSecondary(TAB_META[key].secondaryOptions[0]);
    setBudget(TAB_META[key].budgetOptions[0]);
  };

  const listingFilterMeta =
    listingCategory === "all"
      ? { secondaryLabel: null, secondaryOptions: [], budgetOptions: TAB_META.buy.budgetOptions }
      : TAB_META[listingCategory];

  const approvedListings = useMemo(() => listings.filter((l) => l.status === "approved"), [listings]);

  const filteredProperties = useMemo(() => {
    let list = approvedListings.filter((p) => (listingCategory === "all" ? true : p.tag.toLowerCase() === listingCategory));

    if (location.trim()) {
      const q = location.trim().toLowerCase();
      list = list.filter((p) => p.location.toLowerCase().includes(q));
    }

    if (listingCategory !== "all") {
      list = list.filter((p) => matchesSecondary(p, listingCategory, secondary));
    }

    const [min, max] = BUDGET_RANGES[budget] || [0, Infinity];
    list = list.filter((p) => p.priceValue >= min && p.priceValue <= max);

    const sorted = [...list];
    if (sortBy === "Price: Low to High") sorted.sort((a, b) => a.priceValue - b.priceValue);
    else if (sortBy === "Price: High to Low") sorted.sort((a, b) => b.priceValue - a.priceValue);
    else sorted.sort((a, b) => b.id - a.id);
    return sorted;
  }, [approvedListings, listingCategory, location, secondary, budget, sortBy]);

  const selectedProperty = approvedListings.find((p) => p.id === selectedPropertyId) || null;
  const similarProperties = useMemo(() => {
    if (!selectedProperty) return [];
    return approvedListings.filter((p) => p.tag === selectedProperty.tag && p.id !== selectedProperty.id).slice(0, 3);
  }, [approvedListings, selectedProperty]);
  const currentCategory =
    page === "listings"
      ? listingCategory
      : page === "detail" && selectedProperty
      ? selectedProperty.tag.toLowerCase()
      : page === "agents"
      ? "agents"
      : null;

  const toggleFavorite = (id) => {
    logEvent("favorites");
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const openModal = (tab) => {
    if (tab === "signup") logEvent("signupClicks");
    setModalTab(tab);
    setAuthError("");
    setAuthPassword("");
    setModalOpen(true);
    setMenuOpen(false);
  };

  const authEmailIsSuperAdmin = SUPERADMIN_EMAILS.some((s) => s.toLowerCase() === authEmail.trim().toLowerCase());

  const isEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authEmail.trim());
  const isPhoneFormat = /^\+?[0-9\s-]{7,15}$/.test(authEmail.trim());
  const isValidIdentifier = isEmailFormat || isPhoneFormat;

  const passwordChecks = {
    length: authPassword.length >= 8,
    upperLower: /[A-Z]/.test(authPassword) && /[a-z]/.test(authPassword),
    digit: /[0-9]/.test(authPassword),
    special: /[^A-Za-z0-9]/.test(authPassword),
  };
  const passwordMeetsRequirements = Object.values(passwordChecks).every(Boolean);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const email = authEmail.trim().toLowerCase();
    if (!email || !isValidIdentifier) {
      setAuthError("Enter a valid email or phone number to continue.");
      return;
    }
    if (authEmailIsSuperAdmin) {
      if (authPassword !== SUPERADMIN_PASSPHRASE) {
        setAuthError("That passphrase doesn't match our superadmin records.");
        return;
      }
      setCurrentUser({ name: authName.trim() || "Superadmin", email, isSuperAdmin: true });
      setAuthError("");
      setAuthPassword("");
      setModalOpen(false);
      setPage("admin");
      setScrollTarget(null);
      setMenuOpen(false);
      return;
    }
    if (modalTab === "signup" && !passwordMeetsRequirements) {
      setAuthError("Your password doesn't meet all the requirements below.");
      return;
    }
    // No real backend exists yet, so any email/password combo for a non-superadmin
    // address is accepted — this creates a session-only mock account, not a real one.
    setCurrentUser({ name: authName.trim() || email.split("@")[0], email, isSuperAdmin: false });
    setAuthError("");
    setAuthPassword("");
    setModalOpen(false);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <div className="pk-root" data-theme={theme}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');

        .pk-root {
          --radius-card: 18px;
          --ease: cubic-bezier(0.4, 0, 0.2, 1);
          --ease-soft: cubic-bezier(0.16, 1, 0.3, 1);
          font-family: 'Work Sans', system-ui, sans-serif;
          background: var(--bg);
          color: var(--ink);
          transition: background-color .45s var(--ease), color .45s var(--ease);
          min-height: 100vh;
          line-height: 1.5;
        }
        .pk-root[data-theme='light'] {
          --bg: #F1F4EE;
          --surface: #FFFFFF;
          --surface-2: #E8EDE1;
          --ink: #142118;
          --ink-soft: #4C5A50;
          --primary: #234D3B;
          --primary-strong: #1A3B2C;
          --primary-ink: #FFFFFF;
          --accent: #E3A73B;
          --accent-ink: #221703;
          --brick: #8C4A2F;
          --border: #DBE1D3;
          --shadow: rgba(20,33,24,0.09);
          --stats-band-bg: linear-gradient(135deg, color-mix(in srgb, var(--accent) 22%, var(--surface)) 0%, color-mix(in srgb, var(--primary) 16%, var(--surface)) 100%);
        }
        .pk-root[data-theme='dark'] {
          --bg: #101B14;
          --surface: #16241C;
          --surface-2: #1E2F24;
          --ink: #EDEAE0;
          --ink-soft: #A9B6AA;
          --primary: #5DA383;
          --primary-strong: #7BC29D;
          --primary-ink: #0B140F;
          --accent: #E3A73B;
          --accent-ink: #1D1503;
          --brick: #CE875E;
          --border: #2A3A2F;
          --shadow: rgba(0,0,0,0.45);
          --stats-band-bg: linear-gradient(135deg, color-mix(in srgb, var(--accent) 16%, var(--surface)) 0%, color-mix(in srgb, var(--primary) 26%, var(--surface)) 100%);
        }
        .pk-root * { box-sizing: border-box; }
        .pk-display { font-family: 'Fraunces', serif; }
        .pk-mono { font-family: 'IBM Plex Mono', monospace; }
        .pk-ink-soft { color: var(--ink-soft); }
        .pk-accent-text { color: var(--accent); }
        .pk-primary-text { color: var(--primary); }

        .pk-header {
          position: sticky; top: 0; z-index: 50;
          background: color-mix(in srgb, var(--bg) 88%, transparent);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid transparent;
          transition: border-color .4s var(--ease), box-shadow .4s var(--ease);
        }
        .pk-header.pk-scrolled {
          border-bottom-color: var(--border);
          box-shadow: 0 8px 24px var(--shadow);
        }
        .pk-logo-badge {
          display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
          border-radius: 10px; padding: 4px; background: #FDFBF6;
          border: 1px solid rgba(20, 20, 15, 0.08); box-shadow: 0 2px 6px rgba(0,0,0,0.12);
        }
        .pk-logo-img { width: 100%; height: 100%; object-fit: contain; display: block; }
        .pk-wordmark { font-size: 1.35rem; letter-spacing: -0.01em; }

        .pk-navlink {
          font-size: 0.95rem; font-weight: 500; color: var(--ink);
          padding: 8px 12px; border-radius: 999px; transition: background-color .3s var(--ease), color .3s var(--ease);
        }
        .pk-navlink:hover { background: var(--surface-2); color: var(--primary); }
        .pk-navlink-active { background: var(--surface-2); color: var(--primary); }

        .pk-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--accent); color: var(--accent-ink);
          font-weight: 600; font-size: 0.92rem;
          padding: 10px 18px; border-radius: 999px; border: none; cursor: pointer;
          transition: transform .25s var(--ease), box-shadow .3s var(--ease), filter .25s var(--ease);
        }
        .pk-btn-primary:hover { filter: brightness(1.06); transform: translateY(-1px); box-shadow: 0 8px 18px var(--shadow); }

        .pk-btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: var(--ink);
          font-weight: 600; font-size: 0.92rem;
          padding: 9px 17px; border-radius: 999px; border: 1.5px solid var(--border); cursor: pointer;
          transition: border-color .3s var(--ease), background-color .3s var(--ease);
        }
        .pk-btn-outline:hover { border-color: var(--primary); background: var(--surface-2); }

        .pk-icon-btn {
          display: inline-flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 999px; border: 1.5px solid var(--border);
          background: var(--surface); color: var(--ink); cursor: pointer;
          transition: border-color .3s var(--ease), transform .3s var(--ease), background-color .3s var(--ease);
        }
        .pk-icon-btn:hover { border-color: var(--primary); transform: translateY(-1px); }

        .pk-overlay {
          position: fixed; inset: 0; background: rgba(10,16,12,0.5); z-index: 60;
          opacity: 0; pointer-events: none; transition: opacity .4s var(--ease);
        }
        .pk-overlay.pk-open { opacity: 1; pointer-events: auto; }

        .pk-drawer {
          position: fixed; top: 0; right: 0; height: 100%; width: min(86vw, 360px);
          background: color-mix(in srgb, var(--surface) 86%, transparent);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border-left: 1px solid color-mix(in srgb, var(--border) 60%, transparent);
          z-index: 70; box-shadow: -12px 0 32px var(--shadow);
          transform: translateX(100%); transition: transform .45s var(--ease-soft); display: flex; flex-direction: column;
        }
        .pk-drawer.pk-open { transform: translateX(0); }
        .pk-drawer-link {
          font-family: 'Fraunces', serif; font-size: 1.4rem; font-weight: 500;
          color: var(--ink); padding: 14px 0; border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
          transition: color .3s var(--ease), padding-left .3s var(--ease);
        }
        .pk-drawer-link:hover { color: var(--primary); padding-left: 4px; }

        .pk-hero-eyebrow {
          font-size: 0.72rem; letter-spacing: 0.14em; font-weight: 600;
        }
        .pk-hero-heading { font-size: clamp(2.3rem, 6vw, 4rem); line-height: 1.04; font-weight: 600; letter-spacing: -0.01em; }
        .pk-underline { text-decoration-color: var(--accent); text-decoration-thickness: 3px; text-underline-offset: 6px; }

        .pk-search-card {
          background: var(--surface); border-radius: var(--radius-card);
          border: 1px solid var(--border); box-shadow: 0 20px 40px var(--shadow);
        }
        .pk-tab-row {
          display: flex; gap: 5px; padding: 7px;
          background: var(--surface-2);
          border-radius: var(--radius-card) var(--radius-card) 0 0;
        }
        .pk-tab {
          flex: 1;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          font-size: 0.85rem; font-weight: 600;
          padding: 11px 10px; border-radius: 999px; border: none; background: transparent;
          color: var(--ink-soft); cursor: pointer;
          white-space: nowrap; transition: background-color .3s var(--ease), color .3s var(--ease), box-shadow .3s var(--ease);
        }
        .pk-tab.pk-tab-active { background: var(--primary); color: var(--primary-ink); box-shadow: 0 6px 14px var(--shadow); }
        .pk-tab:not(.pk-tab-active):hover { background: var(--border); }

        .pk-field label { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.04em; color: var(--ink-soft); text-transform: uppercase; }
        .pk-field input {
          width: 100%; background: transparent; border: none; font-size: 0.98rem; color: var(--ink);
          padding: 6px 0 2px; font-family: 'Work Sans', sans-serif;
        }
        .pk-field input:focus { outline: none; }

        .pk-select-trigger {
          width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px;
          background: transparent; border: none; font-size: 0.98rem; color: var(--ink);
          padding: 6px 0 2px; font-family: 'Work Sans', sans-serif; cursor: pointer; text-align: left;
        }
        .pk-select-chevron { color: var(--ink-soft); flex-shrink: 0; transition: transform .3s var(--ease-soft); }
        .pk-select-chevron-open { transform: rotate(180deg); }

        .pk-glass {
          background: color-mix(in srgb, var(--surface) 80%, transparent);
          backdrop-filter: blur(18px) saturate(160%);
          -webkit-backdrop-filter: blur(18px) saturate(160%);
          border: 1px solid color-mix(in srgb, var(--border) 60%, transparent);
        }

        .pk-select-panel {
          position: absolute; left: 0; right: 0; top: calc(100% + 10px); z-index: 30;
          border-radius: 16px; padding: 8px; margin: 0; list-style: none;
          box-shadow: 0 24px 48px var(--shadow);
          opacity: 0; transform: translateY(-6px) scale(0.98); pointer-events: none;
          transition: opacity .25s var(--ease-soft), transform .25s var(--ease-soft);
          max-height: 260px; overflow-y: auto;
        }
        .pk-select-panel-open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
        .pk-select-option {
          width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 8px;
          background: transparent; border: none; text-align: left; font-size: 0.94rem; font-weight: 500;
          color: var(--ink); padding: 10px 12px; border-radius: 10px; cursor: pointer;
          transition: background-color .2s var(--ease), color .2s var(--ease);
        }
        .pk-select-option:hover { background: color-mix(in srgb, var(--primary) 14%, transparent); }
        .pk-select-option-active { color: var(--primary); font-weight: 700; }

        .pk-stat-num { font-size: clamp(1.5rem, 3vw, 2.1rem); font-weight: 600; font-variant-numeric: tabular-nums; }

        .pk-breadcrumb button { cursor: pointer; }
        .pk-breadcrumb button:hover { text-decoration: underline; }

        .pk-chip-row { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; }
        .pk-chip-row::-webkit-scrollbar { display: none; }
        .pk-chip {
          display: flex; align-items: center; gap: 6px; flex-shrink: 0;
          padding: 9px 16px; border-radius: 999px; border: 1.5px solid var(--border);
          background: var(--surface); color: var(--ink-soft); font-weight: 600; font-size: 0.86rem;
          white-space: nowrap; cursor: pointer;
          transition: background-color .3s var(--ease), color .3s var(--ease), border-color .3s var(--ease);
        }
        .pk-chip:hover { border-color: var(--primary); }
        .pk-chip-active { background: var(--primary); color: var(--primary-ink); border-color: var(--primary); }

        .pk-filter-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-card);
          box-shadow: 0 12px 28px var(--shadow); padding: 20px; margin-top: 18px;
          display: grid; grid-template-columns: 1fr; gap: 18px;
          transition: background-color .4s var(--ease), border-color .4s var(--ease);
        }
        @media (min-width: 768px) {
          .pk-filter-card { grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); align-items: end; }
        }

        .pk-listing-grid { display: grid; grid-template-columns: 1fr; gap: 22px; margin-top: 32px; }
        @media (min-width: 640px) { .pk-listing-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .pk-listing-grid { grid-template-columns: repeat(3, 1fr); } }

        .pk-empty-state { text-align: center; padding: 70px 20px; }

        .pk-detail-grid { display: grid; grid-template-columns: 1fr; gap: 32px; margin-top: 24px; }
        @media (min-width: 1024px) {
          .pk-detail-grid { grid-template-columns: 1.6fr 1fr; align-items: start; }
        }

        .pk-detail-media { position: relative; border-radius: var(--radius-card); overflow: hidden; aspect-ratio: 16 / 10; }
        .pk-detail-media-img, .pk-detail-media .pk-img-fallback { width: 100%; height: 100%; object-fit: cover; display: block; }

        .pk-detail-facts {
          display: flex; flex-wrap: wrap; gap: 20px; margin-top: 22px; padding: 16px 0;
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .pk-detail-facts span { display: flex; align-items: center; gap: 7px; font-weight: 600; font-size: 0.92rem; color: var(--ink); }

        .pk-detail-section { margin-top: 34px; }

        .pk-amenity-list { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px 16px; }
        .pk-amenity-list li { display: flex; align-items: center; gap: 8px; font-size: 0.92rem; color: var(--ink-soft); }

        .pk-detail-sidebar { position: static; }
        @media (min-width: 1024px) {
          .pk-detail-sidebar { position: sticky; top: 100px; }
        }

        .pk-contact-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-card);
          box-shadow: 0 20px 40px var(--shadow); padding: 26px;
          transition: background-color .4s var(--ease), border-color .4s var(--ease);
        }
        .pk-contact-person {
          display: flex; align-items: center; gap: 12px; margin: 20px 0; padding: 16px 0;
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .pk-contact-actions { display: flex; flex-direction: column; gap: 10px; }
        .pk-initials-avatar {
          border-radius: 999px; flex-shrink: 0; background: var(--surface-2); color: var(--primary);
          border: 2px solid var(--accent); display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-family: 'Fraunces', serif;
        }

        .pk-stats-band {
          background: var(--stats-band-bg);
          border-radius: 26px;
          padding: 22px 6px 6px;
          transition: background .4s var(--ease);
        }
        .pk-stats-line { color: var(--primary); opacity: 0.4; padding: 0 20px; }
        .pk-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--border);
          border-radius: 20px;
          overflow: hidden;
          margin-top: 18px;
        }
        @media (min-width: 768px) {
          .pk-stats-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .pk-stat-cell {
          background: var(--surface);
          padding: 30px 26px;
          transition: background-color .4s var(--ease);
        }

        .pk-hero-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: center; }
        .pk-search-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; align-items: end; padding: 1.25rem; }
        .pk-footer-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
        @media (min-width: 768px) {
          .pk-hero-grid { grid-template-columns: 1.1fr 0.9fr; }
          .pk-search-grid { grid-template-columns: 1.4fr 1fr 1fr auto; padding: 1.5rem; }
          .pk-footer-grid { grid-template-columns: 1.3fr 1fr 1fr 1.3fr; }
        }

        .pk-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-card);
          transition: transform .3s var(--ease), box-shadow .3s var(--ease), border-color .3s var(--ease);
        }
        .pk-card:hover { transform: translateY(-3px); box-shadow: 0 16px 30px var(--shadow); border-color: var(--primary); }

        .pk-category-icon {
          width: 46px; height: 46px; border-radius: 12px; background: var(--surface-2);
          display: flex; align-items: center; justify-content: center; color: var(--primary);
        }

        .pk-prop-media { position: relative; aspect-ratio: 4/3; overflow: hidden; border-radius: var(--radius-card) var(--radius-card) 0 0; }
        .pk-prop-media img, .pk-img-fallback { width: 100%; height: 100%; object-fit: cover; display: block; }
        .pk-img-fallback { background: var(--surface-2); color: var(--ink-soft); display: flex; align-items: center; justify-content: center; }
        .pk-prop-tag {
          position: absolute; top: 10px; left: 10px; background: var(--primary); color: var(--primary-ink);
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
          padding: 5px 10px; border-radius: 999px;
        }
        .pk-fav-btn {
          position: absolute; top: 10px; right: 10px; width: 34px; height: 34px; border-radius: 999px;
          background: rgba(255,255,255,0.9); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer;
          transition: transform .25s var(--ease-soft);
        }
        .pk-fav-btn:hover { transform: scale(1.08); }
        .pk-prop-price { font-size: 1.15rem; font-weight: 600; }

        .pk-scroller {
          display: flex; gap: 18px; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: 6px;
          scrollbar-width: none;
        }
        .pk-scroller::-webkit-scrollbar { display: none; }
        .pk-scroller > * { scroll-snap-align: start; flex: 0 0 auto; }

        .pk-step-num { font-family: 'Fraunces', serif; font-size: 2.6rem; font-weight: 500; color: var(--accent); }

        .pk-agent-photo { width: 64px; height: 64px; border-radius: 999px; object-fit: cover; border: 2px solid var(--accent); }
        .pk-agent-photo-lg { width: 84px; height: 84px; border-radius: 999px; object-fit: cover; border: 2px solid var(--accent); }
        .pk-agent-score {
          display: inline-flex; align-items: center; gap: 4px; font-size: 0.8rem; margin-top: 2px;
        }
        .pk-agents-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; margin-top: 32px;
        }
        @media (min-width: 640px) { .pk-agents-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 1024px) { .pk-agents-grid { grid-template-columns: repeat(4, 1fr); } }

        .pk-contact-row { display: flex; align-items: center; gap: 12px; }
        .pk-contact-row-icon {
          width: 40px; height: 40px; border-radius: 12px; background: var(--surface-2); color: var(--primary);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }

        .pk-cta-band { background: var(--primary); color: var(--primary-ink); border-radius: 28px; overflow: hidden; position: relative; }

        .pk-footer { background: var(--surface); border-top: 1px solid var(--border); }
        .pk-footer a { color: var(--ink-soft); transition: color .3s var(--ease); }
        .pk-footer a:hover { color: var(--primary); }

        .pk-newsletter-input {
          background: var(--surface); border: 1.5px solid var(--border); border-radius: 999px;
          padding: 10px 16px; font-size: 0.9rem; color: var(--ink); flex: 1; min-width: 0;
          transition: border-color .3s var(--ease);
        }
        .pk-newsletter-input:focus { outline: none; border-color: var(--primary); }

        .pk-modal-backdrop {
          position: fixed; inset: 0; background: rgba(10,16,12,0.55); z-index: 80;
          display: flex; align-items: center; justify-content: center; padding: 20px;
          opacity: 0; pointer-events: none; transition: opacity .35s var(--ease);
        }
        .pk-modal-backdrop.pk-open { opacity: 1; pointer-events: auto; }
        .pk-modal {
          background: color-mix(in srgb, var(--surface) 82%, transparent);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          border: 1px solid color-mix(in srgb, var(--border) 60%, transparent);
          border-radius: 20px; width: 100%; max-width: 400px;
          padding: 28px; box-shadow: 0 30px 60px rgba(0,0,0,0.35);
          transform: translateY(14px) scale(0.98); opacity: 0; transition: transform .35s var(--ease-soft), opacity .3s var(--ease);
        }
        .pk-modal-backdrop.pk-open .pk-modal { transform: translateY(0) scale(1); opacity: 1; }
        .pk-modal input {
          width: 100%; background: color-mix(in srgb, var(--surface-2) 75%, transparent); border: 1.5px solid var(--border); border-radius: 12px;
          padding: 11px 14px; font-size: 0.95rem; color: var(--ink); margin-top: 6px;
          transition: border-color .3s var(--ease);
        }
        .pk-modal input:focus { outline: none; border-color: var(--primary); }
        .pk-modal-tab {
          flex: 1; text-align: center; padding: 10px; font-weight: 600; font-size: 0.9rem;
          color: var(--ink-soft); border-bottom: 2px solid var(--border); cursor: pointer;
          transition: color .3s var(--ease), border-color .3s var(--ease);
        }
        .pk-modal-tab.pk-modal-tab-active { color: var(--primary); border-bottom-color: var(--accent); }

        :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

        .pk-admin-shell { min-height: 100vh; display: flex; flex-direction: column; background: var(--bg); }
        .pk-admin-topbar {
          display: flex; align-items: center; justify-content: space-between; padding: 16px 24px;
          border-bottom: 1px solid var(--border); background: var(--surface);
        }
        .pk-admin-body { display: flex; flex: 1; min-height: 0; }
        .pk-admin-sidebar { width: 200px; flex-shrink: 0; border-right: 1px solid var(--border); padding: 20px 12px; display: flex; flex-direction: column; gap: 4px; }
        .pk-admin-nav-item {
          display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 10px; border: none; background: transparent;
          color: var(--ink-soft); font-weight: 600; font-size: 0.9rem; cursor: pointer; text-align: left; white-space: nowrap;
          transition: background-color .25s var(--ease), color .25s var(--ease);
        }
        .pk-admin-nav-item:hover { background: var(--surface-2); color: var(--ink); }
        .pk-admin-nav-active { background: var(--primary); color: var(--primary-ink); }
        .pk-admin-main { flex: 1; padding: 28px 32px; overflow-x: hidden; max-width: 1100px; }
        @media (max-width: 768px) {
          .pk-admin-body { flex-direction: column; }
          .pk-admin-sidebar { width: 100%; flex-direction: row; overflow-x: auto; border-right: none; border-bottom: 1px solid var(--border); }
          .pk-admin-main { padding: 20px; }
        }

        .pk-admin-gate { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; background: var(--bg); }
        .pk-admin-gate-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-card);
          box-shadow: 0 24px 48px var(--shadow); padding: 34px; width: 100%; max-width: 380px; text-align: center;
        }
        .pk-admin-gate-icon {
          width: 48px; height: 48px; border-radius: 999px; background: var(--surface-2); color: var(--primary);
          display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;
        }
        .pk-admin-gate-card form label { display: block; text-align: left; font-size: 0.82rem; font-weight: 600; color: var(--ink-soft); }
        .pk-admin-gate-card form input {
          width: 100%; margin-top: 6px; background: var(--surface-2); border: 1.5px solid var(--border); border-radius: 10px;
          padding: 10px 12px; font-size: 0.95rem; color: var(--ink);
        }
        .pk-admin-gate-card form input:focus { outline: none; border-color: var(--primary); }
        .pk-admin-error { color: var(--brick); font-size: 0.85rem; text-align: left; }
        .pk-admin-gate-back { margin-top: 18px; font-size: 0.85rem; color: var(--ink-soft); background: none; border: none; cursor: pointer; }
        .pk-admin-gate-back:hover { color: var(--primary); }

        .pk-admin-stat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; margin: 20px 0 28px; }
        @media (min-width: 768px) { .pk-admin-stat-grid { grid-template-columns: repeat(4, 1fr); } }
        .pk-admin-stat-card { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 16px; }
        .pk-admin-stat-value { font-size: 1.5rem; font-weight: 600; }

        .pk-admin-chart-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-card); padding: 22px; }

        .pk-admin-form { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-card); padding: 22px; margin-top: 18px; }
        .pk-admin-form-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 640px) { .pk-admin-form-grid { grid-template-columns: repeat(2, 1fr); } }
        .pk-admin-form-grid label { display: flex; flex-direction: column; gap: 6px; font-size: 0.8rem; font-weight: 600; color: var(--ink-soft); }
        .pk-admin-form-grid label input, .pk-admin-form-grid label select, .pk-admin-form-grid label textarea {
          font-family: 'Work Sans', sans-serif; font-size: 0.95rem; font-weight: 400; color: var(--ink);
          background: var(--surface-2); border: 1.5px solid var(--border); border-radius: 10px; padding: 10px 12px; resize: vertical;
        }
        .pk-admin-form-grid label input:focus, .pk-admin-form-grid label select:focus, .pk-admin-form-grid label textarea:focus {
          outline: none; border-color: var(--primary);
        }
        .pk-admin-form-full { grid-column: 1 / -1; }

        .pk-admin-notice {
          background: color-mix(in srgb, var(--accent) 14%, var(--surface)); border: 1px solid var(--accent);
          border-radius: 12px; padding: 14px 16px; font-size: 0.85rem; margin-top: 16px; line-height: 1.6;
        }

        .pk-admin-listing-list { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; }
        .pk-admin-listing-row {
          display: flex; align-items: center; gap: 14px; background: var(--surface); border: 1px solid var(--border);
          border-radius: 14px; padding: 12px 14px; flex-wrap: wrap;
        }
        .pk-admin-listing-thumb { width: 56px; height: 56px; border-radius: 10px; object-fit: cover; flex-shrink: 0; }
        .pk-admin-listing-info { flex: 1; min-width: 180px; }
        .pk-admin-listing-actions { display: flex; gap: 6px; flex-shrink: 0; }

        .pk-user-chip {
          display: flex; align-items: center; gap: 8px; padding: 5px 12px 5px 5px; border-radius: 999px;
          background: var(--surface-2); font-size: 0.85rem; font-weight: 600; color: var(--ink);
        }

        .pk-input-wrap { position: relative; display: block; width: 100%; }
        .pk-input-wrap input { padding-right: 38px !important; }
        .pk-input-indicator {
          position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
          display: flex; align-items: center; justify-content: center;
        }
        .pk-password-toggle { background: none; border: none; cursor: pointer; color: var(--ink-soft); padding: 2px; transition: color .2s var(--ease); }
        .pk-password-toggle:hover { color: var(--primary); }
        .pk-indicator-valid { color: var(--primary); }
        .pk-indicator-invalid { color: var(--brick); }

        .pk-password-requirements { list-style: none; margin: -4px 0 0; padding: 0; display: flex; flex-direction: column; gap: 4px; }
        .pk-password-requirements li {
          display: flex; align-items: center; gap: 6px; font-size: 0.76rem; font-weight: 500; color: var(--ink-soft);
          opacity: 0.5; transition: color .25s var(--ease), opacity .25s var(--ease);
        }
        .pk-password-requirements li svg { flex-shrink: 0; }
        .pk-req-met { color: var(--primary) !important; opacity: 1 !important; }

        .pk-status-badge {
          display: inline-block; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.02em; padding: 3px 9px; border-radius: 999px;
          background: color-mix(in srgb, var(--badge-color) 18%, transparent); color: var(--badge-color);
        }

        .pk-loading-screen {
          position: fixed; inset: 0; z-index: 200; background: var(--bg);
          display: flex; align-items: center; justify-content: center; padding: 24px;
          opacity: 1; transition: opacity .5s ease;
        }
        .pk-loading-fade-out { opacity: 0; pointer-events: none; }
        .pk-loading-inner { width: 100%; max-width: 440px; text-align: center; }
        .pk-loading-wordmark { font-size: 1.5rem; color: var(--ink); }

        .pk-loading-path-wrap { position: relative; padding-bottom: 30px; margin-bottom: 30px; }
        .pk-loading-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        .pk-loading-tile { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .pk-loading-tile-icon {
          width: 54px; height: 54px; border-radius: 16px; background: var(--surface); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center; color: var(--primary); box-shadow: 0 8px 20px var(--shadow);
        }
        .pk-loading-tile-label { font-size: 0.7rem; font-weight: 600; color: var(--ink-soft); }

        .pk-loading-track { position: absolute; left: 12.5%; right: 12.5%; bottom: 6px; height: 0; }
        .pk-loading-track-line { position: absolute; left: 0; right: 0; top: 0; border-top: 2px dashed var(--border); }
        .pk-loading-node {
          position: absolute; top: -3px; width: 7px; height: 7px; border-radius: 999px; background: var(--primary);
          transform: translateX(-50%);
        }
        .pk-loading-pin {
          position: absolute; top: -28px; transform: translateX(-50%);
          filter: drop-shadow(0 6px 10px var(--shadow));
          animation: pk-loading-pin-move 5s ease-in-out infinite;
        }

        .pk-loading-heading { font-size: 1.15rem; font-weight: 600; margin-bottom: 16px; }
        .pk-loading-bar-track { width: 100%; height: 6px; border-radius: 999px; background: var(--surface-2); overflow: hidden; margin-bottom: 12px; }
        .pk-loading-bar-fill {
          height: 100%; border-radius: 999px; background: linear-gradient(90deg, var(--primary), var(--accent));
          animation: pk-loading-bar 5s ease-in-out infinite;
        }
        .pk-loading-subtext { font-size: 0.85rem; color: var(--ink-soft); }

        .pk-loading-pulse-1 { animation: pk-pulse-1 5s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; }
        .pk-loading-pulse-2 { animation: pk-pulse-2 5s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; }
        .pk-loading-pulse-3 { animation: pk-pulse-3 5s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; }
        .pk-loading-pulse-4 { animation: pk-pulse-4 5s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; }

        @keyframes pk-pulse-1 { 0%, 8%, 16%, 100% { transform: scale(1); } 12% { transform: scale(1.3); } }
        @keyframes pk-pulse-2 { 0%, 33%, 41%, 100% { transform: scale(1); } 37% { transform: scale(1.3); } }
        @keyframes pk-pulse-3 { 0%, 58%, 66%, 100% { transform: scale(1); } 62% { transform: scale(1.3); } }
        @keyframes pk-pulse-4 { 0%, 83%, 91%, 100% { transform: scale(1); } 87% { transform: scale(1.3); } }

        @keyframes pk-loading-pin-move {
          0%   { left: 0%;      opacity: 0; }
          4%   { left: 0%;      opacity: 1; }
          12%  { left: 0%;      opacity: 1; }
          25%  { left: 33.333%; opacity: 1; }
          37%  { left: 33.333%; opacity: 1; }
          50%  { left: 66.666%; opacity: 1; }
          62%  { left: 66.666%; opacity: 1; }
          75%  { left: 100%;    opacity: 1; }
          87%  { left: 100%;    opacity: 1; }
          96%  { left: 100%;    opacity: 0; }
          100% { left: 100%;    opacity: 0; }
        }
        @keyframes pk-loading-bar {
          0%   { width: 4%;   opacity: 0; }
          4%   { width: 4%;   opacity: 1; }
          12%  { width: 4%;   opacity: 1; }
          25%  { width: 34%;  opacity: 1; }
          37%  { width: 34%;  opacity: 1; }
          50%  { width: 64%;  opacity: 1; }
          62%  { width: 64%;  opacity: 1; }
          75%  { width: 96%;  opacity: 1; }
          87%  { width: 96%;  opacity: 1; }
          96%  { width: 100%; opacity: 0; }
          100% { width: 4%;   opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pk-root, .pk-root * { transition: none !important; animation: none !important; }
        }
      `}</style>

      {showLoader && <LoadingScreen fadingOut={!appLoading} />}

      {page === "admin" ? (
        <AdminConsole
          theme={theme}
          setTheme={setTheme}
          onExit={goHome}
          listings={listings}
          onUpdateListings={updateListings}
          agents={agents}
          onUpdateAgents={updateAgents}
          initialAuthed={!!currentUser?.isSuperAdmin}
        />
      ) : (
      <>
      {/* ---------------- HEADER ---------------- */}
      <header className={`pk-header ${scrolled ? "pk-scrolled" : ""}`}>
        <div className="mx-auto max-w-7xl px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={goHome}>
            <LogoMark />
            <span className="pk-display pk-wordmark">
              patakeja
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.key}
                className={`pk-navlink ${currentCategory === link.key ? "pk-navlink-active" : ""}`}
                onClick={() => handleNavClick(link.key)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button className="pk-icon-btn" aria-label="Toggle theme" onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
              {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            {currentUser ? (
              <>
                {currentUser.isSuperAdmin && (
                  <button className="pk-btn-outline" onClick={() => setPage("admin")}>
                    <Shield size={15} /> Dashboard
                  </button>
                )}
                <div className="pk-user-chip" title={currentUser.email}>
                  <InitialsAvatar name={currentUser.name} size={30} />
                  <span>{currentUser.name}</span>
                </div>
                <button className="pk-icon-btn" aria-label="Log out" onClick={() => setCurrentUser(null)}>
                  <LogOut size={15} />
                </button>
              </>
            ) : (
              <button className="pk-btn-primary" onClick={() => openModal("login")}>
                Login / Sign Up
              </button>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            <button className="pk-icon-btn" aria-label="Toggle theme" onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
              {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <button className="pk-icon-btn" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <Menu size={19} />
            </button>
          </div>
        </div>
      </header>

      {/* ---------------- MOBILE DRAWER ---------------- */}
      <div className={`pk-overlay ${menuOpen ? "pk-open" : ""}`} onClick={() => setMenuOpen(false)} />
      <aside className={`pk-drawer ${menuOpen ? "pk-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="flex items-center justify-between px-6 pt-6 pb-2">
          <div className="flex items-center gap-2.5">
            <LogoMark size={30} />
            <span className="pk-display" style={{ fontSize: "1.2rem" }}>patakeja</span>
          </div>
          <button className="pk-icon-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <div className="px-6 flex-1 overflow-y-auto mt-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.key}
              className={`pk-drawer-link w-full text-left ${currentCategory === link.key ? "pk-primary-text" : ""}`}
              onClick={() => handleNavClick(link.key)}
            >
              {link.label} <ChevronRight size={18} className="pk-ink-soft" />
            </button>
          ))}
        </div>
        <div className="px-6 pb-8 pt-4 flex flex-col gap-3">
          {currentUser ? (
            <>
              <div className="pk-user-chip" title={currentUser.email} style={{ justifyContent: "center" }}>
                <InitialsAvatar name={currentUser.name} size={30} />
                <span>{currentUser.name}</span>
              </div>
              {currentUser.isSuperAdmin && (
                <button className="pk-btn-outline justify-center" onClick={() => { setPage("admin"); setMenuOpen(false); }}>
                  <Shield size={15} /> Dashboard
                </button>
              )}
              <button className="pk-btn-outline justify-center" onClick={() => { setCurrentUser(null); setMenuOpen(false); }}>
                <LogOut size={15} /> Log out
              </button>
            </>
          ) : (
            <button className="pk-btn-primary justify-center" onClick={() => openModal("login")}>
              Login / Sign Up
            </button>
          )}
        </div>
      </aside>

      {page === "home" && (
      <>
      {/* ---------------- HERO ---------------- */}
      <section ref={heroRef} className="mx-auto max-w-7xl px-4 md:px-8 pt-10 md:pt-16 pb-14 md:pb-20">
        <div className="pk-hero-grid">
          <div>
            <p className="pk-mono pk-hero-eyebrow pk-primary-text uppercase mb-4">
              Live in Nairobi &amp; Nakuru · more counties coming soon
            </p>
            <h1 className="pk-display pk-hero-heading">
              Pata your next <span className="pk-underline pk-accent-text underline decoration-wavy">keja</span>, fast.
            </h1>
            <p className="pk-ink-soft mt-5 text-base md:text-lg max-w-md">
              Search homes, offices and plots across Kenya — filtered by real budget, not guesswork.
            </p>
          </div>
          <div className="hidden md:block pk-primary-text opacity-80">
            <svg viewBox="0 0 320 220" width="100%" aria-hidden="true">
              <polyline points="0,150 40,150 60,110 90,150 110,80 140,150 170,120 190,150 220,60 250,150 280,150 300,100 320,150"
                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
              <circle cx="255" cy="42" r="20" fill="var(--accent)" opacity="0.9" />
              <rect x="30" y="150" width="26" height="34" fill="currentColor" opacity="0.35" />
              <rect x="95" y="150" width="34" height="42" fill="currentColor" opacity="0.5" />
              <rect x="200" y="150" width="30" height="30" fill="currentColor" opacity="0.3" />
            </svg>
          </div>
        </div>

        {/* Search card */}
        <div className="pk-search-card mt-10">
          <div className="pk-tab-row" style={{ scrollbarWidth: "none" }}>
            {Object.entries(TAB_META).map(([key, meta]) => {
              const TIcon = meta.icon;
              return (
                <button
                  key={key}
                  className={`pk-tab ${activeTab === key ? "pk-tab-active" : ""}`}
                  onClick={() => handleTabChange(key)}
                >
                  <TIcon size={15} /> {meta.label}
                </button>
              );
            })}
          </div>
          <div className="pk-search-grid">
            <div className="pk-field">
              <label htmlFor="pk-location">Location</label>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="pk-ink-soft" />
                <input
                  id="pk-location"
                  type="text"
                  placeholder="Try Kilimani, Karen, Milimani…"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <CustomSelect
              id="pk-secondary"
              label={TAB_META[activeTab].secondaryLabel}
              value={secondary}
              options={TAB_META[activeTab].secondaryOptions}
              onChange={setSecondary}
            />
            <CustomSelect
              id="pk-budget"
              label="Budget"
              value={budget}
              options={TAB_META[activeTab].budgetOptions}
              onChange={setBudget}
            />
            <button className="pk-btn-primary justify-center" onClick={() => goToListings(activeTab, { resetFilters: false })}>
              <Search size={16} /> Search
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-14 md:pb-20">
        <div className="pk-stats-band">
          <Roofline className="pk-stats-line" />
          <div className="pk-stats-grid">
            {STATS.map((s) => (
              <StatItem key={s.label} stat={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CATEGORIES ---------------- */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-16 md:pb-24">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="pk-mono text-xs pk-ink-soft uppercase tracking-wide mb-2">Browse by category</p>
            <h2 className="pk-display text-2xl md:text-4xl font-semibold">Whatever you're after, start here.</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((cat) => {
            const CatIcon = cat.icon;
            return (
              <button
                key={cat.key}
                onClick={() => handleNavClick(cat.key)}
                className="pk-card text-left p-5 md:p-6 flex flex-col gap-4"
              >
                <div className="pk-category-icon">
                  <CatIcon size={22} />
                </div>
                <div>
                  <h3 className="pk-display text-lg font-semibold mb-1">{cat.title}</h3>
                  <p className="pk-ink-soft text-sm">{cat.blurb}</p>
                </div>
                <div className="pk-mono text-xs pk-primary-text mt-auto pt-2 flex items-center gap-1">
                  {cat.count} <ArrowUpRight size={13} />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ---------------- FEATURED PROPERTIES ---------------- */}
      <section ref={featuredRef} className="mx-auto max-w-7xl px-4 md:px-8 pb-16 md:pb-24">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="pk-mono text-xs pk-ink-soft uppercase tracking-wide mb-2">Handpicked</p>
            <h2 className="pk-display text-2xl md:text-4xl font-semibold">Featured listings</h2>
          </div>
          <button className="pk-btn-outline hidden md:inline-flex" onClick={() => goToListings("all")}>
            View all <ArrowRight size={15} />
          </button>
        </div>

        <div className="pk-scroller md:grid md:grid-cols-4 md:gap-6">
          {approvedListings.slice(0, 8).map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              isFavorite={favorites.has(p.id)}
              onToggleFavorite={toggleFavorite}
              onSelect={viewProperty}
              style={{ width: "78vw", maxWidth: 300 }}
            />
          ))}
        </div>
        <button className="pk-btn-outline w-full justify-center mt-6 md:hidden" onClick={() => goToListings("all")}>
          View all listings <ArrowRight size={15} />
        </button>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-16 md:pb-24">
        <p className="pk-mono text-xs pk-ink-soft uppercase tracking-wide mb-2">How it works</p>
        <h2 className="pk-display text-2xl md:text-4xl font-semibold mb-10">Three steps to your keja.</h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-6">
          {STEPS.map((step, i) => (
            <div key={step.n}>
              <div className="pk-step-num">{step.n}</div>
              <Roofline className="pk-primary-text my-3" style={{ maxWidth: 80, height: 12 }} />
              <h3 className="pk-display text-xl font-semibold mb-2">{step.title}</h3>
              <p className="pk-ink-soft text-sm leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- AGENTS ---------------- */}
      <section ref={agentsRef} className="mx-auto max-w-7xl px-4 md:px-8 pb-16 md:pb-24">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="pk-mono text-xs pk-ink-soft uppercase tracking-wide mb-2">Trusted network</p>
            <h2 className="pk-display text-2xl md:text-4xl font-semibold">Meet a few of our agents</h2>
          </div>
          <button className="pk-btn-outline hidden md:inline-flex" onClick={goToAgents}>
            <Users size={15} /> View all agents
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {agents.filter((a) => a.status !== "banned").map((a) => (
            <div key={a.id} className="pk-card p-5 flex flex-col items-center text-center gap-2">
              <ImageWithFallback src={a.img} alt={a.name} className="pk-agent-photo" iconFallback={Users} />
              <h3 className="font-semibold mt-1 flex items-center gap-1">
                {a.name}
                {a.status === "verified" && <BadgeCheck size={14} className="pk-primary-text" />}
              </h3>
              <p className="pk-primary-text text-xs font-semibold">{a.focus}</p>
              <p className="pk-ink-soft text-xs">{a.area}</p>
              <AgentScore rating={a.rating} reviews={a.reviews} />
              <p className="pk-mono text-xs pk-ink-soft">{a.listings} listings</p>
            </div>
          ))}
        </div>
        <button className="pk-btn-outline w-full justify-center mt-6 md:hidden" onClick={goToAgents}>
          <Users size={15} /> View all agents
        </button>
      </section>

      {/* ---------------- CREATE ACCOUNT CTA ---------------- */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-16 md:pb-24">
        <div ref={ctaRef} className="pk-cta-band px-6 py-12 md:px-14 md:py-16 flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="max-w-lg">
            <p className="pk-mono text-xs uppercase tracking-wide mb-3 opacity-80">For buyers & renters</p>
            <h2 className="pk-display text-2xl md:text-3xl font-semibold mb-3">Ready to buy or rent?</h2>
            <p className="opacity-85 text-sm md:text-base">
              Create a free account to save listings, message agents directly, and get notified the moment a new keja matches what you're looking for.
            </p>
          </div>
          <button
            className="pk-mono flex items-center gap-2 font-semibold px-6 py-3 rounded-full flex-shrink-0"
            style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
            onClick={() => openModal("signup")}
          >
            <UserPlus size={17} /> Create free account
          </button>
        </div>
      </section>
      </>
      )}

      {page === "listings" && (
        <ListingsPage
          category={listingCategory}
          onCategoryChange={switchListingCategory}
          onBackHome={goHome}
          location={location}
          setLocation={setLocation}
          secondary={secondary}
          setSecondary={setSecondary}
          secondaryLabel={listingFilterMeta.secondaryLabel}
          secondaryOptions={listingFilterMeta.secondaryOptions}
          budget={budget}
          setBudget={setBudget}
          budgetOptions={listingFilterMeta.budgetOptions}
          sortBy={sortBy}
          setSortBy={setSortBy}
          results={filteredProperties}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onSelectProperty={viewProperty}
          onClearFilters={handleClearFilters}
        />
      )}

      {page === "detail" && selectedProperty && (
        <PropertyDetailPage
          key={selectedProperty.id}
          property={selectedProperty}
          category={selectedProperty.tag.toLowerCase()}
          onBackHome={goHome}
          onBackCategory={() => goToListings(selectedProperty.tag.toLowerCase())}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          similar={similarProperties}
          onSelectProperty={viewProperty}
          onOpenModal={openModal}
        />
      )}

      {page === "agents" && <AgentsPage agents={agents} onBackHome={goHome} onOpenModal={openModal} />}

      {/* ---------------- FOOTER ---------------- */}
      <footer className="pk-footer">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-14">
          <div className="pk-footer-grid">
            <div>
              <div className="flex items-center gap-2.5 mb-4 cursor-pointer" onClick={goHome}>
                <LogoMark size={30} />
                <span className="pk-display" style={{ fontSize: "1.2rem" }}>patakeja</span>
              </div>
              <p className="pk-ink-soft text-sm max-w-xs">
                Kenya's home search, sorted. Buy, rent, lease or list — all in one place.
              </p>
              <div className="flex items-center gap-2 mt-5">
                <a href="#" aria-label="Facebook" className="pk-icon-btn"><Facebook size={16} /></a>
                <a href="#" aria-label="Instagram" className="pk-icon-btn"><Instagram size={16} /></a>
                <a href="#" aria-label="Twitter" className="pk-icon-btn"><Twitter size={16} /></a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Explore</h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li><a href="#">Buy a home</a></li>
                <li><a href="#">Rent a home</a></li>
                <li><a href="#">Commercial spaces</a></li>
                <li><a href="#">Land</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Company</h4>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li><a href="#">About patakeja</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Agent network</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Stay in the loop</h4>
              <p className="pk-ink-soft text-sm mb-3">New listings, once a week. No spam.</p>
              <form className="flex gap-2" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="pk-newsletter-input"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button type="submit" className="pk-icon-btn" aria-label="Subscribe" style={{ background: "var(--primary)", color: "var(--primary-ink)", borderColor: "var(--primary)" }}>
                  <ArrowRight size={16} />
                </button>
              </form>
              {subscribed && (
                <p className="pk-primary-text text-xs mt-2 flex items-center gap-1">
                  <ShieldCheck size={13} /> Subscribed — check your inbox.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 mt-10 text-xs pk-ink-soft" style={{ borderTop: "1px solid var(--border)" }}>
            <span>© 2026 patakeja. Made for Kenya, one keja at a time.</span>
            <div className="flex items-center gap-5">
              <a href="#" className="flex items-center gap-1"><Phone size={13} /> +254 700 000 000</a>
              <a href="#" className="flex items-center gap-1"><Mail size={13} /> hello@patakeja.co.ke</a>
              <button onClick={() => { setPage("admin"); setMenuOpen(false); }} className="hover:underline">
                Admin
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ---------------- LOGIN / SIGNUP MODAL ---------------- */}
      <div className={`pk-modal-backdrop ${modalOpen ? "pk-open" : ""}`} onClick={() => setModalOpen(false)}>
        <div className="pk-modal" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between mb-5">
            <span className="pk-display text-lg font-semibold">Welcome to patakeja</span>
            <button className="pk-icon-btn" aria-label="Close" onClick={() => setModalOpen(false)}>
              <X size={16} />
            </button>
          </div>
          <div className="flex mb-5">
            <button className={`pk-modal-tab ${modalTab === "login" ? "pk-modal-tab-active" : ""}`} onClick={() => setModalTab("login")}>
              Log in
            </button>
            <button className={`pk-modal-tab ${modalTab === "signup" ? "pk-modal-tab-active" : ""}`} onClick={() => setModalTab("signup")}>
              Sign up
            </button>
          </div>
          <form className="flex flex-col gap-3" onSubmit={handleAuthSubmit}>
            {modalTab === "signup" && (
              <label className="text-sm font-medium">
                Full name
                <input type="text" placeholder="Jane Wanjiku" value={authName} onChange={(e) => setAuthName(e.target.value)} />
              </label>
            )}
            <label className="text-sm font-medium">
              Email or phone
              <div className="pk-input-wrap">
                <input
                  type="text"
                  placeholder="you@email.com"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  required
                />
                {authEmail.trim() !== "" && (
                  <span className={`pk-input-indicator ${isValidIdentifier ? "pk-indicator-valid" : "pk-indicator-invalid"}`}>
                    {isValidIdentifier ? <Check size={15} /> : <X size={15} />}
                  </span>
                )}
              </div>
            </label>
            <label className="text-sm font-medium">
              {authEmailIsSuperAdmin ? "Superadmin passphrase" : "Password"}
              <div className="pk-input-wrap">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="pk-input-indicator pk-password-toggle"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </label>
            {modalTab === "signup" && !authEmailIsSuperAdmin && (
              <ul className="pk-password-requirements">
                <li className={passwordChecks.length ? "pk-req-met" : ""}>
                  <Check size={13} /> At least 8 characters
                </li>
                <li className={passwordChecks.upperLower ? "pk-req-met" : ""}>
                  <Check size={13} /> Uppercase &amp; lowercase letters
                </li>
                <li className={passwordChecks.digit ? "pk-req-met" : ""}>
                  <Check size={13} /> At least 1 number
                </li>
                <li className={passwordChecks.special ? "pk-req-met" : ""}>
                  <Check size={13} /> At least 1 special character
                </li>
              </ul>
            )}
            {authEmailIsSuperAdmin && (
              <p className="pk-admin-notice" style={{ marginTop: 0, fontSize: "0.78rem" }}>
                <Shield size={13} className="inline-block mr-1" style={{ verticalAlign: "-2px" }} />
                Superadmin email recognized — enter the passphrase to open the dashboard.
              </p>
            )}
            {authError && <p className="pk-admin-error">{authError}</p>}
            <button type="submit" className="pk-btn-primary justify-center mt-2">
              {authEmailIsSuperAdmin ? "Enter dashboard" : modalTab === "login" ? "Log in" : "Create account"}
            </button>
          </form>
          <p className="pk-ink-soft text-xs text-center mt-4">
            {modalTab === "login" ? "New to patakeja?" : "Already have an account?"}{" "}
            <button
              className="pk-primary-text font-semibold"
              onClick={() => setModalTab(modalTab === "login" ? "signup" : "login")}
            >
              {modalTab === "login" ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
      </>
      )}
    </div>
  );
}
