type DashboardCardProps = {
  label: string;
  value: string;
  accent?: "cyan" | "violet" | "lime";
};

const accentStyles = {
  cyan: {
    label: "text-cyan-400/70",
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.08)]",
  },
  violet: {
    label: "text-violet-400/70",
    glow: "shadow-[0_0_20px_rgba(167,139,250,0.08)]",
  },
  lime: {
    label: "text-lime-400/70",
    glow: "shadow-[0_0_20px_rgba(163,230,53,0.08)]",
  },
};

export default function DashboardCard({
  label,
  value,
  accent = "cyan",
}: DashboardCardProps) {
  const styles = accentStyles[accent];

  return (
    <div
      className={`rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05] ${styles.glow}`}
    >
      <p
        className={`text-xs uppercase tracking-[0.2em] ${styles.label}`}
      >
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold tracking-tight text-white">
        {value}
      </p>
    </div>
  );
}
