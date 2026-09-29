import nadia from "@/assets/creator-nadia.jpg";
import raka from "@/assets/creator-raka.jpg";
import couple from "@/assets/creator-couple.jpg";

type L = { id: string; en: string };

// Fictional mock creators — replace once research confirms creator profiles.
export type Creator = {
  id: string;
  name: string;
  age: string;
  role: L;
  image: string;
  campaign: L;
  challenge: L;
  day: number;
  totalDays: number;
  saved: number;
  miles: number;
  quote: L;
};

export const CREATORS: Creator[] = [
  {
    id: "nadia",
    name: "Nadia",
    age: "24",
    role: { id: "Pekerja Muda", en: "Young Professional" },
    image: nadia,
    campaign: { id: "30 Days Closer", en: "30 Days Closer" },
    challenge: { id: "Nabung Rp15.000 tiap pulang kerja", en: "Save Rp15,000 after every workday" },
    day: 18,
    totalDays: 30,
    saved: 487_600,
    miles: 1240,
    quote: { id: "Gue kira harus nunggu punya uang banyak untuk mulai.", en: "I thought I had to wait until I earned more to start." },
  },
  {
    id: "raka",
    name: "Raka",
    age: "27",
    role: { id: "Kreator Konten", en: "Content Creator" },
    image: raka,
    campaign: { id: "STEP for Mom", en: "STEP for Mom" },
    challenge: { id: "Round-Up setiap endorse untuk Ibu", en: "Round-Up every brand deal for Mom" },
    day: 42,
    totalDays: 90,
    saved: 2_150_000,
    miles: 3180,
    quote: { id: "Ibu nggak pernah minta. Makanya gue mulai duluan.", en: "Mom never asked. That's why I started first." },
  },
  {
    id: "couple",
    name: "Alya & Farhan",
    age: "28 & 29",
    role: { id: "Pasangan Muda", en: "Young Couple" },
    image: couple,
    campaign: { id: "Hajj Together", en: "Hajj Together" },
    challenge: { id: "Satu target, dua dompet", en: "One goal, two wallets" },
    day: 64,
    totalDays: 120,
    saved: 4_320_000,
    miles: 5460,
    quote: { id: "Dulu nabung buat nikah. Sekarang nabung buat berangkat bareng.", en: "We saved for our wedding. Now we save to go together." },
  },
];
