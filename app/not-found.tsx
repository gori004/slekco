import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-shell flex min-h-[70vh] items-center justify-center py-20">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[.2em] text-neutral-500">
          404
        </p>

        <h1 className="mt-3 text-6xl font-black tracking-[-.06em] md:text-8xl">
          Lost in the shop.
        </h1>

        <p className="mx-auto mt-5 max-w-md text-neutral-500">
          The page you're looking for doesn't exist or has moved.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-black px-6 py-3 font-bold text-white"
          >
            Go home
          </Link>

          <Link
            href="/shop"
            className="rounded-full border border-black/10 bg-white px-6 py-3 font-bold"
          >
            Browse shop
          </Link>
        </div>
      </div>
    </main>
  );
}