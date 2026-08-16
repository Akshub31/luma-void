"use client";

import { useState } from "react";

const navigation = ["Overview", "Nodes", "Activity"];

export default function DashboardNav() {
  const [active, setActive] = useState("Overview");

  return (
    <nav className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.03] p-1">
      {navigation.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setActive(item)}
          className={`rounded-md px-3 py-1.5 text-xs uppercase tracking-[0.15em] transition-all ${
            active === item
              ? "bg-cyan-400/10 text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.08)]"
              : "text-white/40 hover:bg-white/[0.04] hover:text-white/70"
          }`}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}
