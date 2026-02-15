export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-accent/25 blur-[140px]" />
        <div className="absolute right-10 top-1/3 h-80 w-80 rounded-full bg-accent2/25 blur-[160px]" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 rounded-full bg-white/10 blur-[180px]" />
      </div>
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="glass w-full max-w-lg space-y-6 rounded-3xl p-8 shadow-soft">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">AutoClass AI</p>
            <h1 className="text-3xl font-semibold">{title}</h1>
            {subtitle && <p className="text-sm text-white/60">{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
