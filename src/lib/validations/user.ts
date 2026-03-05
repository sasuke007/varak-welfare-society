import { z } from "zod";

export const userProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional(),
  phone: z.string().min(10, "Invalid phone number").optional().or(z.literal("")),
});

export const kycSchema = z.object({
  aadharNumber: z
    .string()
    .regex(/^\d{12}$/, "Aadhar must be 12 digits"),
  panNumber: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number"),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;
export type KycInput = z.infer<typeof kycSchema>;
