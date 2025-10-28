import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-zinc-200 bg-white">
      <div className="section grid gap-6 py-10 md:grid-cols-3">
        <div className="space-y-2">
          <div className="font-semibold text-zinc-900">subsapp</div>
          <p className="text-sm text-zinc-600">Track, optimize, stop overpaying.</p>
        </div>
        <div className="text-sm text-zinc-600">
          <div className="font-medium text-zinc-900">Product</div>
          <ul className="mt-2 space-y-1">
            <li><Link href="/features" className="a-muted">Features</Link></li>
            <li><Link href="/pricing" className="a-muted">Pricing</Link></li>
            <li><Link href="/analytics" className="a-muted">Analytics (demo)</Link></li>
          </ul>
        </div>
        <div className="text-sm text-zinc-600">
          <div className="font-medium text-zinc-900">Resources</div>
          <ul className="mt-2 space-y-1">
            <li><Link href="/contact" className="a-muted">Contact</Link></li>
            <li><Link href="/changelog" className="a-muted">Changelog</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} subsapp. All rights reserved.
      </div>
    </footer>
  );
}
