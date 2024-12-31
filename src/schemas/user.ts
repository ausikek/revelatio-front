import { z } from "zod";

export const UserSchema = z.object({
  username: z.string().min(1, { message: "Insira um nome" }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
});

export type UserT = z.infer<typeof UserSchema>;
