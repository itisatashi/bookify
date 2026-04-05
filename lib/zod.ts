import { z } from "zod";
import {
  MAX_FILE_SIZE,
  ACCEPTED_PDF_TYPES,
  MAX_IMAGE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  voiceOptions,
} from "@/lib/constants";

export const UploadSchema = z.object({
  pdf: z
    .instanceof(File, { message: "Please upload a PDF file" })
    .refine((file) => file.size > 0, "Please upload a PDF file")
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`
    )
    .refine(
      (file) => ACCEPTED_PDF_TYPES.includes(file.type),
      "Only PDF files are accepted"
    ),

  cover: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_IMAGE_SIZE,
      `Image must be less than ${MAX_IMAGE_SIZE / (1024 * 1024)}MB`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .png, and .webp formats are supported"
    )
    .optional(),

  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must be less than 200 characters"),

  author: z
    .string()
    .min(2, "Author name must be at least 2 characters")
    .max(100, "Author name must be less than 100 characters"),

  voice: z
    .string()
    .refine(
      (val) => Object.keys(voiceOptions).includes(val),
      "Please select a valid voice"
    ),
});
