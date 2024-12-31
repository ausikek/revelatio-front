import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface StatusFilterProps {
  ascending: string;
  setAscending: Dispatch<SetStateAction<string>>;
}

const statusMap: { [key: string]: string } = {
  none: "Todos",
  asc: "Crescente",
  des: "Decrescente",
};

export default function StatusOrdering({
  ascending,
  setAscending,
}: StatusFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex flex-row items-center gap-2">
          Status
          {ascending === "asc" ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ordenar por status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={ascending} onValueChange={setAscending}>
          {["none", "asc", "des"].map((ascending, idx) => {
            return (
              <DropdownMenuRadioItem key={idx} value={ascending}>
                {statusMap[ascending]}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
