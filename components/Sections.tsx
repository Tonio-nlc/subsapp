import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 pb-14">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Stop aux abonnements qui siphonnent votre argent.
          </h1>
          <p className="mt-4 text-zinc-600">
            Trop d'abonnements, pas de visibilité&nbsp;: chaque mois, vous perdez des euros.
            Centralisez, repérez doublons & hausses de prix, et coupez les fuites en minutes.
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/app" className="btn btn-blue px-5 py-2.5">Commencer gratuitement</Link>
            <Link href="/pricing" className="btn btn-ghost px-5 py-2.5">Voir les tarifs</Link>
          </div>
          <p className="mt-3 text-sm text-zinc-600">✓ 10 abonnements gratuits • Export JSON • Analytics incluses</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-blue-50 p-3 shadow-sm">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-white">
            <Image src="/hero-finance.svg" alt="Vue graphique des dépenses" fill priority sizes="(min-width: 768px) 560px, 100vw"/>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BenefitsStrip() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <div className="grid grid-cols-1 gap-4 text-sm text-zinc-700 md:grid-cols-3">
          {[
            ["✅","10 abonnements gratuits inclus"],
            ["📦","Export JSON (Free) • CSV/XLSX (Pro)"],
            ["📊","Analytics incluses (camemberts & barres)"],
          ].map(([icon,text]) => (
            <div key={text} className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
              <span aria-hidden className="text-base">{icon}</span><p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection({ title="Prêt à commencer ?" }:{title?:string}) {
  return (
    <section className="section-soft">
      <div className="mx-auto max-w-6xl px-6 py-14 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mt-2 text-zinc-700">Démarrez en quelques minutes. Gratuit jusqu'à 10 abonnements.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/app" className="btn btn-blue px-5 py-2.5">Commencer gratuitement</Link>
          <Link href="/features" className="btn btn-ghost px-5 py-2.5">Voir les fonctionnalités</Link>
        </div>
      </div>
    </section>
  );
}

