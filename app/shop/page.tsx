"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { ProductGrid } from "@/components/products/ProductGrid";
import type { Product } from "@/lib/products";

const categories = ["All", "Fashion", "Electronics", "Home", "Beauty", "Accessories", "Sports"];

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category !== "All") params.set("category", category);

    setLoading(true);
    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .finally(() => setLoading(false));
  }, [search, category]);

  const title = useMemo(() => category === "All" ? "Shop everything" : category, [category]);

  return (
    <section className="container-shell py-10 md:py-14">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.2em] text-neutral-500">Discover</p>
        <h1 className="mt-2 text-5xl font-black tracking-[-.06em] md:text-7xl">{title}</h1>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-y border-black/10 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold ${category === item ? "bg-black text-white" : "bg-white hover:bg-black/5"}`}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="flex w-full items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 md:w-72">
          <Search size={17} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products"
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
      </div>

      <div className="mt-8 flex items-center justify-between text-sm text-neutral-500">
        <span>{loading ? "Loading..." : `${products.length} products`}</span>
        <button className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 font-medium">
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      <div className="mt-6">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}