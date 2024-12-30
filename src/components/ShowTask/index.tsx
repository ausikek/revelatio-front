import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useIsLarge } from "@/hooks/use-large";
import { Eye } from "lucide-react";
import { Task } from "@/interfaces";

interface ShowTaskProps {
  task: Task;
}

export default function ShowTask({ task }: ShowTaskProps) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const isLarge = useIsLarge();

  const minifiedDescription = task.description.slice(0, 25).padEnd(26, "…");

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="flex flex-row gap-2">
          {!isLarge && task.description.length < 40
            ? task.description
            : minifiedDescription}
          {!isMobile && <Eye className="h-4 w-4" />}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{task.title}</DialogTitle>
            <DialogDescription>{task.description}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="rounded-full h-7 w-7">
          <Eye />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{task.title}</DrawerTitle>
          <DrawerDescription>{task.description}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Voltar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
