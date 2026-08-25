import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const search =
      request.nextUrl.searchParams.get("search")?.trim() || "";

    const category =
      request.nextUrl.searchParams.get("category") || "";

    const products = await prisma.product.findMany({
      where: {
        ...(search
          ? {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  brand: {
                    name: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
              ],
            }
          : {}),

        ...(category && category !== "All"
          ? {
              category: {
                name: category,
              },
            }
          : {}),
      },

      include: {
        brand: true,
        category: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      products,
      count: products.length,
    });
  } catch (error) {
    console.error("Products API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}