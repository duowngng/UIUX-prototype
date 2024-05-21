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
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/ui/heading";
const currentCycle = cycles[0];
export default function Home(){
  const router = useRouter();
  const [selectedContent, setSelectedContent] = useState('Tổng quan');

  return (
    <div className="flex flex-col gap-5 p-8 pt-6 w-full">
      <div className="flex flex-1 space-y-4 items-center justify-between">
        <Heading title={'Chu kỳ: ' + currentCycle.name} description="⠀" />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button onClick={() => router.push(`/cycles/new`)}>
                <ChevronDown className="mr-2 h-4 w-4" />
                Tạo mới
              </Button>
          {/* <DropdownMenu> */}
            {/* <DropdownMenuTrigger> */}
              
            {/* </DropdownMenuTrigger> */}
            {/* <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu> */}

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
