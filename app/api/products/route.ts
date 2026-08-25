import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/products";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search")?.toLowerCase() || "";
  const category = request.nextUrl.searchParams.get("category") || "All";

  const result = products.filter((product) => {
    const matchesSearch =
      !search ||
      product.name.toLowerCase().includes(search) ||
      product.brand.toLowerCase().includes(search);

    const matchesCategory = category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return NextResponse.json({ products: result, count: result.length });
}