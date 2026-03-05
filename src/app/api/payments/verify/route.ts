import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Find and update donation record
    const existing = await prisma.donation.findFirst({
      where: { gatewayOrderId: razorpay_order_id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Donation not found" },
        { status: 404 }
      );
    }

    const donation = await prisma.donation.update({
      where: { id: existing.id },
      data: {
        gatewayPaymentId: razorpay_payment_id,
        gatewaySignature: razorpay_signature,
        status: "COMPLETED",
      },
      include: { campaign: { select: { id: true } } },
    });

    // Update campaign stats
    await prisma.campaign.update({
      where: { id: donation.campaignId },
      data: {
        amountRaised: { increment: donation.amount },
        donorCount: { increment: 1 },
      },
    });

    return NextResponse.json({ success: true, donationId: donation.id });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
