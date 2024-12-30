import { TaskT } from "@/schemas";

type TaskDTO = TaskT;
type UpdateTaskDTO = {
  title?: string;
  description?: string;
  status?: string;
};

export type { TaskDTO, UpdateTaskDTO };
