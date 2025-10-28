import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Features — subsapp",
  description: "Centralize, track, pause, export, and analyze all your subscriptions.",
};

export default function FeaturesPage() {
  return (
    <main className="min-h-dvh bg-zinc-50">
      <Navbar />
      <section className="section section-pad">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Features</h1>
        <p className="mt-2 text-zinc-600">Solve the real problem: too many subscriptions, no visibility, money wasted every month.</p>
      </section>

      <section className="section grid grid-cols-1 gap-6 pb-16 md:grid-cols-3">
        {[{
          title: "Unified view",
          desc: "All your subscriptions in one place, with categories, colors, and notes.",
          emoji: "🗂️",
        }, {
          title: "Budget control",
          desc: "Monthly/yearly equivalents, instant total, and countdown until the next billing.",
          emoji: "💶",
        }, {
          title: "Pause & resume",
          desc: "Put a service on pause without deleting it. Automatically excluded from totals.",
          emoji: "⏸️",
        }, {
          title: "Import/Export",
          desc: "Free: JSON. Pro: CSV/XLSX (compatible with Google Sheets).",
          emoji: "📦",
        }, {
          title: "Visual analytics",
          desc: "Charts by category, monthly vs yearly comparisons, 12-month forecast.",
          emoji: "📊",
        }, {
          title: "Alerts (roadmap)",
          desc: "Renewal reminders and price increase detection (Pro coming soon).",
          emoji: "🔔",
        }].map((f) => (
          <div key={f.title} className="card">
            <div className="text-2xl">{f.emoji}</div>
            <h3 className="mt-3 font-medium text-zinc-900">{f.title}</h3>
            <p className="mt-2 text-sm text-zinc-600">{f.desc}</p>
          </div>
        ))}
      </section>
      <Footer />
    </main>
  );
}
