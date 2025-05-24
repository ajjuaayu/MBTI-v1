
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { APP_NAME, navItems, NavItem } from "@/config/site";
import { Moon, Sun, Settings } from "lucide-react";
import { useTheme } from "next-themes"; // Assuming next-themes is or will be installed for theme toggling

export function AppSidebar() {
  const pathname = usePathname();
  // const { theme, setTheme } = useTheme(); // Enable if next-themes is used

  // Placeholder for theme toggle - ideally use next-themes
  const toggleTheme = () => {
    // const newTheme = theme === "light" ? "dark" : "light";
    // setTheme(newTheme);
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };
  

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20z"></path>
            <path d="M12 12a4 4 0 100-8 4 4 0 000 8z"></path>
            <path d="M12 12a4 4 0 100 8 4 4 0 000-8z" opacity="0.5"></path>
          </svg>
          <h1 className="text-2xl font-semibold text-foreground group-data-[collapsible=icon]:hidden">
            {APP_NAME}
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <SidebarMenu>
          {navItems.map((item: NavItem) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.title}
                  className="justify-start"
                >
                  <a> {/* This <a> tag is important when asChild is true with <Link> from Next.js pre-13 */}
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <Button variant="ghost" onClick={toggleTheme} className="w-full justify-start gap-2 group-data-[collapsible=icon]:justify-center">
          <Sun className="h-5 w-5 block dark:hidden" />
          <Moon className="h-5 w-5 hidden dark:block" />
          <span className="group-data-[collapsible=icon]:hidden">Toggle Theme</span>
        </Button>
        {/* <Button variant="ghost" className="w-full justify-start gap-2 group-data-[collapsible=icon]:justify-center">
          <Settings className="h-5 w-5" />
          <span className="group-data-[collapsible=icon]:hidden">Settings</span>
        </Button> */}
      </SidebarFooter>
    </Sidebar>
  );
}
