import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Pricing — subsapp",
  description: "Free $0 and Pro $5/month. Start free.",
};

export default function PricingPage() {
  return (
    <main className="min-h-dvh bg-zinc-50">
      <Navbar />
      <section className="section section-pad">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Simple pricing</h1>
        <p className="mt-2 text-zinc-600">Start free, upgrade to Pro if you need advanced exports and unlimited subscriptions.</p>
      </section>

      <section className="section grid grid-cols-1 gap-6 pb-16 md:grid-cols-2">
        {/* Free */}
        <div className="card">
          <h3 className="text-xl font-medium text-zinc-900">Free</h3>
          <p className="mt-1 text-sm text-zinc-600">$0/month</p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            <li>• 10 subscriptions included</li>
            <li>• Import / Export JSON</li>
            <li>• Analytics (charts & bars)</li>
            <li>• Categories, colors, notes</li>
          </ul>
          <Link href="/app" className="mt-6 btn btn-ghost px-4 py-2 text-sm">
            Start free
          </Link>
        </div>

        {/* Pro */}
        <div className="card">
          <h3 className="text-xl font-medium text-zinc-900">Pro</h3>
          <p className="mt-1 text-sm text-zinc-600">$5/month</p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600">
            <li>• Unlimited subscriptions</li>
            <li>• Export CSV/XLSX</li>
            <li>• Advanced forecast (coming soon)</li>
            <li>• Alerts & reminders (coming soon)</li>
          </ul>
          <Link href="/app" className="mt-6 btn btn-blue px-4 py-2 text-sm">
            Upgrade to Pro
          </Link>
          <p className="mt-2 text-xs text-zinc-500">* Pro activation is demo-only in-app if billing is not yet integrated.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
