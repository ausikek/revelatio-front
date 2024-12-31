export interface Task {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "PROGRESS" | "DONE";
  userID: string;
}
