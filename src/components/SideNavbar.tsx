"use client";

import { useParams, usePathname, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import {
  CalendarRange,
  FolderIcon as FolderLucideIcon,
  FolderOpenIcon,
  LayoutDashboard,
  ListTodo,
  PaletteIcon,
  ServerIcon,
} from "lucide-react";

import MenuIcon from "@/components/shared/icons/menu";
import SettingsIcon from "@/components/shared/icons/settings";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { cn } from "@/lib/utils";

import ProfileMenu from "./profile-menu";

import { ScrollArea } from "./ui/scroll-area";

export default function Sidebar() {
  return (
    <>
      <nav className="sticky top-0 z-40">
        {/* sidebar for desktop */}
        <SidebarComponent className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex" />

        {/* move main screen to the right by width of the sidebar on desktop */}
        <div className="lg:pl-72"></div>
        {/* sidebar for mobile */}
        <div className="sticky top-0 z-40 mb-1 flex h-14 shrink-0 items-center border-b border-gray-50/90 bg-gray-50 px-6 dark:border-none dark:border-black/10 dark:bg-black/95 sm:px-12 lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="mt-1 p-0.5 text-muted-foreground lg:hidden">
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="m-0 w-[280px] p-0 sm:w-[300px] lg:hidden"
            >
              <SidebarComponent className="flex" />
            </SheetContent>
          </Sheet>
          <div className="flex flex-1 items-center justify-end gap-x-4 self-stretch lg:gap-x-6">
            <ProfileMenu size="small" className="mr-3 mt-1.5" />
          </div>
        </div>
      </nav>
    </>
  );
}

export const SidebarComponent = ({ className }: { className?: string }) => {
  const [showProBanner, setShowProBanner] = useState<boolean | null>(null);

  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const navigation = [
    {
      name: "Trang chủ",
      href: "/",
      icon: LayoutDashboard,
      current: pathname === `/${params.cycleId}`,
      active: false,
      disabled: false,
    },
    {
      name: "Chu kỳ",
      href: "/cycles",
      icon: CalendarRange,
      current: pathname.includes("cycles"),
      active: false,
      disabled: false,
    },
    {
      name: "Mẫu mục tiêu",
      href: "/goal-templates",
      icon: ListTodo,
      current: pathname.includes("goal-templates"),
      active: false,
      disabled: false,
    },
    {
      name: "Cài đặt",
      href: "/settings",
      icon: SettingsIcon,
      current:
        pathname.includes("settings") &&
        !pathname.includes("branding") &&
        !pathname.includes("datarooms") &&
        !pathname.includes("documents"),
      active: false,
      disabled: false,
    },
  ];

  return (
    <div>
      <aside
        className={cn(
          "h-screen w-full flex-shrink-0 flex-col justify-between gap-y-6 bg-gray-50 px-4 pt-4 dark:bg-black lg:w-72 lg:px-6 lg:pt-6",
          className,
        )}
      >
        {/* Sidebar component, swap this element with another sidebar if you like */}

        <div  className="flex h-16 shrink-0 items-center space-x-3">
        
        <iframe src="https://drive.google.com/file/d/1cT3QhGBUh8NNXh7-gNgXkWpuL6X_JwvN/preview" width="640" height="480" allow="autoplay"></iframe>
          <p className="flex items-center text-3xl font-bold  tracking-tighter text-black dark:text-white">
            Kapiota{" "}
          </p>
        </div>

        <ScrollArea className="flex-grow" showScrollbar>
          <section className="flex flex-1 flex-col gap-y-6">
            <div className="space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  disabled={item.disabled}
                  className={cn(
                    item.current
                      ? "bg-gray-200 font-semibold text-foreground dark:bg-secondary"
                      : " duration-200 hover:bg-gray-200 hover:dark:bg-muted",
                    "group flex w-full items-center gap-x-2 rounded-md px-3 py-2 text-sm leading-6 disabled:cursor-default disabled:text-muted-foreground disabled:hover:bg-transparent",
                  )}
                >
                  <item.icon
                    className="h-5 w-5 shrink-0"
                    aria-hidden="true"
                  />
                  {item.name}
                </button>
              ))}
            </div>
          </section>
        </ScrollArea>
        <div className="mb-4">
          <div className="hidden w-full lg:block">
            <ProfileMenu size="large" />
          </div>
        </div>
      </aside>
    </div>
  );
};