"use client";

import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Task } from "@/interfaces";
import { fetcher, getStatusCounts } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import useSWR from "swr";

const chartConfig = {
  todo: {
    label: "A Fazer",
    color: "#005599",
  },
  progress: {
    label: "Em Progresso",
    color: "#FFAA00",
  },
  done: {
    label: "Concluído",
    color: "#00AA00",
  },
} satisfies ChartConfig;

export default function AdminCharts() {
  const { data } = useSWR<Task[]>("/api/tasks", fetcher);
  const { status: sessionStatus } = useSession();

  if (sessionStatus === "unauthenticated") {
    redirect("/");
  }

  return (
    <div className="w-full flex items-center flex-col pt-7 pr-12">
      <h1>
        {`Ao total, são ${data?.length ?? 0} tarefas cadastradas no sistema`}
      </h1>
      <ChartContainer
        config={chartConfig}
        className="pt-10 w-full min-h-[300px] sm:min-h-[400px]"
      >
        <BarChart data={getStatusCounts(data)}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="status"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value}
          />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="Quantidade" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
