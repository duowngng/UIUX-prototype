/** @format */
"use client";

import { useState } from "react";
import { Nav } from "./ui/nav";

type Props = {};

import {
  LayoutDashboard,
  Settings,
  ChevronRight,
  ListTodo,
  CalendarRange
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3  pb-10 pt-24 ">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className=" rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Trang chủ",
            href: "/",
            icon: LayoutDashboard,
            variant: "default"
          },
          {
            title: "Chu kỳ",
            href: "/cycles",
            icon: CalendarRange,
            variant: "ghost"
          },
          {
            title: "Mẫu mục tiêu",
            href: "/goal-templates",
            icon: ListTodo,
            variant: "ghost"
          },
          {
            title: "Cài đặt",
            href: "/settings",
            icon: Settings,
            variant: "ghost"
          },
          {
            title: "Cài đặt",
            href: "/documents",
            icon: Settings,
            variant: "ghost"
          }
        ]}
      />
    </div>
  );
}
