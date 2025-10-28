import { Subscription } from "./types";

export function getDemoData(): Subscription[] {
  const now = Date.now();
  
  return [
    {
      id: crypto.randomUUID(),
      name: "Netflix Standard",
      price: 13.99,
      currency: "EUR",
      cycle: "monthly",
      nextBilling: new Date(2025, 0, 15).toISOString(),
      category: "Divertissement",
      color: "#E50914",
      paused: false,
      notes: "4K Ultra HD",
      createdAt: now - 86400000 * 30,
      updatedAt: now - 86400000 * 30,
    },
    {
      id: crypto.randomUUID(),
      name: "Spotify Premium",
      price: 9.99,
      currency: "EUR",
      cycle: "monthly",
      nextBilling: new Date(2025, 0, 20).toISOString(),
      category: "Musique",
      color: "#1DB954",
      paused: false,
      notes: "Abonnement familial",
      createdAt: now - 86400000 * 60,
      updatedAt: now - 86400000 * 60,
    },
    {
      id: crypto.randomUUID(),
      name: "iCloud 200 Go",
      price: 2.99,
      currency: "EUR",
      cycle: "monthly",
      nextBilling: new Date(2025, 1, 1).toISOString(),
      category: "Cloud Storage",
      color: "#007AFF",
      paused: false,
      notes: "Stockage iCloud",
      createdAt: now - 86400000 * 15,
      updatedAt: now - 86400000 * 15,
    },
  ];
}

