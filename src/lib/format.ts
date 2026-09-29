export function rupiah(value: number): string {
  const rounded = Math.round(value);
  return "Rp" + rounded.toLocaleString("id-ID").replace(/,/g, ".");
}

export function miles(value: number): string {
  return Math.round(value).toLocaleString("en-US");
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Projected arrival date for the Rp25M milestone. */
export function projectMilestone(current: number, monthly: number, target = 25_000_000) {
  const remaining = Math.max(target - current, 0);
  const perMonth = Math.max(monthly, 1);
  const months = Math.ceil(remaining / perMonth);
  const base = new Date(2026, 8, 1);
  const date = new Date(base.getFullYear(), base.getMonth() + months, 1);
  return {
    months,
    label: `${MONTHS[date.getMonth()]} ${date.getFullYear()}`,
  };
}
