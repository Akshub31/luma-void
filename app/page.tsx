"use client";

import Constellation from "@/components/Constellation";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* Animated constellation background */}
      <div className="fixed inset-0 -z-10">
        <Constellation />
      </div>

      {/* Dashboard */}
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-white/10 bg-black/20 px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            <span className="text-sm font-semibold tracking-[0.3em]">
              LUMA//VOID
            </span>
          </div>

          <div className="text-xs uppercase tracking-[0.2em] text-white/40">
            Dashboard
          </div>
        </header>

        {/* Main dashboard area */}
        <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-[1fr_320px]">
          {/* Main panel */}
          <div className="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-400/70">
                Neural Interface
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                Welcome to the Void
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
                Explore the constellation and discover connected nodes across
                your LUMA//VOID workspace.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-widest text-white/40">
                  Nodes
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">--</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-widest text-white/40">
                  Status
                </p>
                <p className="mt-2 text-sm font-medium text-emerald-400">
                  ONLINE
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.25em] text-violet-400/70">
              System
            </p>

            <h2 className="mt-2 text-lg font-semibold text-white">
              Dashboard
            </h2>

            <div className="mt-6 space-y-3">
              <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="text-xs text-white/40">Connection</span>
                <p className="mt-1 text-sm text-white">Stable</p>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="text-xs text-white/40">Environment</span>
                <p className="mt-1 text-sm text-white">Development</p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
