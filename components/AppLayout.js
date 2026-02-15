import { useEffect } from "react";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";
import { useAuth } from "../utils/AuthContext";

export default function AppLayout({ children, title }) {
  const { user, profile, logout, hydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!profile && router.pathname !== "/profile") {
      router.replace("/profile");
    }
  }, [hydrated, user, profile, router]);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/60">
        Loading AutoClass AI...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-accent/20 blur-[120px] animate-float" />
        <div className="absolute right-10 top-40 h-80 w-80 rounded-full bg-accent2/20 blur-[140px] animate-float" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-white/10 blur-[160px]" />
      </div>

      <div className="px-5 pb-16 pt-8 md:pl-72 md:pr-10">
        <Sidebar
          onLogout={() => {
            logout();
            router.push("/login");
          }}
        />

        <div className="flex-1">
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">AutoClass AI</p>
              <h1 className="text-3xl font-semibold">{title}</h1>
              {profile && (
                <p className="text-sm text-white/60">Welcome back, {profile.fullName}.</p>
              )}
            </div>
            <div className="flex items-center gap-3" />
          </header>

          {children}
        </div>
      </div>
    </div>
  );
}
