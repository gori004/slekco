"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="container-shell flex min-h-[70vh] items-center justify-center py-20">
      <div className="max-w-lg text-center">
        <p className="text-sm font-bold uppercase tracking-[.2em] text-neutral-500">
          Something went wrong
        </p>

        <h1 className="mt-3 text-5xl font-black tracking-[-.06em] md:text-7xl">
          Let's try that again.
        </h1>

        <p className="mt-5 text-neutral-500">
          We couldn't load this page right now.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 rounded-full bg-black px-6 py-3 font-bold text-white"
        >
          Try again
        </button>
      </div>
    </main>
  );
}