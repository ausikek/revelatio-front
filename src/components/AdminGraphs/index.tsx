"use client";

import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";
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
  const isMobile = useIsMobile();
  const { status: sessionStatus } = useSession();

  if (sessionStatus === "unauthenticated") {
    redirect("/");
  }

  return (
    <div className="w-full">
      <ChartContainer
        config={chartConfig}
        className="pr-7 pt-10 w-1/2 min-h-[200px]"
      >
        <BarChart data={getStatusCounts(data)}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="status"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => (!isMobile ? value : "")}
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
