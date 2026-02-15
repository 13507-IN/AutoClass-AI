import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import AssignmentCard from "../components/AssignmentCard";
import GlassCard from "../components/GlassCard";
import Spinner from "../components/Spinner";
import { useAuth } from "../utils/AuthContext";
import { fetchClassroom } from "../utils/api";

export default function ClassroomsPage() {
  const { activeClassroom, setActiveClassroom, submissions, markSubmitted } = useAuth();
  const [code, setCode] = useState("");
  const [classroom, setClassroom] = useState(activeClassroom);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fallbackNote, setFallbackNote] = useState(false);

  useEffect(() => {
    if (activeClassroom) {
      setClassroom(activeClassroom);
      setCode(activeClassroom.classroomCode);
    }
  }, [activeClassroom]);

  const handleFetch = async () => {
    setLoading(true);
    setError("");
    setFallbackNote(false);

    const result = await fetchClassroom(code);
    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setClassroom(result.data);
    setActiveClassroom(result.data);
    setFallbackNote(Boolean(result.fallback));
    setLoading(false);
  };

  return (
    <AppLayout title="Classrooms">
      <div className="grid gap-6">
        <GlassCard className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Join a classroom</h2>
            <p className="text-sm text-white/60">
              Enter your classroom code to fetch assignments and generate AI submissions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <input
              className="input flex-1 min-w-[220px]"
              placeholder="Classroom code (e.g. CSE101)"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
            <button type="button" className="btn-primary" onClick={handleFetch}>
              {loading ? (
                <>
                  <Spinner /> Fetching
                </>
              ) : (
                "Fetch Assignments"
              )}
            </button>
          </div>
          {error && <div className="text-sm text-rose-200">{error}</div>}
          {fallbackNote && (
            <div className="text-xs text-white/50">
              Using local demo data (server not running).
            </div>
          )}
        </GlassCard>

        {classroom && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-semibold">{classroom.className}</h2>
                <p className="text-sm text-white/60">
                  Classroom code: <span className="mono">{classroom.classroomCode}</span>
                </p>
              </div>
              <span className="rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em]">
                {classroom.assignments.length} Assignments
              </span>
            </div>

            <div className="grid gap-5">
              {classroom.assignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  submitted={Boolean(submissions[assignment.id])}
                  onSubmit={markSubmitted}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
