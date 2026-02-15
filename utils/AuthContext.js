import { createContext, useContext, useEffect, useMemo, useState } from "react";
import usersSeed from "../data/users.json";

const AuthContext = createContext(null);
const STORAGE_KEY = "autoclass-ai-state";

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(usersSeed);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [activeClassroom, setActiveClassroom] = useState(null);
  const [submissions, setSubmissions] = useState({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUsers(parsed.users || usersSeed);
        setUser(parsed.user || null);
        setProfile(parsed.profile || null);
        setActiveClassroom(parsed.activeClassroom || null);
        setSubmissions(parsed.submissions || {});
      } catch (error) {
        console.error("Failed to load saved state", error);
      }
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === "undefined") {
      return;
    }

    const payload = {
      users,
      user,
      profile,
      activeClassroom,
      submissions
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [users, user, profile, activeClassroom, submissions, hydrated]);

  const login = (email, password) => {
    const found = users.find((entry) => entry.email === email && entry.password === password);
    if (!found) {
      return { ok: false, message: "Invalid email or password" };
    }

    setUser(found);
    return { ok: true };
  };

  const signup = ({ email, password, name }) => {
    if (users.some((entry) => entry.email === email)) {
      return { ok: false, message: "Email already registered" };
    }

    const nextId = users.reduce((max, entry) => Math.max(max, entry.id), 0) + 1;
    const newUser = { id: nextId, email, password, name };
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    setActiveClassroom(null);
    setSubmissions({});
  };

  const updateProfile = (profileData) => {
    setProfile(profileData);
  };

  const markSubmitted = (assignmentId) => {
    setSubmissions((prev) => ({
      ...prev,
      [assignmentId]: true
    }));
  };

  const value = useMemo(
    () => ({
      users,
      user,
      profile,
      activeClassroom,
      submissions,
      hydrated,
      login,
      signup,
      logout,
      updateProfile,
      setActiveClassroom,
      markSubmitted
    }),
    [users, user, profile, activeClassroom, submissions, hydrated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
