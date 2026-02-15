import GlassCard from "./GlassCard";

const accentMap = {
  accent: "bg-accent",
  accent2: "bg-accent2",
  white: "bg-white"
};

export default function StatCard({ label, value, accent = "accent" }) {
  const accentClass = accentMap[accent] || accentMap.accent;
  return (
    <GlassCard className="flex flex-col gap-4">
      <span className="text-sm text-white/60">{label}</span>
      <div className="flex items-end justify-between">
        <span className="text-3xl font-semibold">{value}</span>
        <span className={`h-3 w-3 rounded-full ${accentClass}`} />
      </div>
    </GlassCard>
  );
}
