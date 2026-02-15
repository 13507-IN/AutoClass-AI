import AppLayout from "../components/AppLayout";
import GlassCard from "../components/GlassCard";
import StatCard from "../components/StatCard";
import { useAuth } from "../utils/AuthContext";

function formatDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "No upcoming dates";
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export default function DashboardPage() {
  const { activeClassroom, submissions } = useAuth();
  const assignments = activeClassroom?.assignments || [];
  const total = assignments.length;
  const submitted = assignments.filter((entry) => submissions[entry.id]).length;
  const pending = Math.max(0, total - submitted);
  const upcoming = assignments
    .filter((entry) => !submissions[entry.id])
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];

  return (
    <AppLayout title="Dashboard">
      <div className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Assignments" value={total} accent="accent" />
          <StatCard label="Pending Assignments" value={pending} accent="accent2" />
          <StatCard label="Submitted Assignments" value={submitted} accent="white" />
          <StatCard
            label="Upcoming Due Date"
            value={upcoming ? formatDate(upcoming.dueDate) : "None"}
            accent="accent"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <GlassCard className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Active Classroom</h2>
              <p className="text-sm text-white/60">
                {activeClassroom
                  ? `${activeClassroom.className} (${activeClassroom.classroomCode})`
                  : "Join a classroom to start generating submissions."}
              </p>
            </div>
            <div className="grid gap-3">
              {assignments.length === 0 && (
                <p className="text-sm text-white/50">No assignments loaded yet.</p>
              )}
              {assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3"
                >
                  <div>
                    <div className="text-sm font-medium">{assignment.title}</div>
                    <div className="text-xs text-white/60">Due {formatDate(assignment.dueDate)}</div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      submissions[assignment.id]
                        ? "bg-emerald-400/20 text-emerald-200"
                        : "bg-amber-400/20 text-amber-200"
                    }`}
                  >
                    {submissions[assignment.id] ? "Submitted" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="space-y-4">
            <h2 className="text-xl font-semibold">AI Activity</h2>
            <p className="text-sm text-white/60">
              AutoClass AI generates structured submissions, tracks deadlines, and
              prepares ready-to-submit drafts with a single click.
            </p>
            <div className="space-y-3">
              <div className="rounded-xl bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.3em] text-white/40">Efficiency</div>
                <div className="mt-2 text-2xl font-semibold">92% faster</div>
                <div className="text-xs text-white/60">Compared to manual drafting</div>
              </div>
              <div className="rounded-xl bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.3em] text-white/40">Accuracy</div>
                <div className="mt-2 text-2xl font-semibold">High confidence</div>
                <div className="text-xs text-white/60">Tailored to your department</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </AppLayout>
  );
}
