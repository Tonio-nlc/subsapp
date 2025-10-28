import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Subscription } from "./types";

export function exportCSV(subs: Subscription[]): void {
  const headers = ["id", "name", "price", "currency", "cycle", "nextBilling", "category", "color", "paused", "notes"];
  
  const rows = subs.map((sub) => [
    sub.id,
    sub.name,
    sub.price,
    sub.currency,
    sub.cycle,
    sub.nextBilling,
    sub.category || "",
    sub.color || "",
    sub.paused ? "true" : "false",
    sub.notes || "",
  ]);
  
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");
  
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `abonnements-${new Date().toISOString().split("T")[0]}.csv`);
}

export function exportXLSX(subs: Subscription[]): void {
  const headers = ["id", "name", "price", "currency", "cycle", "nextBilling", "category", "color", "paused", "notes"];
  
  const rows = subs.map((sub) => [
    sub.id,
    sub.name,
    sub.price,
    sub.currency,
    sub.cycle,
    sub.nextBilling,
    sub.category || "",
    sub.color || "",
    sub.paused ? "true" : "false",
    sub.notes || "",
  ]);
  
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Abonnements");
  
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  saveAs(blob, `abonnements-${new Date().toISOString().split("T")[0]}.xlsx`);
}

export function exportJSON(subs: Subscription[]): void {
  const data = { subscriptions: subs, exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  saveAs(blob, `abonnements-${new Date().toISOString().split("T")[0]}.json`);
}

export async function parseJSON(file: File): Promise<Subscription[]> {
  const text = await file.text();
  const data = JSON.parse(text);
  
  if (!Array.isArray(data.subscriptions)) {
    throw new Error("Invalid JSON format: missing subscriptions array");
  }
  
  return data.subscriptions.map((sub: any) => ({
    id: sub.id || crypto.randomUUID(),
    name: sub.name || "",
    price: Number(sub.price) || 0,
    currency: sub.currency || "EUR",
    cycle: sub.cycle || "monthly",
    nextBilling: sub.nextBilling || sub.nextBillingDate || new Date().toISOString(),
    category: sub.category,
    color: sub.color,
    paused: sub.paused || false,
    notes: sub.notes,
    createdAt: sub.createdAt || Date.now(),
    updatedAt: sub.updatedAt || Date.now(),
  }));
}

