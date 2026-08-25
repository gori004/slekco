"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/store/cart-store";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="group">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="card-image object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {product.compareAtPrice && (
            <span className="absolute left-3 top-3 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold">
              SALE
            </span>
          )}
        </div>
      </Link>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/products/${product.slug}`} className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[.14em] text-neutral-500">
              {product.brand}
            </p>
            <h3 className="mt-1 truncate font-semibold">{product.name}</h3>
          </Link>

          <button
            onClick={() => addItem(product)}
            className="shrink-0 rounded-full border border-black/15 p-2 transition hover:bg-black hover:text-white"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={16} />
          </button>
        </div>

        <div className="mt-2 flex items-center gap-2 text-sm">
          <span className="font-semibold">₹{product.price.toLocaleString("en-IN")}</span>
          {product.compareAtPrice && (
            <span className="text-neutral-400 line-through">
              ₹{product.compareAtPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}