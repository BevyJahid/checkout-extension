// app/routes/api.track-discount.jsx
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function action({ request }) {
  const body = await request.json();
  const { customerId, discountCode, cartTotal, timestamp } = body;

  try {
    await prisma.discountClick.create({
      data: {
        customerId,
        discountCode,
        cartTotal,
        timestamp: new Date(timestamp),
      },
    });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to save discount click:", error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}