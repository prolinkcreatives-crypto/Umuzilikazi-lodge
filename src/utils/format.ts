import { differenceInCalendarDays, parseISO } from 'date-fns';

export function formatZmw(amount: number): string {
  // Deliberately not using Intl's `currency` style here: ICU data for
  // ZMW varies by runtime (some environments render "ZMW 360", others
  // "K 360" with a non-breaking space) which produced inconsistent,
  // wrongly-spaced output. Plain grouped-number formatting + a manual
  // "K" prefix is deterministic across every browser and Node version.
  const grouped = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  return `K${grouped}`;
}

export function nightsBetween(checkIn: string | null, checkOut: string | null): number {
  if (!checkIn || !checkOut) return 0;
  const nights = differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn));
  return nights > 0 ? nights : 0;
}
