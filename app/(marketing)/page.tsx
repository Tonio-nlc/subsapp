import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {
  return (
    <main>
      <Navbar />
      {/* HERO */}
      <section className="section section-pad">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl text-zinc-900">
              Stop overpaying for forgotten subscriptions.
            </h1>
            <p className="mt-4 text-zinc-600">
              Too many subscriptions, zero visibility. Centralize them, spot duplicates and price hikes, and cut the waste in minutes.
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="/app" className="btn btn-blue px-5 py-2.5">Start free</Link>
              <Link href="/pricing" className="btn btn-ghost px-5 py-2.5">See pricing</Link>
            </div>
            <p className="mt-3 text-sm text-zinc-600">
              ✓ Free up to 10 subscriptions • JSON export • Visual analytics included
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-white">
              <Image src="/hero-finance.svg" alt="Subscription spend overview" fill priority sizes="(min-width: 768px) 560px, 100vw"/>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION A — Value Proposition (light) */}
      <section className="section section-pad surface-light">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <div className="kicker">Built to stop recurring waste</div>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Cut subscription leakage in minutes — not months.</h2>
              <p className="mt-3 surface-light-muted">
                subsapp brings every recurring cost into one clear view. Find duplicates, catch silent price hikes, and pause what you don't need — before the next billing hits.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="pill surface-light-border border"><span className="icon-bubble">🧭</span>One dashboard</span>
                <span className="pill surface-light-border border"><span className="icon-bubble">🛑</span>Pause anytime</span>
                <span className="pill surface-light-border border"><span className="icon-bubble">📈</span>12-month outlook</span>
                <span className="pill surface-light-border border"><span className="icon-bubble">📤</span>JSON/CSV/XLSX export</span>
              </div>

              <div className="mt-6 flex gap-3">
                <a href="/app" className="btn btn-blue px-5 py-2.5">Start free</a>
                <a href="/features" className="btn btn-ghost px-5 py-2.5">See features</a>
              </div>
            </div>

            {/* Light cards with dark text */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="surface-light-card surface-light-border card border">
                <div className="icon-bubble">🔎</div>
                <div className="mt-2 font-medium">Duplicate finder</div>
                <p className="mt-1 text-sm surface-light-muted">Spot overlapping tools before they drain your budget.</p>
              </div>
              <div className="surface-light-card surface-light-border card border">
                <div className="icon-bubble">📅</div>
                <div className="mt-2 font-medium">Next-billing countdown</div>
                <p className="mt-1 text-sm surface-light-muted">Never miss renewals or end of trials again.</p>
              </div>
              <div className="surface-light-card surface-light-border card border">
                <div className="icon-bubble">🏷️</div>
                <div className="mt-2 font-medium">Categories & notes</div>
                <p className="mt-1 text-sm surface-light-muted">Keep context and ownership clear for every line.</p>
              </div>
              <div className="surface-light-card surface-light-border card border">
                <div className="icon-bubble">📊</div>
                <div className="mt-2 font-medium">Visual analytics</div>
                <p className="mt-1 text-sm surface-light-muted">Pie by category, monthly vs yearly bars, quick trends.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B — Social Proof (light) */}
      <section className="section py-10 surface-light">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border surface-light-border bg-white px-6 py-6 shadow-sm">
            <div className="grid gap-6 md:grid-cols-3 md:items-center">
              <div>
                <div className="eyebrow">Trusted by smart savers</div>
                <p className="mt-2 text-lg font-medium text-zinc-900">
                  "Cancelled two overlapping tools in 10 minutes — saved €24/month."
                </p>
              </div>
              {/* Logo pills */}
              <div className="col-span-2 flex flex-wrap items-center gap-3 md:justify-end">
                <span className="pill surface-light-border border bg-zinc-50">Acme</span>
                <span className="pill surface-light-border border bg-zinc-50">Nova</span>
                <span className="pill surface-light-border border bg-zinc-50">Orion</span>
                <span className="pill surface-light-border border bg-zinc-50">Beta</span>
              </div>
            </div>
            {/* Rating strip */}
            <div className="mt-4 flex items-center gap-2 text-sm text-zinc-700">
              <span>★★★★★</span><span>4.9/5 based on early users</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C — Quick Features (light) */}
      <section className="section section-pad surface-light">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold tracking-tight">What you get in minutes</h2>
          <p className="mt-2 surface-light-muted">Stop the leaks without adding complexity.</p>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {icon:"🗂️", title:"Unified view", desc:"Name, cost, cycle, next billing — visible at a glance."},
              {icon:"⏸️", title:"Pause without deleting", desc:"Exclude from totals until you need it again."},
              {icon:"🏷️", title:"Categories & notes", desc:"Color-code and annotate to stay organized."},
              {icon:"📤", title:"Exports that work", desc:"JSON (Free) • CSV/XLSX (Pro, Sheets-friendly)."},
              {icon:"📊", title:"Visual analytics", desc:"Pie by category, monthly vs yearly bars."},
              {icon:"🔮", title:"12-month forecast", desc:"Know what's coming before it hits your card."},
            ].map((f) => (
              <div key={f.title} className="surface-light-card surface-light-border card border">
                <span className="icon-bubble" aria-hidden>{f.icon}</span>
                <div className="mt-2 font-medium">{f.title}</div>
                <div className="mt-1 text-sm surface-light-muted">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section section-pad">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-zinc-900">Ready to take control?</h2>
          <p className="mt-2 text-zinc-600">Start in minutes. Free up to 10 subscriptions. Upgrade any time.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/app" className="btn btn-blue px-5 py-2.5">Start free</Link>
            <Link href="/features" className="btn btn-ghost px-5 py-2.5">Explore features</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
