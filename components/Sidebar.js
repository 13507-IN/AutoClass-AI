import Link from "next/link";
import { useRouter } from "next/router";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Profile", href: "/profile" },
  { label: "Classrooms", href: "/classrooms" }
];

export default function Sidebar({ open, onClose, onLogout }) {
  const router = useRouter();

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <aside
        className={`glass fixed left-4 top-4 z-30 flex h-[calc(100vh-2rem)] w-64 flex-col justify-between rounded-3xl p-6 transition md:static md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-[110%]"
        }`}
      >
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
                  onClick={onClose}
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
      </aside>
    </>
  );
}
