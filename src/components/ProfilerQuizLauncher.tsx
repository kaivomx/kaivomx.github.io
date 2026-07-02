"use client";

import { useState } from "react";
import ProfilerQuiz from "./ProfilerQuiz";

export default function ProfilerQuizLauncher({ className, children }: { className?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      {open && <ProfilerQuiz onClose={() => setOpen(false)} />}
    </>
  );
}
