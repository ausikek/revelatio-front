import { User } from "@/interfaces/user";

type TaskDTO = {
  title: string;
  description: string;
  user: User;
};
type UpdateTaskDTO = {
  title?: string;
  description?: string;
  status?: string;
  user: User;
};

export type { TaskDTO, UpdateTaskDTO };
