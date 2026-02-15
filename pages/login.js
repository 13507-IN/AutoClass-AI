import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AuthLayout from "../components/AuthLayout";
import { useAuth } from "../utils/AuthContext";

export default function LoginPage() {
  const { login, user, hydrated } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (hydrated && user) {
      router.replace("/profile");
    }
  }, [hydrated, user, router]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(form.email.trim(), form.password.trim());
    if (!result.ok) {
      setError(result.message);
      return;
    }
    router.push("/profile");
  };

  return (
    <AuthLayout
      title="Sign in"
      subtitle="Access your AI-powered classroom dashboard"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>

      <div className="glass rounded-2xl p-4 text-sm text-white/70">
        <div className="text-xs uppercase tracking-[0.2em] text-white/50">Demo Login</div>
        <div className="mt-2 mono">student1@gmail.com</div>
        <div className="mono">123456</div>
      </div>

      <p className="text-sm text-white/60">
        New here?{" "}
        <Link className="text-accent hover:underline" href="/signup">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
