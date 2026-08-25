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
  name: string;

  brand: {
    id: string;
    name: string;
    slug: string;
    logo?: string | null;
  };

  category: {
    id: string;
    name: string;
    slug: string;
  };

  price: number;
  compareAtPrice?: number | null;
  stock?: number;
  rating: number;
  description: string;
  image: string;
  images: string[];
  featured?: boolean;
};

export const categories = [
  "All",
  "Fashion",
  "Electronics",
  "Home",
  "Beauty",
  "Accessories",
  "Sports",
] as const;