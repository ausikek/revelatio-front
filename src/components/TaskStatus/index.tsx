import { CircleAlert, CircleCheck, CircleDashed, Loader } from "lucide-react";

interface TaskStatusProps {
  status: string;
}

export default function TaskStatus({ status }: TaskStatusProps) {
  switch (status) {
    case "TODO":
      return <CircleDashed className="h-4 w-4" />;
    case "PROGRESS":
      return <Loader className="h-4 w-4" />;
    case "DONE":
      return <CircleCheck className="h-4 w-4" />;
    default:
      return <CircleAlert className="h-4 w-4" />;
  }
}
