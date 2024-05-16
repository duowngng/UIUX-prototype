/** @format */
"use client";
import PageTitle from "@/components/PageTitle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from 'next/link';
import OverviewContent from "@/app/dashboard/OverViewContent";
import GoalContent from "@/app/dashboard/GoalContent";
import HistoryContent from "@/app/dashboard/HistoryContent";
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Home(){
  const [selectedContent, setSelectedContent] = useState('Tổng quan');

  return (
    
    
    <div className="flex flex-col gap-5  w-full">
      <div className="flex items-center justify-between">
                <PageTitle title="Dashboard" /> 
                <DropdownMenu>
              <DropdownMenuTrigger>Thêm</DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem >
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={() => setSelectedContent('Tổng quan')}
            >
              Tổng quan
            </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={() => setSelectedContent('Mục tiêu')}
            >
              Mục tiêu
            </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={() => setSelectedContent('Lịch sử')}
            >
              Lịch sử
            </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
</NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>

      {/* Render nội dung dựa trên selectedContent */}
      {selectedContent === 'Tổng quan' && <OverviewContent />}
      {selectedContent === 'Mục tiêu' && <GoalContent />}
      {selectedContent === 'Lịch sử' && <HistoryContent />}
    </div>
  );
};
