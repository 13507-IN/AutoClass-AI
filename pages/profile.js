import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AppLayout from "../components/AppLayout";
import GlassCard from "../components/GlassCard";
import { useAuth } from "../utils/AuthContext";

export default function ProfilePage() {
  const { profile, updateProfile } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    rollNumber: "",
    department: "",
    year: "",
    collegeName: ""
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm(profile);
    }
  }, [profile]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => router.push("/dashboard"), 700);
  };

  return (
    <AppLayout title="Profile Setup">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <GlassCard>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              className="input"
              placeholder="Full Name"
              value={form.fullName}
              onChange={(event) => setForm({ ...form, fullName: event.target.value })}
              required
            />
            <input
              className="input"
              placeholder="Roll Number"
              value={form.rollNumber}
              onChange={(event) => setForm({ ...form, rollNumber: event.target.value })}
              required
            />
            <input
              className="input"
              placeholder="Department"
              value={form.department}
              onChange={(event) => setForm({ ...form, department: event.target.value })}
              required
            />
            <input
              className="input"
              placeholder="Year"
              value={form.year}
              onChange={(event) => setForm({ ...form, year: event.target.value })}
              required
            />
            <input
              className="input"
              placeholder="College Name"
              value={form.collegeName}
              onChange={(event) => setForm({ ...form, collegeName: event.target.value })}
              required
            />
            <button type="submit" className="btn-primary w-full">
              Save Profile
            </button>
            {saved && <div className="text-sm text-emerald-200">Profile saved.</div>}
          </form>
        </GlassCard>

        <GlassCard className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Why we need this</h2>
            <p className="text-sm text-white/60">
              AutoClass AI uses your profile to tailor submissions, format headers,
              and auto-tag department-specific language. Everything is stored locally
              in your browser for this demo.
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Status</span>
              <span className="text-emerald-200">Secure local profile</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Storage</span>
              <span className="mono">Local state</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </AppLayout>
  );
}
