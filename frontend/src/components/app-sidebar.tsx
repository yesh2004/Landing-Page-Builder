"use client"
import { Calendar, Home, Inbox, MoveLeft, Settings } from "lucide-react"
import { useRouter } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Pages",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Logout",
    url: "#",
    icon: MoveLeft,
    action: "logout", // Identifying logout action
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  const router = useRouter();

  // Logout function
  async function logout() {
    const res = await fetch('http://localhost:8000/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (res.ok) {
     
      router.push("/login");
    } else {
      alert("Logout failed. Please try again.");
    }
  }

  return (
    <Sidebar className="">
      <SidebarContent>
        <SidebarGroup className="pt-10">
          <SidebarGroupLabel className="text-3xl font-bold mb-5">Application</SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="mt-5"
                  onClick={item.action === "logout" ? logout : undefined} // Only assign logout function for logout item
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="text-2xl font-semibold font-sans p-2">
                      <item.icon size={64} />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
