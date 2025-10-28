import { Cycle } from "./types";

export function formatMoney(value: number, currency: string, locale: string): string {
  // Handle € manually since it might not be recognized as a standard currency code
  const currencyCode = currency === "€" ? "EUR" : currency.replace(/[^A-Z]/g, "USD");
  
  try {
    const formatted = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
    
    // Replace USD with original currency if needed
    return currencyCode === "USD" && currency !== "€" ? formatted.replace(/USD|US\$/, currency) : formatted;
  } catch {
    return `${value.toFixed(2)} ${currency}`;
  }
}

export function normalizeMonthly(price: number, cycle: Cycle): number {
  return cycle === "monthly" ? price : price / 12;
}

export function daysUntil(dateISO: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const target = new Date(dateISO);
  target.setHours(0, 0, 0, 0);
  
  const diffMs = target.getTime() - today.getTime();
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  
  return Math.max(0, days); // Ensure non-negative
}

