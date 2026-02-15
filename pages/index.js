import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import GlassCard from "../components/GlassCard";
import { useAuth } from "../utils/AuthContext";

export default function Home() {
  const { user, profile, hydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!user) {
      return;
    }

    if (!profile) {
      router.replace("/profile");
      return;
    }

    router.replace("/dashboard");
  }, [hydrated, user, profile, router]);

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/60">
        Launching AutoClass AI...
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-10 top-16 h-72 w-72 rounded-full bg-accent/30 blur-[150px]" />
        <div className="absolute right-10 top-24 h-80 w-80 rounded-full bg-accent2/30 blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-white/10 blur-[180px]" />
      </div>

      <header className="flex items-center justify-between px-6 py-6 md:px-12">
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-[0.4em] text-white/50">AutoClass AI</div>
          <div className="text-2xl font-semibold">AutoClass AI</div>
        </div>
        <div className="flex items-center gap-3">
          <Link className="btn-ghost" href="/login">
            Sign in
          </Link>
          <Link className="btn-primary" href="/signup">
            Get started
          </Link>
        </div>
      </header>

      <main className="px-6 pb-20 pt-8 md:px-12">
        <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60">
              AI Classroom Companion
            </div>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Automate classroom submissions with intelligent drafting and instant
              tracking.
            </h1>
            <p className="text-base text-white/70">
              AutoClass AI simulates Google Classroom workflows so students can log in,
              join classes, generate assignments with AI, and submit in seconds.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link className="btn-primary" href="/signup">
                Create your account
              </Link>
              <Link className="btn-secondary" href="/login">
                Access dashboard
              </Link>
            </div>
          </div>

          <GlassCard className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-white/50">
                Live Demo Flow
              </div>
              <h2 className="text-2xl font-semibold">From login to submission</h2>
            </div>
            <div className="space-y-3 text-sm text-white/70">
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span>Step 1</span>
                <span className="text-white">Complete profile</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span>Step 2</span>
                <span className="text-white">Join classroom code</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span>Step 3</span>
                <span className="text-white">Generate AI submission</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                <span>Step 4</span>
                <span className="text-white">Submit with one click</span>
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Smart drafting",
              text: "Generate 400-600 word submissions tailored to each assignment prompt."
            },
            {
              title: "Real-time tracking",
              text: "Monitor pending and submitted work with countdowns and status chips."
            },
            {
              title: "Glassmorphism UI",
              text: "Modern, dark dashboard with smooth interactions and responsive design."
            }
          ].map((item) => (
            <GlassCard key={item.title} className="space-y-3">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-white/60">{item.text}</p>
            </GlassCard>
          ))}
        </section>
      </main>
    </div>
  );
}
