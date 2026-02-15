import { useEffect, useState } from "react";

function getTimeLeft(targetDate) {
  const now = new Date();
  const target = new Date(targetDate);
  const diff = target - now;

  if (Number.isNaN(target.getTime())) {
    return { label: "Invalid date", isOverdue: false };
  }

  if (diff <= 0) {
    return { label: "Overdue", isOverdue: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return {
    label: `${days}d ${hours}h ${minutes}m`,
    isOverdue: false
  };
}

export default function Countdown({ dueDate }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(dueDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(dueDate));
    }, 1000 * 30);

    return () => clearInterval(interval);
  }, [dueDate]);

  return (
    <span
      className={`text-xs ${timeLeft.isOverdue ? "text-rose-300" : "text-white/70"}`}
    >
      {timeLeft.label}
    </span>
  );
}
