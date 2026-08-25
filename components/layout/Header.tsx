"use client";

import Link from "next/link";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export function Header() {
  const count = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f6f2]/90 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-[-0.06em]">SLEKCO</Link>

        <nav className="hidden gap-7 text-sm font-medium md:flex">
          <Link href="/shop" className="hover:opacity-60">Shop</Link>
          <Link href="/shop?category=Fashion" className="hover:opacity-60">Fashion</Link>
          <Link href="/shop?category=Electronics" className="hover:opacity-60">Electronics</Link>
          <Link href="/shop?category=Home" className="hover:opacity-60">Home</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/shop" aria-label="Search" className="rounded-full p-2 hover:bg-black/5">
            <Search size={19} />
          </Link>
          <Link href="/cart" className="relative rounded-full p-2 hover:bg-black/5" aria-label="Cart">
            <ShoppingBag size={19} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button className="rounded-full p-2 md:hidden" aria-label="Menu">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}