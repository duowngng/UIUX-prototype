/** @format */
"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from 'next/link';
import OverviewContent from "./components/OverViewContent";
import GoalContent from "./components/GoalContent";
import HistoryContent from "./components/HistoryContent";
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import data from "@/app/data.json";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import { Heading } from "@/components/ui/heading";

import { useRouter } from "next/navigation";


const Home = ({
  params
}: {
  params: { cycleId: string}
}) => {
  let curCycle;
  for (const key in data.cycles) {
    if (data.cycles[key].id === params.cycleId) {
      curCycle = data.cycles[key]  ;
      break;
    }
  }
  if (curCycle === undefined) {
    curCycle = data.cycles[0];
  }
  const router = useRouter();
  const [selectedContent, setSelectedContent] = useState('Tổng quan');

  return (
    
    <div className="flex-col p-8 space-y-4 pt-6 w-full">
      <div className="flex flex-1 gap-2 justify-between align-top">
        <Heading title={'Chu kỳ: ' + curCycle.id}  description=""/>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button onClick={() => router.push(`/cycles/new`)}>
                <ChevronDown className="mr-2 h-4 w-4" />
                Xuất
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Kết quả chu kỳ </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>CSV</DropdownMenuItem>
              <DropdownMenuItem>PDF</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
        
            </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem >
         
            <NavigationMenuLink
              className={navigationMenuTriggerStyle() }
              onClick={() => setSelectedContent('Tổng quan')}
              
            >
              Tổng quan
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={() => setSelectedContent('Mục tiêu')}
            >
              Mục tiêu
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={() => setSelectedContent('Lịch sử')}
            >
              Lịch sử
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Render nội dung dựa trên selectedContent */}
      {selectedContent === 'Tổng quan' && <OverviewContent cycle={curCycle}/>}
      {selectedContent === 'Mục tiêu' && <GoalContent cycle={curCycle} />}
      {selectedContent === 'Lịch sử' && <HistoryContent cycle={curCycle} />}
    </div>
  );
};
export default Home;