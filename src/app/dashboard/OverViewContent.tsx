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
const containerClasses = clsx('container mx-auto w-100' );

const goals = clsx('display: flex;',
    'justify-content: space-between;',
    'align-items: center;',
    'flex: 1 0 0;');




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

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}



  export default function OverviewContent() {
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
             <Accordion type="single" collapsible className ={goals}>
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
                  <DatePickerWithRange/>
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
  