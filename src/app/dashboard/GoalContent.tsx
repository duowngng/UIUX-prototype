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



import { useState } from 'react';

const cardData: CardProps[] = [
    {
      label: "Mục tiêu",
      amount: "4",
      progress: 20
    }
  ];
  
  const goalData: SalesProps[] = [
    {
      name: "Thực hiện các công việc",
      email: "olivia.martin@email.com",
      saleAmount: "+$1,999.00"
    }
  ];
  
  export default function GoalContent() {
    return (
      <MantineProvider> 
        <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-3 justify-between ">
          {cardData.map((d, i) => (
            <Card
              key={i}
              amount={d.amount}
              progress={d.progress}
              label={d.label}
            />
          ))}
          <CardContent>
          <p className="text-sm">Trạng thái mục tiêu </p>
          <DonutChart size={140} thickness={17} data={[
            { name: 'Đúng tiến độ', value: 1, color: 'indigo.6' },
            { name: 'Chậm tiến độ', value: 1, color: 'yellow.6' },
            { name: 'Suất sắc', value: 1, color: 'teal.6' },
            { name: 'Chưa làm', value: 1, color: 'gray.6' },
          ]} />
          </CardContent>
          <CardContent>
              <p className="p-4 font-semibold text-red-500 ">Overview</p>
            
          </CardContent>
        </section>
        <section className="grid grid-cols-1  gap-4 transition-all ">
          
          <CardContent className="flex justify-between gap-4">
            <section>
              <p>Mục tiêu</p>
              <p className="text-sm text-gray-400">
                Cập nhật lần cuối lúc 12:00 PM
              </p>
            </section>
            {[1,2,3,4].map(( i) => (
             <Accordion type="single" collapsible>
             <AccordionItem value="item-1">
               <AccordionTrigger>
               <DonutChart size={50} thickness={8} chartLabel = {10} data={[
                  { name: 'Số lượng đối tác cần tiếp đón', value: 30, color: 'indigo.6' },
                  { name: 'Số lời khen của đối tác về việc tiếp đón', value: 20, color: 'yellow.6' },
                  { name: 'Số lượng cuộc gọi liên hệ từ bên ngoài', value: 60, color: 'gray.6' },
                  ]}  className={containerClasses}/>
                   <section>
                    <p>Thực hiện các hoạt động với đối tác bên ngoài</p>
                    <p className="text-sm text-gray-400">
                      Goals description
                      </p>
                  </section>
  
               </AccordionTrigger>    
               <AccordionContent>
                 Yes. It adheres to the WAI-ARIA design pattern.
               </AccordionContent>
             </AccordionItem>
           </Accordion>
           
            ))}
          </CardContent>
  
          {/*  */}
        </section>
      </MantineProvider>
    );
  }
  