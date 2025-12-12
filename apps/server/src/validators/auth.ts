import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.email({ message: "Invalid email address" }),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirm_password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const signInSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
