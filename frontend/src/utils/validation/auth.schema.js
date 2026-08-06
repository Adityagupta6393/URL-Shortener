import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),

    email: z.email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),
});

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .email("Invalid email address"),
});

export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "Password must be at least 8 characters"),

        confirmPassword: z.string(),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"],
        }
    );