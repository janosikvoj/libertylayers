"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InactivityTimer() {
  const router = useRouter();

  useEffect(() => {
    // Only run in exhibition mode to avoid annoying online users
    if (process.env.NEXT_PUBLIC_EXHIBITION_MODE !== "true") return;

    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => {
          window.location.href = "/";
        },
        // 5 minutes = 300000 milliseconds
        300000,
      );
    };

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    resetTimer();
    events.forEach((event) => document.addEventListener(event, resetTimer));

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) =>
        document.removeEventListener(event, resetTimer),
      );
    };
  }, [router]);

  return null;
}
