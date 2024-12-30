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
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import EditTaskButton from "@/components/EditTask";
import RemoveTaskButton from "@/components/RemoveTask";
import ShowTask from "@/components/ShowTask";
import TaskStatus from "@/components/TaskStatus";

export default function Tasks() {
  const isMobile = useIsMobile();
  const { data } = useSWR<Task[]>("/api/tasks", fetcher);

  if (!data) {
    return <h1>Você não possui tasks cadastradas</h1>;
  }

  if (data.length === 0) {
    return <h1>Nenhuma task cadastrada</h1>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">Título</TableHead>
          {!isMobile && <TableHead className="text-left">Descrição</TableHead>}
          <TableHead className="text-left">Status</TableHead>
          <TableHead className="text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((task) => (
          <TableRow key={task.id} className="items-center">
            <TableCell className="text-left">{task.title}</TableCell>
            {!isMobile && (
              <TableCell className="text-left flex flex-row">
                <ShowTask task={task} />
              </TableCell>
            )}
            <TableCell className="text-right">
              <TaskStatus status={task.status} />
            </TableCell>
            <TableCell className="flex gap-2 justify-center text-right">
              {isMobile && <ShowTask task={task} />}
              <EditTaskButton taskID={task.id} task={task} />
              <RemoveTaskButton taskID={task.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
