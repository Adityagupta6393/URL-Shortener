import { z } from "zod";

export const createUrlSchema = z.object({
    originalUrl: z
        .string()
        .url("Please enter a valid URL"),

    customAlias: z
        .string()
        .regex(
            /^[a-zA-Z0-9_-]*$/,
            "Only letters, numbers, hyphens and underscores are allowed"
        )
        .max(30, "Maximum 30 characters")
        .optional()
        .or(z.literal("")),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(50)
        .optional()
        .or(z.literal("")),

    expireIn: z
        .string()
        .regex(
            /^$|^\d+(m|h|d)$/,
            "Examples: 30m, 12h, 7d"
        )
        .optional(),
});