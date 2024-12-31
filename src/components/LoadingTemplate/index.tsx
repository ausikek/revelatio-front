import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import StatusFilter from "@/components/StatusFilter";

export default function LoadingTemplate() {
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex flex-row gap-4">
        <Input placeholder="Pesquisar..." className="w-40 lg:w-1/4" />
        <StatusFilter status={""} setStatus={() => {}} />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
        <Skeleton className="w-full h-12" />
      </div>
    </div>
  );
}
