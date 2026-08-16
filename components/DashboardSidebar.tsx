type DashboardSidebarProps = {
  connection?: string;
  environment?: string;
};

export default function DashboardSidebar({
  connection = "Stable",
  environment = "Development",
}: DashboardSidebarProps) {
  return (
    <aside className="rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.25em] text-violet-400/70">
        System
      </p>

      <h2 className="mt-2 text-lg font-semibold text-white">
        Dashboard
      </h2>

      <div className="mt-6 space-y-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:bg-white/[0.05]">
          <span className="text-xs text-white/40">
            Connection
          </span>

          <p className="mt-1 text-sm text-white">
            {connection}
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:bg-white/[0.05]">
          <span className="text-xs text-white/40">
            Environment
          </span>

          <p className="mt-1 text-sm text-white">
            {environment}
          </p>
        </div>
      </div>
    </aside>
  );
}
