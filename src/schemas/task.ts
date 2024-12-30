import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(1, { message: "Insira um título" }),
  description: z.string().min(1, { message: "Insira uma descrição" }),
});

export type TaskT = z.infer<typeof TaskSchema>;
