"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "@/interfaces";
import { useIsMobile } from "@/hooks/use-mobile";
import EditTaskButton from "../EditTask";
import RemoveTaskButton from "../RemoveTask";

interface TaskPageProps {
  tasks: Task[];
}

export default function Tasks({ tasks }: TaskPageProps) {
  const isMobile = useIsMobile();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Título</TableHead>
          {!isMobile && <TableHead className="text-left">Descrição</TableHead>}
          <TableHead className="text-right">Status</TableHead>
          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell className="text-left">{task.title}</TableCell>
            {!isMobile && (
              <TableCell className="text-left">{task.description}</TableCell>
            )}
            <TableCell className="text-right">{task.status}</TableCell>
            <TableCell className="flex gap-2 justify-center">
              <EditTaskButton taskID={task.id} task={task} />
              <RemoveTaskButton taskID={task.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
