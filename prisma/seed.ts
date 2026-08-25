import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

const categories = [
  { name: "Fashion", slug: "fashion" },
  { name: "Electronics", slug: "electronics" },
  { name: "Home", slug: "home" },
  { name: "Beauty", slug: "beauty" },
  { name: "Accessories", slug: "accessories" },
  { name: "Sports", slug: "sports" },
];

const brands = [
  { name: "NOVA", slug: "nova" },
  { name: "SONA", slug: "sona" },
  { name: "FORM", slug: "form" },
  { name: "ARC", slug: "arc" },
  { name: "MUSE", slug: "muse" },
  { name: "ALBA", slug: "alba" },
];

const products = [
  {
    name: "Aero Runner",
    slug: "aero-runner",
    brand: "NOVA",
    category: "Sports",
    price: 8999,
    compareAtPrice: 10999,
    stock: 25,
    rating: 4.8,
    featured: true,
    description:
      "A lightweight everyday runner with a responsive sole and breathable upper.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    name: "Studio Headphones",
    slug: "studio-headphones",
    brand: "SONA",
    category: "Electronics",
    price: 12999,
    stock: 18,
    rating: 4.9,
    featured: true,
    description:
      "Immersive over-ear headphones with adaptive noise cancellation.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    name: "Linen Everyday Shirt",
    slug: "linen-everyday-shirt",
    brand: "FORM",
    category: "Fashion",
    price: 3499,
    stock: 40,
    rating: 4.6,
    featured: true,
    description:
      "Relaxed linen tailoring designed for warm days and easy layering.",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    name: "Ceramic Table Set",
    slug: "ceramic-table-set",
    brand: "ARC",
    category: "Home",
    price: 2199,
    stock: 30,
    rating: 4.7,
    description:
      "Hand-finished ceramic pieces with a quiet, contemporary silhouette.",
    image:
      "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    name: "Everyday Tote",
    slug: "everyday-tote",
    brand: "MUSE",
    category: "Accessories",
    price: 2799,
    stock: 35,
    rating: 4.5,
    description:
      "Structured carry-all with a soft handle and roomy interior.",
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85",
    ],
  },
  {
    name: "Daily Face Set",
    slug: "daily-face-set",
    brand: "ALBA",
    category: "Beauty",
    price: 1899,
    stock: 50,
    rating: 4.8,
    description:
      "A simple three-step skincare ritual for everyday use.",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1200&q=85",
    ],
  },
];

async function main() {
  console.log("Seeding Slekco database...");

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
  }

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: brand,
    });
  }

  for (const product of products) {
    const brand = await prisma.brand.findUniqueOrThrow({
      where: { slug: product.brand.toLowerCase() },
    });

    const category = await prisma.category.findUniqueOrThrow({
      where: { slug: product.category.toLowerCase() },
    });

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        stock: product.stock,
        rating: product.rating,
        featured: product.featured,
        description: product.description,
        image: product.image,
        images: product.images,
        brandId: brand.id,
        categoryId: category.id,
      },
      create: {
        name: product.name,
        slug: product.slug,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        stock: product.stock,
        rating: product.rating,
        featured: product.featured,
        description: product.description,
        image: product.image,
        images: product.images,
        brandId: brand.id,
        categoryId: category.id,
      },
    });
  }

  console.log("Slekco database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });