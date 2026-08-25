"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useCartStore } from "@/store/cart-store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);
  const total = useCartStore((state) => state.total);

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const subtotal = total();

  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  async function handleCheckout() {
    if (items.length === 0) {
      setCheckoutMessage("Your cart is empty.");
      setCheckoutSuccess(false);
      return;
    }

    try {
      setCheckoutLoading(true);
      setCheckoutMessage("");
      setCheckoutSuccess(false);

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to create order."
        );
      }

      setCheckoutSuccess(true);

      setCheckoutMessage(
        `Order created successfully. Order ID: ${data.order.id}`
      );

      clear();
    } catch (error) {
      console.error("Checkout error:", error);

      setCheckoutSuccess(false);

      setCheckoutMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setCheckoutLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <section className="container-shell py-24 text-center">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-neutral-500">
          Shopping bag
        </p>

        <h1 className="mt-3 text-5xl font-black tracking-[-.06em] md:text-7xl">
          Your cart is empty.
        </h1>

        <p className="mx-auto mt-5 max-w-md text-neutral-500">
          Discover something you love and add it to your Slekco
          shopping bag.
        </p>

        <Link
          href="/shop"
          className="mt-8 inline-flex rounded-full bg-black px-7 py-3 font-bold text-white transition hover:opacity-80"
        >
          Start shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="container-shell py-10 md:py-14">
      {/* HEADER */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-neutral-500">
            Shopping bag
          </p>

          <h1 className="mt-2 text-5xl font-black tracking-[-.06em] md:text-7xl">
            Your cart
          </h1>
        </div>

        <span className="text-sm text-neutral-500">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </div>

      {/* MAIN */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* CART ITEMS */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-3xl bg-white p-4"
            >
              {/* IMAGE */}
              <Link
                href={`/products/${item.slug}`}
                className="relative h-32 w-28 shrink-0 overflow-hidden rounded-2xl bg-neutral-100 sm:h-36 sm:w-32"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              </Link>

              {/* INFO */}
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-[.14em] text-neutral-500">
                      {item.brand.name}
                    </p>

                    <Link href={`/products/${item.slug}`}>
                      <h2 className="mt-1 truncate font-bold hover:underline">
                        {item.name}
                      </h2>
                    </Link>

                    <p className="mt-1 text-sm text-neutral-500">
                      ₹{item.price.toLocaleString("en-IN")} each
                    </p>
                  </div>

                  {/* REMOVE */}
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="shrink-0 rounded-full p-2 text-neutral-500 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* QUANTITY */}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex items-center rounded-full border border-black/10">
                    <button
                      type="button"
                      onClick={() => decrease(item.id)}
                      className="p-2.5 transition hover:bg-black/5"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="w-8 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => increase(item.id)}
                      className="p-2.5 transition hover:bg-black/5"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* ITEM TOTAL */}
                  <strong className="text-sm sm:text-base">
                    ₹
                    {(item.price * item.quantity).toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <aside className="h-fit rounded-3xl bg-black p-6 text-white lg:sticky lg:top-24">
          <h2 className="text-xl font-bold">
            Order summary
          </h2>

          <div className="mt-7 space-y-4 text-sm">
            <div className="flex justify-between text-white/70">
              <span>Subtotal</span>

              <span>
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex justify-between text-white/70">
              <span>Shipping</span>

              <span>Free</span>
            </div>

            <div className="flex justify-between text-white/70">
              <span>Tax</span>

              <span>Included</span>
            </div>

            <div className="flex justify-between border-t border-white/15 pt-4 text-lg font-bold">
              <span>Total</span>

              <span>
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* CHECKOUT */}
          <button
            type="button"
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className="mt-7 w-full rounded-full bg-[var(--accent)] px-5 py-3 font-bold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {checkoutLoading
              ? "Creating order..."
              : "Proceed to checkout"}
          </button>

          {/* MESSAGE */}
          {checkoutMessage && (
            <div
              className={`mt-4 rounded-2xl p-4 text-sm ${
                checkoutSuccess
                  ? "bg-green-400/15 text-green-200"
                  : "bg-red-400/15 text-red-200"
              }`}
            >
              {checkoutMessage}
            </div>
          )}

          {/* CONTINUE SHOPPING */}
          <Link
            href="/shop"
            className="mt-5 block text-center text-sm text-white/60 underline underline-offset-4 transition hover:text-white"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}