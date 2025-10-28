"use client";
import Link from "next/link";
import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur">
      <div className="section flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-zinc-900 hover:opacity-90">
          subsapp
        </Link>
        <div className="flex items-center gap-5">
          <nav className="hidden items-center gap-5 md:flex">
            <Link href="/features" className="a-muted text-sm">Features</Link>
            <Link href="/pricing"  className="a-muted text-sm">Pricing</Link>
            <Link href="/contact"  className="a-muted text-sm">Contact</Link>
          </nav>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn btn-ghost text-sm">Login / Sign up</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
