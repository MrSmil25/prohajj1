export const HAJJ_TARGET = 25_000_000;

export type Milestone = {
  amount: number;
  label: string;
  title: string;
  copy: string;
};

export const MILESTONES: Milestone[] = [
  { amount: 0, label: "START", title: "Niat", copy: "It begins with an intention." },
  { amount: 1_000_000, label: "Rp1M", title: "First Step", copy: "The hardest step is the first." },
  {
    amount: 5_000_000,
    label: "Rp5M",
    title: "Building the Habit",
    copy: "Consistency is quietly powerful.",
  },
  { amount: 10_000_000, label: "Rp10M", title: "Istiqamah", copy: "Every step counts." },
  { amount: 12_500_000, label: "Rp12.5M", title: "Halfway", copy: "Halfway is closer than it feels." },
  { amount: 20_000_000, label: "Rp20M", title: "Almost There", copy: "The destination is in sight." },
  {
    amount: 25_000_000,
    label: "Rp25M",
    title: "Start Your Hajj Queue",
    copy: "Your next chapter begins.",
  },
];

export const COMPACT_MILESTONES = [
  "Niat",
  "First Step",
  "Istiqamah",
  "Halfway",
  "Almost There",
  "Registration",
];

export type EarnCategory = "Shop" | "Save" | "Challenge" | "Invite";

export type PartnerReward = {
  name: string;
  detail: string;
  reward: string;
  category: EarnCategory;
  miles: number;
};

export const PARTNER_REWARDS: PartnerReward[] = [
  { name: "Alfamart", detail: "Pay with Aladin", reward: "+10 Miles", category: "Shop", miles: 10 },
  {
    name: "Alfamidi",
    detail: "Selected purchases",
    reward: "2× Miles",
    category: "Shop",
    miles: 20,
  },
  {
    name: "Aladin QRIS",
    detail: "Any merchant above Rp25.000",
    reward: "+6 Miles",
    category: "Shop",
    miles: 6,
  },
  {
    name: "Weekly Saving",
    detail: "Save at least Rp50.000",
    reward: "+25 Miles",
    category: "Save",
    miles: 25,
  },
  {
    name: "Round-Up Saving",
    detail: "Every rounded transaction",
    reward: "+2 Miles",
    category: "Save",
    miles: 2,
  },
  {
    name: "7-Day Istiqamah",
    detail: "Finish the weekly challenge",
    reward: "+100 Miles",
    category: "Challenge",
    miles: 100,
  },
  {
    name: "Friday Saver",
    detail: "Save every Friday this month",
    reward: "+60 Miles",
    category: "Challenge",
    miles: 60,
  },
  {
    name: "Invite a Friend",
    detail: "When they start their journey",
    reward: "+250 Miles",
    category: "Invite",
    miles: 250,
  },
  {
    name: "Invite Family",
    detail: "Build a shared Hajj goal",
    reward: "+300 Miles",
    category: "Invite",
    miles: 300,
  },
];

export type Challenge = {
  id: string;
  title: string;
  detail: string;
  done: number;
  total: number;
  reward: number;
};

export const CHALLENGES: Challenge[] = [
  {
    id: "istiqamah",
    title: "7-Day Istiqamah",
    detail: "Save every day for seven days",
    done: 5,
    total: 7,
    reward: 100,
  },
  {
    id: "friday",
    title: "Friday Saver",
    detail: "Save every Friday this month",
    done: 3,
    total: 4,
    reward: 60,
  },
  {
    id: "roundup",
    title: "Round-Up Hero",
    detail: "Complete 10 round-up transactions",
    done: 7,
    total: 10,
    reward: 40,
  },
];

export const CONTRIBUTORS = [
  { name: "You", amount: 5_200_000 },
  { name: "Dad", amount: 2_000_000 },
  { name: "Sarah", amount: 1_200_000 },
];
