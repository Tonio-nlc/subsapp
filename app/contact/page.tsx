import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact — subsapp",
  description: "Write to us for any question or suggestion.",
};

export default function ContactPage() {
  return (
    <main className="min-h-dvh bg-zinc-50">
      <Navbar />
      <section className="section section-pad">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Contact</h1>
        <p className="mt-2 text-zinc-600">Have an idea, a question, or a missing feature? Write to us:</p>

        <form className="mt-6 space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-zinc-900">Email</label>
            <input type="email" required className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-900">Message</label>
            <textarea rows={5} required className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900" />
          </div>
          <button type="submit" className="btn btn-blue px-5 py-2.5">
            Send
          </button>
          <p className="text-xs text-zinc-500">* Static form for now (add sending later).</p>
        </form>
      </section>
      <Footer />
    </main>
  );
}
