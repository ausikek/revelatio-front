"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { TaskSchema, TaskT } from "@/schemas";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { mutate } from "swr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleCheck, CircleDashed, Loader } from "lucide-react";
import { useSession } from "next-auth/react";

interface EditTaskButtonProps {
  taskID: string;
  task: TaskT;
}

export default function EditTaskButton({ taskID, task }: EditTaskButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { data: session } = useSession();

  const form = useForm<TaskT>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
    },
  });

  const editOnSubmit = async (data: TaskT) => {
    try {
      const payload = { ...data, user: session };

      await fetch(`/api/tasks/${taskID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      mutate("/api/tasks");
    } catch {
      console.error("Error adding task");
    }
    setIsOpen(false);
  };

  if (!isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-full h-7 w-7">
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Task</DialogTitle>
            <DialogDescription>Preencha os campos abaixo</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(editOnSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título da Task</FormLabel>
                    <FormControl>
                      <Input placeholder={task.title} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição da Task</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={task.description}
                        {...field}
                        className="resize-none h-36"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={task.status} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="TODO">
                          <div className="flex flex-row items-center gap-2">
                            <p>A Fazer</p>
                            <CircleDashed className="h-4 w-4" />
                          </div>
                        </SelectItem>
                        <SelectItem value="PROGRESS">
                          <div className="flex flex-row items-center gap-2">
                            <p>Em Progresso</p>
                            <Loader className="h-4 w-4" />
                          </div>
                        </SelectItem>
                        <SelectItem value="DONE">
                          <div className="flex flex-row items-center gap-2">
                            <p>Concluída</p>
                            <CircleCheck className="h-4 w-4" />
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" className="w-full">
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button className="rounded-full h-7 w-7">
          <Pencil />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-[425px]">
        <DrawerHeader>
          <DrawerTitle>Editar Task</DrawerTitle>
          <DrawerDescription>Preencha os campos abaixo</DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(editOnSubmit)}
            className="space-y-4 px-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título da Task</FormLabel>
                  <FormControl>
                    <Input placeholder={task.title} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição da Task</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={task.description}
                      {...field}
                      className="resize-none h-36"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={task.status} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="TODO">
                        <div className="flex flex-row items-center gap-2">
                          <p>A Fazer</p>
                          <CircleDashed className="h-4 w-4" />
                        </div>
                      </SelectItem>
                      <SelectItem value="PROGRESS">
                        <div className="flex flex-row items-center gap-2">
                          <p>Em Progresso</p>
                          <Loader className="h-4 w-4" />
                        </div>
                      </SelectItem>
                      <SelectItem value="DONE">
                        <div className="flex flex-row items-center gap-2">
                          <p>Concluída</p>
                          <CircleCheck className="h-4 w-4" />
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DrawerFooter>
              <Button type="submit" className="w-full">
                Salvar
              </Button>
            </DrawerFooter>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
