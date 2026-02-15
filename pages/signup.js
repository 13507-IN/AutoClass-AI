import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../utils/AuthContext";

export default function SignupPage() {
  const { signup, user, hydrated } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (hydrated && user) {
      router.replace("/profile");
    }
  }, [hydrated, user, router]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = signup({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password.trim()
    });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    router.push("/profile");
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start auto-generating submissions in minutes"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Full name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
          required
        />
        {error && <div className="text-sm text-rose-200">{error}</div>}
        <button type="submit" className="btn-primary w-full">
          Sign up
        </button>
      </form>

      <p className="text-sm text-white/60">
        Already have an account?{" "}
        <Link className="text-accent hover:underline" href="/login">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
