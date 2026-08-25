"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setSuccess(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const firstError = data.errors
          ? Object.values(data.errors).flat()[0]
          : data.message;

        throw new Error(
          String(firstError || "Something went wrong.")
        );
      }

      setSuccess(true);
      setMessage(data.message);
      form.reset();
    } catch (error) {
      setSuccess(false);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-7 max-w-lg space-y-3"
    >
      <input
        name="name"
        type="text"
        required
        minLength={2}
        maxLength={80}
        placeholder="Your name"
        className="w-full rounded-full border border-black/10 bg-white px-5 py-3 outline-none focus:border-black"
      />

      <input
        name="email"
        type="email"
        required
        placeholder="you@example.com"
        className="w-full rounded-full border border-black/10 bg-white px-5 py-3 outline-none focus:border-black"
      />

      <textarea
        name="message"
        required
        minLength={10}
        maxLength={1000}
        placeholder="How can we help?"
        rows={4}
        className="w-full rounded-2xl border border-black/10 bg-white px-5 py-3 outline-none focus:border-black"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-black px-5 py-3 font-bold text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send message"}
      </button>

      {message && (
        <p
          className={`text-center text-sm ${
            success ? "text-green-700" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}