import { z } from "zod";

export const panSchema = z.object({
  panNumber: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Enter a valid PAN number"),
});

export type PanFormData = z.infer<typeof panSchema>;

export const gstSchema = z.object({
  gstNumber: z
    .string()
    .trim()
    .min(1, "GST number is required")
    .length(15, "GST number must be exactly 15 characters")
    .regex(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
      "Invalid GST number format"
    ),
});