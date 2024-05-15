/** @format */
"use client";
import { MantineProvider } from '@mantine/core';
import PageTitle from "@/components/PageTitle";
import { DollarSign } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { DonutChart } from '@mantine/charts';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import clsx from 'clsx';
const containerClasses = clsx('container');
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from 'next/link';
import OverviewContent from "@/app/dashboard/OverViewContent";
import GoalContent from "@/app/dashboard/GoalContent";
import HistoryContent from "@/app/dashboard/HistoryContent";


import { useState } from 'react';

export default function Home(){
  const [selectedContent, setSelectedContent] = useState('Tổng quan');

  return (
    
    <div className="flex flex-col gap-5  w-full">
    <PageTitle title="Dashboard" /> 
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem >
          
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              onClick={() => setSelectedContent('Tổng quan')}
            >
              Tổng quan
            </NavigationMenuLink>
            
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
