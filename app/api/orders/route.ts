import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const orderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().positive(),
      })
    )
    .min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = orderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Invalid order data",
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { items } = result.data;

    const productIds = items.map((item) => item.productId);

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
        stock: true,
      },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        {
          message: "One or more products no longer exist.",
        },
        { status: 404 }
      );
    }

    for (const item of items) {
      const product = products.find(
        (product) => product.id === item.productId
      );

      if (!product) {
        return NextResponse.json(
          {
            message: "Product not found.",
          },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          {
            message: `${product.name} does not have enough stock.`,
          },
          { status: 400 }
        );
      }
    }

    const orderItems = items.map((item) => {
      const product = products.find(
        (product) => product.id === item.productId
      )!;

      return {
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      };
    });

    const subtotal = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          subtotal,
          total: subtotal,
          items: {
            create: orderItems,
          },
        },
        include: {
          items: true,
        },
      });

      for (const item of items) {
        await tx.product.update({
          where: {
            id: item.productId,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return createdOrder;
    });

    return NextResponse.json(
      {
        success: true,
        order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ORDER_CREATE_ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to create order",
      },
      { status: 500 }
    );
  }
}