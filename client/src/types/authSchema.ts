import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .email({ message: "Provide a valid email." }),
  password: z
    .string({ required_error: "Password is required." })
    .min(6, "Password should be minimum six characters.")
    .max(1024, "Password should not exceed 1024 characters."),
});

export const signUpSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required." })
      .email({ message: "Provide a valid email." }),
    password: z
      .string({ required_error: "Password is required." })
      .min(6, "Password should be minimum six characters.")
      .max(1024, "Password should not exceed 1024 characters."),
    confirmPassword: z
      .string()
      .min(6, "Password should be minimum six characters.")
      .max(1024, "Password should not exceed 1024 characters.")
      .optional(),
    photo: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
