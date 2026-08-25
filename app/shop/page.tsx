"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { ProductGrid } from "@/components/products/ProductGrid";
import type { Product } from "@/lib/products";

const categories = [
  "All",
  "Fashion",
  "Electronics",
  "Home",
  "Beauty",
  "Accessories",
  "Sports",
];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchProducts(
    searchValue = search,
    categoryValue = category
  ) {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (searchValue.trim()) {
        params.set("search", searchValue.trim());
      }

      if (categoryValue !== "All") {
        params.set("category", categoryValue);
      }

      const query = params.toString();

      const response = await fetch(
        `/api/products${query ? `?${query}` : ""}`,
        {
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data = await response.json();

      setProducts(data.products ?? []);
    } catch (err) {
      console.error("Shop API error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load products."
      );

      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts("", "All");
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(search, category);
    }, 350);

    return () => clearTimeout(timer);
  }, [search, category]);

  function handleCategoryChange(value: string) {
    setCategory(value);
  }

  function clearFilters() {
    setSearch("");
    setCategory("All");
  }

  const hasFilters = search.trim() || category !== "All";

  const resultText = useMemo(() => {
    if (loading) return "Loading...";
    if (products.length === 0) return "No products found";
    return `${products.length} ${
      products.length === 1 ? "product" : "products"
    }`;
  }, [loading, products.length]);

  return (
    <section className="container-shell py-10 md:py-14">
      {/* HEADER */}
      <div className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-neutral-500">
          Slekco shop
        </p>

        <h1 className="mt-3 text-5xl font-black tracking-[-.06em] md:text-7xl">
          Find your next favorite.
        </h1>

        <p className="mt-5 max-w-2xl text-neutral-500">
          Explore fashion, electronics, home, beauty, accessories
          and more from our curated collection.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="mt-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* CATEGORIES */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => {
              const active = category === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleCategoryChange(item)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-black/5"
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* SEARCH */}
          <label className="flex w-full items-center gap-3 rounded-full border border-black/10 bg-white px-4 py-3 lg:max-w-sm">
            <Search size={18} className="shrink-0 text-neutral-500" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent text-sm outline-none"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </label>
        </div>

        {/* ACTIVE FILTERS */}
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-neutral-500">
            <SlidersHorizontal size={16} />
            <span>{resultText}</span>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-semibold underline underline-offset-4"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mt-8 rounded-2xl bg-red-50 p-5 text-sm text-red-700">
          <p className="font-semibold">
            Something went wrong
          </p>

          <p className="mt-1">{error}</p>

          <button
            type="button"
            onClick={() => fetchProducts(search, category)}
            className="mt-3 rounded-full bg-black px-4 py-2 text-xs font-bold text-white"
          >
            Try again
          </button>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index}>
              <div className="aspect-[4/5] animate-pulse rounded-2xl bg-neutral-200" />

              <div className="mt-4 h-3 w-20 animate-pulse rounded bg-neutral-200" />

              <div className="mt-2 h-5 w-32 animate-pulse rounded bg-neutral-200" />

              <div className="mt-2 h-4 w-16 animate-pulse rounded bg-neutral-200" />
            </div>
          ))}
        </div>
      )}

      {/* PRODUCTS */}
      {!loading && !error && products.length > 0 && (
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && products.length === 0 && (
        <div className="mt-8 rounded-[2rem] bg-white px-6 py-20 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
            <Search size={22} />
          </div>

          <h2 className="mt-5 text-2xl font-bold">
            No products found
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500">
            Try another search term or browse a different category.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-bold text-white"
          >
            View all products
          </button>
        </div>
      )}
    </section>
  );
}