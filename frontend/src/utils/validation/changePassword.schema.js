import { z } from "zod";

export const changePasswordSchema = z
    .object({

        currentPassword: z
            .string()
            .min(6, "Current password is required"),

        newPassword: z
            .string()
            .min(6, "New password must be at least 6 characters"),

        confirmPassword: z
            .string()
            .min(6, "Confirm your password"),

    })
    .refine(
        (data) => data.newPassword === data.confirmPassword,
        {
            path: ["confirmPassword"],
            message: "Passwords do not match",
        }
    );