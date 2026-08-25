export type Category =
  | "Fashion"
  | "Electronics"
  | "Home"
  | "Beauty"
  | "Accessories"
  | "Sports";

export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  category: Category;
  price: number;
  compareAtPrice?: number;
  rating: number;
  description: string;
  image: string;
  images: string[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "aero-runner",
    brand: "NOVA",
    name: "Aero Runner",
    category: "Sports",
    price: 8999,
    compareAtPrice: 10999,
    rating: 4.8,
    description: "A lightweight everyday runner with a responsive sole and breathable upper.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85"
    ],
    featured: true
  },
  {
    id: "2",
    slug: "studio-headphones",
    brand: "SONA",
    name: "Studio Headphones",
    category: "Electronics",
    price: 12999,
    rating: 4.9,
    description: "Immersive over-ear headphones with adaptive noise cancellation.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85"
    ],
    featured: true
  },
  {
    id: "3",
    slug: "linen-everyday-shirt",
    brand: "FORM",
    name: "Linen Everyday Shirt",
    category: "Fashion",
    price: 3499,
    rating: 4.6,
    description: "Relaxed linen tailoring designed for warm days and easy layering.",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85"
    ],
    featured: true
  },
  {
    id: "4",
    slug: "ceramic-table-set",
    brand: "ARC",
    name: "Ceramic Table Set",
    category: "Home",
    price: 2199,
    rating: 4.7,
    description: "Hand-finished ceramic pieces with a quiet, contemporary silhouette.",
    image: "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: "5",
    slug: "everyday-tote",
    brand: "MUSE",
    name: "Everyday Tote",
    category: "Accessories",
    price: 2799,
    rating: 4.5,
    description: "Structured carry-all with a soft handle and roomy interior.",
    image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=85"
    ]
  },
  {
    id: "6",
    slug: "daily-face-set",
    brand: "ALBA",
    name: "Daily Face Set",
    category: "Beauty",
    price: 1899,
    rating: 4.8,
    description: "A simple three-step skincare ritual for everyday use.",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85",
    images: [
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1200&q=85"
    ]
  }
];

export const categories = ["All", "Fashion", "Electronics", "Home", "Beauty", "Accessories", "Sports"] as const;