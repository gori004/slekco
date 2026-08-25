import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email()
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Enter a valid email." }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: `Thanks — ${parsed.data.email} is on the list.`
    });
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }
}