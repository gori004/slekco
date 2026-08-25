"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const { items, increase, decrease, removeItem, total } = useCartStore();

  if (!items.length) {
    return (
      <section className="container-shell py-24 text-center">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-neutral-500">Your cart</p>
        <h1 className="mt-3 text-5xl font-black tracking-[-.06em]">Nothing here yet.</h1>
        <Link href="/shop" className="mt-8 inline-flex rounded-full bg-black px-6 py-3 font-bold text-white">
          Start shopping
        </Link>
      </section>
    );
  }

  const subtotal = total();

  return (
    <section className="container-shell py-10 md:py-14">
      <h1 className="text-5xl font-black tracking-[-.06em] md:text-7xl">Your cart</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-3xl bg-white p-4">
              <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[.14em] text-neutral-500">{item.brand}</p>
                    <h2 className="font-bold">{item.name}</h2>
                  </div>
                  <button onClick={() => removeItem(item.id)} aria-label="Remove item" className="p-1 text-neutral-500 hover:text-black">
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-full border border-black/10">
                    <button onClick={() => decrease(item.id)} className="p-2"><Minus size={14} /></button>
                    <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => increase(item.id)} className="p-2"><Plus size={14} /></button>
                  </div>
                  <strong>₹{(item.price * item.quantity).toLocaleString("en-IN")}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-3xl bg-black p-6 text-white">
          <h2 className="text-xl font-bold">Summary</h2>
          <div className="mt-7 space-y-4 text-sm">
            <div className="flex justify-between text-white/70"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
            <div className="flex justify-between text-white/70"><span>Shipping</span><span>Free</span></div>
            <div className="border-t border-white/15 pt-4 flex justify-between text-lg font-bold"><span>Total</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
          </div>
          <button className="mt-7 w-full rounded-full bg-[var(--accent)] px-5 py-3 font-bold text-black">Proceed to checkout</button>
        </aside>
      </div>
    </section>
  );
}