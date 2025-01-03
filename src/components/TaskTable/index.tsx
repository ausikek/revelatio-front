"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Task } from "@/interfaces";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsLarge } from "@/hooks/use-large";
import { fetcher, applyAllFilters } from "@/lib/utils";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useSWR from "swr";
import EditTaskButton from "@/components/EditTask";
import RemoveTaskButton from "@/components/RemoveTask";
import ShowTask from "@/components/ShowTask";
import TaskStatus from "@/components/TaskStatus";
import StatusFilter from "@/components/StatusFilter";
import StatusOrdering from "@/components/StatusOrdering";
import LoadingTemplate from "@/components/LoadingTemplate";
import NoTasks from "@/components/NoTasks";
import AddTaskButton from "@/components/AddTask";
import TablePagination from "../TablePagination";

export default function Tasks() {
  const { data: session, status: sessionStatus } = useSession();

  if (sessionStatus === "unauthenticated") {
    redirect("/");
  }

  const { data } = useSWR<Task[]>(
    session ? `/api/tasks/${session.id}` : "",
    fetcher
  );
  const isMobile = useIsMobile();
  const isLarge = useIsLarge();

  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [ascending, setAscending] = useState<string>("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(15);

  if (!data) {
    return <LoadingTemplate />;
  }

  if (data.length === 0) {
    return <NoTasks />;
  }

  const filteredData = applyAllFilters(ascending, search, status, data);

  const totalPages = Math.ceil(filteredData.length / tasksPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <Input
          placeholder="Pesquisar..."
          className="w-40 lg:w-1/4"
          onChange={(e) => setSearch(e.target.value)}
        />
        <StatusFilter status={status} setStatus={setStatus} />
        <AddTaskButton />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Título</TableHead>
            {!isMobile && (
              <TableHead className="text-left">Descrição</TableHead>
            )}
            <TableHead className="text-left">
              <StatusOrdering
                ascending={ascending}
                setAscending={setAscending}
              />
            </TableHead>
            <TableHead className="text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((task) => (
            <TableRow key={task.id} className="items-center">
              <TableCell className="text-left">
                {isLarge && task.title.length > 12
                  ? task.title.slice(0, 10).padEnd(12, "...")
                  : task.title}
              </TableCell>
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
      {filteredData.length === 0 && <h1>Nenhuma task encontrada.</h1>}
      <TablePagination
        tasksPerPage={tasksPerPage}
        setTasksPerPage={setTasksPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
