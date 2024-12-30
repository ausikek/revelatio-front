import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

interface StatusFilterProps {
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
}

const statusMap: { [key: string]: string } = {
  ALL: "Todos",
  TODO: "A Fazer",
  DOING: "Fazendo",
  DONE: "Feito",
};

export default function StatusFilter({ status, setStatus }: StatusFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full">
          <ListFilter name="w-4 h-4" />
          Status
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Filtrar por status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
          {["ALL", "TODO", "DOING", "DONE"].map((status, idx) => {
            return (
              <DropdownMenuRadioItem
                key={idx}
                value={status === "ALL" ? "" : status}
              >
                {statusMap[`${status}`]}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
