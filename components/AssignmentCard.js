import { useCallback, useMemo, useState } from "react";
import Countdown from "./Countdown";
import GlassCard from "./GlassCard";
import ProgressBar from "./ProgressBar";
import Spinner from "./Spinner";
import TypingText from "./TypingText";
import { generateSubmission } from "../utils/ai";

function formatDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export default function AssignmentCard({ assignment, submitted, onSubmit }) {
  const [aiStatus, setAiStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [aiText, setAiText] = useState("");
  const [submitState, setSubmitState] = useState("idle");

  const badge = useMemo(() => {
    if (submitted) {
      return "Submitted";
    }
    return "Pending";
  }, [submitted]);

  const handleTypingComplete = useCallback(() => {
    setAiStatus("ready");
  }, []);

  const handleGenerate = () => {
    if (submitted) {
      return;
    }

    setAiStatus("processing");
    setProgress(0);
    setAiText("");

    const finalText = generateSubmission(assignment);
    let current = 0;

    const interval = setInterval(() => {
      current = Math.min(100, current + Math.random() * 18 + 6);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setAiText(finalText);
        setAiStatus("typing");
      }
    }, 140);
  };

  const handleSubmit = () => {
    if (!aiText || submitted) {
      return;
    }

    setSubmitState("loading");

    setTimeout(() => {
      onSubmit(assignment.id);
      setSubmitState("success");
    }, 1200);
  };

  return (
    <GlassCard className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{assignment.title}</h3>
          <p className="text-sm text-white/60">{assignment.description}</p>
        </div>
        <div className="text-right">
          <div className="text-xs uppercase tracking-widest text-white/50">Due</div>
          <div className="text-sm font-medium">{formatDate(assignment.dueDate)}</div>
          <Countdown dueDate={assignment.dueDate} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            submitted ? "bg-emerald-400/20 text-emerald-200" : "bg-amber-400/20 text-amber-200"
          }`}
        >
          Status: {badge}
        </span>
        {submitState === "success" && (
          <span className="text-xs text-emerald-200">? Assignment submitted successfully!</span>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleGenerate}
            disabled={aiStatus === "processing" || submitted}
          >
            {aiStatus === "processing" ? "AI Working..." : "Generate AI Submission"}
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={handleSubmit}
            disabled={!aiText || submitted || submitState === "loading"}
          >
            {submitState === "loading" ? (
              <>
                <Spinner /> Submitting
              </>
            ) : (
              "Submit Assignment"
            )}
          </button>
        </div>

        {aiStatus === "processing" && (
          <div className="space-y-2">
            <div className="text-xs text-white/60">AI processing progress</div>
            <ProgressBar value={progress} />
          </div>
        )}

        {aiText && (
          <div className="glass rounded-xl p-4">
            <div className="flex items-center justify-between pb-2 text-xs text-white/60">
              <span>AI Draft</span>
              <span className="mono">AutoClass AI</span>
            </div>
            <TypingText text={aiText} speed={10} onComplete={handleTypingComplete} />
          </div>
        )}
      </div>
    </GlassCard>
  );
}
