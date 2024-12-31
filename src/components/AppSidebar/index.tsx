"use client";

import { ClipboardList, Shield } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { LogoutButton } from "@/components/LogoutButton";
import { useSession } from "next-auth/react";
import { capitalize } from "@/lib/utils";

const items = [
  {
    title: "Tasks",
    url: "/tasks",
    icon: ClipboardList,
  },
  {
    title: "Admin",
    url: "/admin",
    icon: Shield,
  },
];

export function AppSidebar() {
  const { data: session } = useSession();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroupLabel>Revelatio Tasks</SidebarGroupLabel>
        <h1 className="pl-2">Olá, {capitalize(session?.username)}</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
