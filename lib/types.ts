export type Cycle = "monthly" | "yearly";

export interface Subscription {
  id: string; // uuid
  name: string;
  price: number; // valeur brute dans currency
  currency: string; // ex: "EUR"
  cycle: Cycle;
  nextBilling: string; // ISO8601
  category?: string;
  color?: string;
  paused?: boolean;
  notes?: string;
  createdAt: number; // epoch ms
  updatedAt: number; // epoch ms
}

export type Plan = "free" | "pro";

export interface Settings {
  currency: string; // ex: "EUR"
  locale: string; // ex: "fr-FR"
  plan: Plan;
  proTrial?: boolean; // optionnel pour démo locale
  monthlyBudget?: number; // optional monthly budget
}

export interface AppState {
  subscriptions: Subscription[];
  settings: Settings;
}

