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
  const [showPassword, setShowPassword] = useState(false);

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
        <div className="relative">
          <input
            className="input pr-20"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/60 hover:text-white"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {error && <div className="text-sm text-rose-200">{error}</div>}
        <button type="submit" className="btn-primary w-full">
          Login
        </button>
      </form>

      <div className="flex items-center gap-3 text-xs text-white/40">
        <span className="h-px flex-1 bg-white/10" />
        or
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <button
        type="button"
        className="btn-secondary w-full"
        onClick={() => setError("Google sign-in is simulated in this demo.")}
      >
        Sign in with Google
      </button>

      <p className="text-sm text-white/60">
        New here?{" "}
        <Link className="text-accent hover:underline" href="/signup">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
