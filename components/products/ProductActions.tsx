"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/store/cart-store";

export function ProductActions({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  function add() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <div className="mt-8">
      <button onClick={add} className="w-full rounded-full bg-black px-6 py-4 font-bold text-white transition hover:opacity-80">
        {added ? "Added to cart ✓" : "Add to cart"}
      </button>
    </div>
  );
}