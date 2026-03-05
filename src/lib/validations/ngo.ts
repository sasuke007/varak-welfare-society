import { z } from "zod";

export const ngoRegistrationSchema = z.object({
  // Step 1: Person details
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Invalid phone number"),
  associationType: z.enum(["CXO", "Trustee", "Director", "Employee", "Volunteer"]),

  // Step 2: NGO details
  ngoName: z.string().min(2, "NGO name is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  pan: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN")
    .optional()
    .or(z.literal("")),
  ngoType: z.enum(["SECTION_8", "TRUST", "SOCIETY", "ASSOCIATION_OF_PERSONS"]),
  dateOfFormation: z.coerce.date().optional(),
  city: z.string().optional(),
  has12A: z.boolean().default(false),
  has80G: z.boolean().default(false),

  // Step 3: Bank details
  bankAccountNumber: z.string().min(8, "Invalid account number"),
  bankIfsc: z
    .string()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code"),
  bankLinkedPhone: z.string().min(10, "Invalid phone number"),

  // Step 4: Legal
  signatoryName: z.string().min(2, "Signatory name is required"),
  consent: z.literal(true, { message: "You must agree to the terms" }),
});

export type NgoRegistrationInput = z.infer<typeof ngoRegistrationSchema>;
