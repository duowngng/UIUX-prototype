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
import { IconFingerprint } from '@tabler/icons-react';
import { ActionIcon, Group } from '@mantine/core';
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
import {cycles} from "@/app/data.json";
const currentCycle = cycles[0];
export default function Home(){
  const [selectedContent, setSelectedContent] = useState('Tổng quan');

  return (
    
    
    <div className="flex flex-col gap-5  w-full">
      <div className="flex items-center justify-between">
                <PageTitle title={'Chu kỳ: ' + currentCycle.name} />
                <DropdownMenu>
              <DropdownMenuTrigger style={{ backgroundColor: "#0F172A", borderRadius: "10px 10px 10px 10px", color: "white", width: 124, height: 42 }}>
                Nhập Xuất
              </DropdownMenuTrigger>
              <DropdownMenuContent>
              <DropdownMenuLabel>Xuất chu kỳ</DropdownMenuLabel>
                <DropdownMenuItem>CSV</DropdownMenuItem>
                <DropdownMenuLabel>Nhập chu kỳ</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Excel</DropdownMenuItem>
                <DropdownMenuItem>CSV</DropdownMenuItem>
                <DropdownMenuItem>JSon</DropdownMenuItem>
               
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
      {selectedContent === 'Tổng quan' && <OverviewContent cycle={currentCycle}/>}
      {selectedContent === 'Mục tiêu' && <GoalContent cycle={currentCycle} />}
      {selectedContent === 'Lịch sử' && <HistoryContent cycle={currentCycle} />}
    </div>
  );
};
