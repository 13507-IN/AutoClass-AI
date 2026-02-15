import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../utils/AuthContext";

export default function Home() {
  const { user, profile, hydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!profile) {
      router.replace("/profile");
      return;
    }

    router.replace("/dashboard");
  }, [hydrated, user, profile, router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white/60">
      Launching AutoClass AI...
    </div>
  );
}
