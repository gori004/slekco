import Image from "next/image";
import Link from "next/link";

import { ContactForm } from "@/components/contact/ContactForm";
import { ProductGrid } from "@/components/products/ProductGrid";
import { prisma } from "@/lib/prisma";

const categoryCards = [
  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Home",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85",
  },
];

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: {
      featured: true,
    },
    include: {
      brand: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });

  return (
    <main>
      {/* HERO */}
      <section className="container-shell py-8 md:py-12">
        <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] bg-black text-white">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=90"
            alt="Slekco ecommerce collection"
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />

          <div className="relative flex min-h-[560px] max-w-2xl flex-col justify-end p-7 md:p-12">
            <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-white/70">
              The Slekco edit
            </p>

            <h1 className="text-5xl font-black leading-[.95] tracking-[-.06em] md:text-8xl">
              Everything worth having.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-white/75">
              A curated marketplace for fashion, technology, home,
              beauty and the everyday objects that make life better.
            </p>

            <div className="mt-8">
              <Link
                href="/shop"
                className="inline-flex rounded-full bg-[var(--accent)] px-6 py-3 font-bold text-black transition hover:opacity-90"
              >
                Shop new arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-shell py-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-neutral-500">
            Browse
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-[-.04em] md:text-5xl">
            Shop by category
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {categoryCards.map((category) => (
            <Link
              key={category.name}
              href={`/shop?category=${encodeURIComponent(
                category.name
              )}`}
              className="group relative aspect-[.85] overflow-hidden rounded-2xl bg-black"
            >
              <Image
                src={category.image}
                alt={`${category.name} collection`}
                fill
                className="object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-75"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-14 text-white">
                <span className="text-xl font-bold">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container-shell py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-neutral-500">
              Selected for you
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-[-.04em] md:text-5xl">
              Featured
            </h2>
          </div>

          <Link
            href="/shop"
            className="text-sm font-bold underline underline-offset-4"
          >
            View all
          </Link>
        </div>

        <div className="mt-8">
          {featuredProducts.length > 0 ? (
            <ProductGrid products={featuredProducts} />
          ) : (
            <div className="rounded-3xl bg-white p-10 text-center text-neutral-500">
              No featured products available.
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER / CONTACT */}
      <section className="container-shell py-16">
        <div className="rounded-[2rem] bg-[#deddd8] px-7 py-14 text-center md:px-16">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-neutral-500">
            Stay in the loop
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-[-.05em] md:text-6xl">
            Good things, occasionally.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-neutral-600">
            New drops, useful finds and the occasional Slekco edit.
          </p>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}