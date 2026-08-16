"use client";

import Constellation from "@/components/Constellation";
import DashboardCard from "@/components/DashboardCard";
import DashboardNav from "@/components/DashboardNav";
import DashboardSidebar from "@/components/DashboardSidebar";

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

          <DashboardNav />
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

            {/* Dashboard cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <DashboardCard
                label="Nodes"
                value="--"
                accent="cyan"
              />

              <DashboardCard
                label="Status"
                value="ONLINE"
                accent="lime"
              />
            </div>
          </div>

          {/* Dashboard sidebar */}
          <DashboardSidebar
            connection="Stable"
            environment="Development"
          />
        </section>
      </div>
    </main>
  );
}
