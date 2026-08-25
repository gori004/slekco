"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/store/cart-store";

type Props = {
  product: Product;
};

export function ProductActions({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className={`w-full rounded-full px-6 py-4 font-bold transition ${
          product.stock === 0
            ? "cursor-not-allowed bg-neutral-300 text-neutral-500"
            : added
              ? "bg-[var(--accent)] text-black"
              : "bg-black text-white hover:opacity-80"
        }`}
      >
        {product.stock === 0
          ? "Out of stock"
          : added
            ? "Added to cart ✓"
            : "Add to cart"}
      </button>
    </div>
  );
}