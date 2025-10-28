import { Subscription } from "./types";
import { normalizeMonthly } from "./formatting";

export interface CategoryData {
  name: string;
  value: number;
}

export interface CycleComparison {
  name: string;
  value: number;
}

export function byCategoryMonthly(subs: Subscription[]): CategoryData[] {
  const activeSubs = subs.filter((s) => !s.paused);
  
  const categoryMap = new Map<string, number>();
  
  activeSubs.forEach((sub) => {
    const category = sub.category || "Non catégorisé";
    const monthly = normalizeMonthly(sub.price, sub.cycle);
    categoryMap.set(category, (categoryMap.get(category) || 0) + monthly);
  });
  
  return Array.from(categoryMap.entries()).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2)),
  }));
}

export function monthlyVsYearly(subs: Subscription[]): CycleComparison[] {
  const activeSubs = subs.filter((s) => !s.paused);
  
  let totalMonthly = 0;
  let totalYearly = 0;
  
  activeSubs.forEach((sub) => {
    totalMonthly += normalizeMonthly(sub.price, sub.cycle);
    totalYearly += sub.cycle === "yearly" ? sub.price : sub.price * 12;
  });
  
  return [
    { name: "Mensuel (€/mois)", value: Number(totalMonthly.toFixed(2)) },
    { name: "Annuel (€/an)", value: Number(totalYearly.toFixed(2)) },
  ];
}

// Helper functions for dashboard
export function daysUntilRenewal(dateISO: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const renewalDate = new Date(dateISO);
  renewalDate.setHours(0, 0, 0, 0);
  const diffTime = renewalDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function getUpcomingRenewals(subs: Subscription[], days: number = 30) {
  const activeSubs = subs.filter((s) => !s.paused);
  return activeSubs
    .map((sub) => ({
      ...sub,
      daysUntil: daysUntilRenewal(sub.nextBilling),
    }))
    .filter((sub) => sub.daysUntil >= 0 && sub.daysUntil <= days)
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 3);
}

export function getDuplicateServices(subs: Subscription[]) {
  const activeSubs = subs.filter((s) => !s.paused);
  const nameMap = new Map<string, number>();
  
  activeSubs.forEach((sub) => {
    const name = sub.name.toLowerCase().trim();
    nameMap.set(name, (nameMap.get(name) || 0) + 1);
  });
  
  const duplicates = Array.from(nameMap.entries())
    .filter(([, count]) => count > 1)
    .length;
  
  return duplicates;
}

export function getDueThisWeek(subs: Subscription[]): number {
  const activeSubs = subs.filter((s) => !s.paused);
  return activeSubs.filter((sub) => {
    const days = daysUntilRenewal(sub.nextBilling);
    return days >= 0 && days <= 7;
  }).length;
}

