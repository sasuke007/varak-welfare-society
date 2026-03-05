import { z } from "zod";

export const donationSchema = z.object({
  amount: z.coerce.number().min(10, "Minimum donation is ₹10"),
  tipAmount: z.coerce.number().min(0).default(0),
  campaignId: z.string().min(1),
  donorName: z.string().min(2).optional(),
  donorEmail: z.string().email().optional(),
  donorPhone: z.string().optional(),
  isAnonymous: z.boolean().default(false),
  panNumber: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number")
    .optional()
    .or(z.literal("")),
});

export type DonationInput = z.infer<typeof donationSchema>;
