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
    case "PROGRESS":
      return task.filter((task) => task.status === "PROGRESS");
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

export function orderByStatus(task: Task[], filter: string) {
  switch (filter) {
    case "asc":
      return task.sort((a, b) => a.status.localeCompare(b.status));
    case "des":
      return task.sort((a, b) => b.status.localeCompare(a.status));
    case "none":
    default:
      return task;
  }
}

export function orderByTitle(task: Task[]) {
  return task.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
}

export function applyAllFilters(
  asc: string,
  search: string,
  status: string,
  task: Task[]
) {
  return orderByStatus(statusFilter(status, searchFilter(search, task)), asc);
}

export const getStatusCounts = (tasks: Task[] | undefined) => {
  const statusCounts = [
    { status: "A Fazer", Quantidade: 0 },
    { status: "Em Progresso", Quantidade: 0 },
    { status: "Concluído", Quantidade: 0 },
  ];

  const getStatusReverse = (status: string) => {
    switch (status) {
      case "A Fazer":
        return "TODO";
      case "Em Progresso":
        return "PROGRESS";
      case "Concluído":
        return "DONE";
      default:
        return "";
    }
  };

  if (tasks) {
    tasks.forEach((task) => {
      const { status } = task;

      statusCounts.find((item) => getStatusReverse(item.status) === status)!
        .Quantidade++;
    });
    return statusCounts;
  }
};

export const convertStatus = (value: string) => {
  switch (value) {
    case "TODO":
      return "A Fazer";
    case "PROGRESS":
      return "Em Progresso";
    case "DONE":
      return "Concluído";
    default:
      return "";
  }
};

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());
