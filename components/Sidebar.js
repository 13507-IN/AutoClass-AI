import Link from "next/link";
import { useRouter } from "next/router";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Profile", href: "/profile" },
  { label: "Classrooms", href: "/classrooms" }
];

export default function Sidebar({ onLogout }) {
  const router = useRouter();

  return (
    <aside className="glass w-full rounded-3xl p-6 md:fixed md:left-6 md:top-6 md:z-30 md:h-[calc(100vh-3rem)] md:w-64">
      <div className="flex h-full flex-col justify-between gap-10">
        <div className="space-y-8">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-[0.3em] text-white/50">AutoClass</div>
            <div className="text-2xl font-semibold">AI Dashboard</div>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const active = router.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-white/20 text-white shadow-glow"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className={`h-2 w-2 rounded-full ${active ? "bg-accent" : "bg-white/30"}`} />
                </Link>
              );
            })}
          </nav>
        </div>

        <button type="button" className="btn-ghost w-full" onClick={onLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
