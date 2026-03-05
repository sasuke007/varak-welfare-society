import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);
    const { event: eventType, payload } = event;

    if (eventType === "payment.captured") {
      const payment = payload.payment.entity;

      await prisma.donation.updateMany({
        where: { gatewayOrderId: payment.order_id },
        data: {
          gatewayPaymentId: payment.id,
          status: "COMPLETED",
        },
      });
    }

    if (eventType === "payment.failed") {
      const payment = payload.payment.entity;

      await prisma.donation.updateMany({
        where: { gatewayOrderId: payment.order_id },
        data: {
          status: "FAILED",
        },
      });
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Razorpay webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
