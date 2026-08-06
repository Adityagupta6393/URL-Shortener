import { z } from "zod";

export const profileSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must not exceed 50 characters"),
});