import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductActions } from "@/components/products/ProductActions";
import { products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) notFound();

  return (
    <section className="container-shell py-10 md:py-14">
      <Link href="/shop" className="text-sm font-medium text-neutral-500 hover:text-black">← Back to shop</Link>

      <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_.9fr] md:items-start">
        <div className="grid grid-cols-2 gap-3">
          {product.images.map((image, index) => (
            <div key={image} className={`relative overflow-hidden rounded-3xl bg-white ${index === 0 ? "col-span-2 aspect-[1.2]" : "aspect-square"}`}>
              <Image src={image} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 60vw" />
            </div>
          ))}
        </div>

        <div className="md:sticky md:top-24">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-neutral-500">{product.brand}</p>
          <h1 className="mt-2 text-4xl font-black tracking-[-.05em] md:text-6xl">{product.name}</h1>
          <div className="mt-4 flex gap-3">
            <span className="text-lg font-semibold">₹{product.price.toLocaleString("en-IN")}</span>
            {product.compareAtPrice && <span className="text-neutral-400 line-through">₹{product.compareAtPrice.toLocaleString("en-IN")}</span>}
          </div>
          <p className="mt-7 leading-7 text-neutral-600">{product.description}</p>
          <ProductActions product={product} />
          <div className="mt-8 border-t border-black/10 pt-6 text-sm leading-6 text-neutral-600">
            <p><strong className="text-black">Shipping:</strong> Free shipping on eligible orders.</p>
            <p className="mt-2"><strong className="text-black">Returns:</strong> Easy returns within 14 days.</p>
          </div>
        </div>
      </div>
    </section>
  );
}