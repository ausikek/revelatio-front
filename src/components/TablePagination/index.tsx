import { Dispatch, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  tasksPerPage: number;
  setTasksPerPage: Dispatch<SetStateAction<number>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export default function TablePagination({
  currentPage,
  totalPages,
  tasksPerPage,
  setTasksPerPage,
  setCurrentPage,
}: TablePaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleSetTasksPerPage = (value: string) => {
    setTasksPerPage(Number(value));
  };

  return (
    <div className="flex items-center mt-4 gap-4">
      <div className="flex gap-2 items-center flex-col sm:flex-row">
        <Label>Tasks por página</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full">
              {tasksPerPage}
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup
              value={String(tasksPerPage)}
              onValueChange={handleSetTasksPerPage}
            >
              <DropdownMenuRadioItem value="5">5</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="15">15</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex gap-2 flex-col sm:flex-row items-center">
        <Label>
          Página {currentPage} de {totalPages || 1}
        </Label>
        <div className="flex gap-2">
          <Button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="rounded-full"
          >
            <ChevronLeft />
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="rounded-full"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
