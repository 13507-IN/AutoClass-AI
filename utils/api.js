import classrooms from "../data/classrooms.json";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export async function fetchClassroom(code) {
  const normalized = code.trim().toUpperCase();
  if (!normalized) {
    return { error: "Enter a classroom code" };
  }

  try {
    const response = await fetch(`${API_BASE}/api/classrooms/${normalized}`);
    if (!response.ok) {
      throw new Error("Classroom not found");
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    const fallback = classrooms.find(
      (entry) => entry.classroomCode.toUpperCase() === normalized
    );
    if (!fallback) {
      return { error: "Classroom not found" };
    }
    return { data: fallback, fallback: true };
  }
}
