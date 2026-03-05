import { z } from "zod";

export const campaignCreateSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters").max(100),
  story: z.string().min(50, "Story must be at least 50 characters"),
  goalAmount: z.coerce.number().min(1000, "Minimum goal amount is ₹1,000"),
  beneficiaryName: z.string().min(2, "Beneficiary name is required"),
  beneficiaryRelation: z.string().optional(),
  beneficiaryAge: z.coerce.number().min(0).max(120).optional(),
  cancerTypeId: z.string().min(1, "Please select a cancer type"),
  hospitalName: z.string().optional(),
  hospitalCity: z.string().optional(),
  stateId: z.string().optional(),
  districtId: z.string().optional(),
  endDate: z.coerce.date().optional(),
});

export const campaignUpdateSchema = campaignCreateSchema.partial();

export const campaignStoryUpdateSchema = z.object({
  content: z.string().min(10, "Update must be at least 10 characters"),
  imageUrl: z.string().url().optional(),
});

export type CampaignCreateInput = z.infer<typeof campaignCreateSchema>;
export type CampaignUpdateInput = z.infer<typeof campaignUpdateSchema>;
