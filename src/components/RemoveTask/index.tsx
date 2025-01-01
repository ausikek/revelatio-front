"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { mutate } from "swr";

export interface RemoveTaskButtonProps {
  taskID: string;
}

export default function RemoveTaskButton({ taskID }: RemoveTaskButtonProps) {
  const { data: session } = useSession();

  const removeOnSubmit = async (taskID: string) => {
    try {
      await fetch(`/api/tasks/${taskID}`, {
        method: "DELETE",
      });

      mutate(`/api/tasks/${session?.id}`);
      toast.success("Task removida com sucesso");
    } catch {
      console.error("Error deleting task");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded-full h-7 w-7">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={() => removeOnSubmit(taskID)}>
            Remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
