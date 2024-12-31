import { Task } from "./task";

export interface User {
  id: string;
  username: string;
  password: string;
  tasks: Task[];
}
