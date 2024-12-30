import { Task } from "@/interfaces";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function statusFilter(status: string, task: Task[]) {
  switch (status) {
    case "TODO":
      return task.filter((task) => task.status === "TODO");
    case "DOING":
      return task.filter((task) => task.status === "DOING");
    case "DONE":
      return task.filter((task) => task.status === "DONE");
    default:
      return task;
  }
}

export function searchFilter(search: string, task: Task[]) {
  return task.filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
  );
}

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
