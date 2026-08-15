"use client";

import { useState } from "react";
import Constellation from "@/components/Constellation";

type Note = {
  title: string;
  tag: string;
  color: string;
};

const stats = [
  { label: "IDEAS", value: "24" },
  { label: "CONNECTIONS", value: "61" },
  { label: "ACTIVE", value: "07" },
];

const notes: Note[] = [
  {
    title: "The shape of unfinished ideas",
    tag: "THOUGHT",
    color: "#9b7cff",
  },
  {
    title: "Build interfaces that feel alive",
    tag: "DESIGN",
    color: "#4deeea",
  },
  {
    title: "A garden should grow, not organize",
    tag: "CONCEPT",
    color: "#b7ff4a",
  },
];

export default function Home() {
  const [active, setActive] = useState("VOID");

  return (
    <main className="min-h-screen overflow-hidden bg-[#050509] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[10%] top-[10%] h-96 w-96 rounded-full bg-violet-600/10 blur-[140px]" />

        <div className="absolute right-[5%] top-[35%] h-80 w-80 rounded-full bg-cyan-400/10 blur-[130px]" />

        <div className="absolute bottom-[-10%] left-[35%] h-96 w-96 rounded-full bg-lime-400/5 blur-[150px]" />

        <div className="stars" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1600px]">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 p-6 lg:block">
          <div className="mb-16">
            <p className="font-mono text-[10px] tracking-[0.35em] text-white/30">
              DIGITAL GARDEN
            </p>

            <h1 className="mt-2 text-xl font-semibold tracking-[-0.04em]">
              LUMA<span className="text-violet-400">//</span>VOID
            </h1>
          </div>

          <nav className="space-y-2" aria-label="Main navigation">
            {["VOID", "IDEAS", "NOTES", "ARCHIVE"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActive(item)}
                className={`w-full rounded-lg px-3 py-2 text-left font-mono text-xs tracking-widest transition ${
                  active === item
                    ? "bg-white/10 text-white"
                    : "text-white/35 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 font-mono text-[9px] tracking-widest text-white/20">
            SYSTEM // 001
          </div>
        </aside>

        {/* Main */}
        <section className="flex-1 px-5 py-6 sm:px-8 lg:px-12">
          {/* Header */}
          <header className="flex items-start justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-white/30">
                {active} / OVERVIEW
              </p>

              <h2 className="mt-2 text-3xl font-medium tracking-[-0.05em] sm:text-5xl">
                Your universe,
                <br />
                still forming.
              </h2>
            </div>

            <button
              type="button"
              className="group shrink-0 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-mono text-[10px] tracking-widest transition hover:border-violet-400/50 hover:bg-violet-400/10"
            >
              <span className="mr-2 text-violet-400">+</span>
              NEW IDEA
            </button>
          </header>

          {/* Interactive Constellation */}
          <section
            aria-label="Interactive idea constellation"
            className="relative mt-10 h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.015]"
          >
            <div className="absolute inset-0 grid-pattern" />

            <Constellation />

            <div className="pointer-events-none absolute bottom-5 left-5 font-mono text-[9px] tracking-[0.25em] text-white/25">
              LIVE CONSTELLATION
            </div>

            <div className="pointer-events-none absolute right-5 top-5 font-mono text-[9px] tracking-[0.25em] text-white/25">
              LIVE
              <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-lime-300 shadow-[0_0_10px_2px_rgba(183,255,74,.5)]" />
            </div>
          </section>

          {/* Statistics */}
          <section
            aria-label="Statistics"
            className="mt-6 grid grid-cols-3 gap-3"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
              >
                <p className="font-mono text-[9px] tracking-widest text-white/30">
                  {stat.label}
                </p>

                <p className="mt-2 text-2xl font-light">
                  {stat.value}
                </p>
              </div>
            ))}
          </section>

          {/* Recent signals */}
          <section className="mt-12">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-mono text-[10px] tracking-[0.3em] text-white/30">
                RECENT SIGNALS
              </p>

              <button
                type="button"
                className="font-mono text-[9px] tracking-widest text-white/30 transition hover:text-white"
              >
                VIEW ALL →
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {notes.map((note) => (
                <article
                  key={note.title}
                  className="group rounded-xl border border-white/10 bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.045]"
                >
                  <div
                    className="mb-10 h-1 w-8 rounded-full"
                    style={{
                      backgroundColor: note.color,
                      boxShadow: `0 0 15px ${note.color}`,
                    }}
                  />

                  <p className="font-mono text-[9px] tracking-[0.25em] text-white/30">
                    {note.tag}
                  </p>

                  <h3 className="mt-3 text-lg leading-snug tracking-[-0.025em] text-white/90">
                    {note.title}
                  </h3>

                  <div className="mt-8 flex justify-between font-mono text-[9px] text-white/20">
                    <span>NODE</span>
                    <span>→</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-16 border-t border-white/10 py-6">
            <p className="font-mono text-[9px] tracking-[0.25em] text-white/20">
              LUMA//VOID — AN OPEN DIGITAL GARDEN
            </p>
          </footer>
        </section>
      </div>
    </main>
  );
}
