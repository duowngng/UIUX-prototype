/** @format */
"use client";
import { MantineProvider } from '@mantine/core';
import Card, { CardContent, CardProps } from "@/components/Card";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import { DonutChart } from '@mantine/charts';
import { Progress } from '@mantine/core';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {cycles} from "@/app/data.json";

import { List, ThemeIcon, rem } from '@mantine/core';
import {  IconCircleDotted,IconCircleDashed ,IconCircle, IconCircleCheck} from '@tabler/icons-react';


    


export type Cycle = typeof cycles[0];
export type CycleProps = {
  cycle: Cycle;
};
  export default function OverviewContent(props: CycleProps) {
    const Goals = props.cycle.goals;
    const currentCycle = props.cycle;
    const fromDate = new Date(currentCycle.dateRange.from.toString());
    const toDate = new Date(currentCycle.dateRange.to.toString());
    const timeDiff = Math.abs(toDate.getTime() - fromDate.getTime());
    const Currentime = new Date();
    const ctimeDiff = Math.abs(Currentime.getTime() - fromDate.getTime());
    const numDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const cnumDays = Math.ceil(ctimeDiff / (1000 * 3600 * 24));
    const cycleProgress = Goals.reduce((total, goal) => total + goal.weight*goal.kpis.reduce((total, kpi) => total + kpi.actual*kpi.weight*1.0/kpi.target, 0)/100, 0).toFixed(1);
    const cardData_1 = {
          label: currentCycle.id,
          amount: Goals.length,
          progress: cycleProgress,
          dateRange: currentCycle.dateRange,
          numDays: numDays,
          cnumDays: cnumDays
        }
      ;
    const progressData = Goals.map((goal) => {
      return {
        progressGoal: goal.kpis.reduce((total, kpi) => total + kpi.actual*kpi.weight*1.0/kpi.target, 0),
        progressKPIs: goal.kpis.map((kpi) => kpi.actual/kpi.target).reduce((total, kpi) => total + kpi, 0),
      }
    });

    return (
      <MantineProvider> 
        <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-3 justify-between ">
        
            <Card
              amount={cardData_1.amount}
              progress={Number(cardData_1.progress)}
              label={cardData_1.label}
              dateRange={cardData_1.dateRange}
              numDays={cardData_1.numDays}
              cnumDays={cardData_1.cnumDays}
            />
          <CardContent>
          <p className="text-sm">Trạng thái mục tiêu </p>
          <div className ='flex gap-10 items-center'>
          <DonutChart  chartLabel={cycleProgress +'%'} size={140} thickness={17} data={Goals.map((goal,i) => ({
                                  name: goal.name,
                                  value: goal.weight,
                                  color: progressData[i].progressGoal*1.0/cnumDays*numDays<100?'yellow.6':'teal.6',
                                  // color: kpi.actual/(0.000001+cnumDays)<kpi.target/numDays?'yellow.6':(kpi.actual/cnumDays<kpi.target/numDays?'indigo.6':'teal.6'),
                                            
                                }))} />
                      <List
                          spacing="xs"
                          size="sm"
                          center
                        >
                          <List.Item  icon={
                              <ThemeIcon color="teal.6" size={24} radius="xl">
                                <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
                              </ThemeIcon>
                            }>Suất sắc</List.Item>
                          <List.Item  icon={
                              <ThemeIcon color="indigo.6" size={24} radius="xl">
                                <IconCircle style={{ width: rem(16), height: rem(16) }} />
                              </ThemeIcon>
                            }>Đúng tiến độ</List.Item>
                          <List.Item  icon={
                              <ThemeIcon color="yellow.6" size={24} radius="xl">
                                <IconCircleDashed style={{ width: rem(16), height: rem(16) }} />
                              </ThemeIcon>
                            }>Chậm tiến độ</List.Item>
                          <List.Item  icon={
                              <ThemeIcon color="gray.6" size={24} radius="xl">
                                <IconCircleDotted style={{ width: rem(16), height: rem(16) }} />
                              </ThemeIcon>
                            }>Chưa làm</List.Item>
                        </List>
          </div>
          
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
            {Goals.map((d,i) => (
             <Accordion type="single" collapsible >
             <AccordionItem value="item-1">
               <AccordionTrigger>
               <div className ='grid grid-cols-1 gap-4' style={{width:"100%"}}> 
                  <div className='flex justify-between'>
                  <div className='flex gap-4'>
                      <div className = 'w-20 '>
                              <DonutChart 
                              chartLabel = {progressData[i].progressGoal.toFixed() +'%'}
                                size={50}
                                thickness={8}
                                data={d.kpis.map((kpi) => ({
                                  name: kpi.name,
                                  value: kpi.weight,
                                  color: kpi.actual/(0.000001+cnumDays)<kpi.target/numDays?'yellow.6':(kpi.actual/cnumDays<kpi.target/numDays?'indigo.6':'teal.6'),
                                }))} 
                                className="absolute"
                                style={{zIndex: 1000-i }}
                              />
                      </div>
                      <div className = 'truncate text-left'>
                              <p>{d.id}-{d.name}</p>
                              <p className="text-sm text-gray-400 t">
                                {d.description}
                                </p>
                      </div>
                  </div>

                  <div className='flex gap-8 items-center mr-4'>
                  <div className = 'truncate text-left'>
                          <p>{cardData_1.dateRange.from}:{cardData_1.dateRange.to}</p>
                  </div>
                  
                  <div className = 'w-40'>
                    <Progress style={{width:"100%"}} size="md" value={d.kpis.reduce((total, kpi) => total + kpi.actual*kpi.weight*1.0/kpi.target, 0) 
                    } />
                  </div>
                  </div>
                  </div>
                    
                </div>
               </AccordionTrigger>    
               <AccordionContent>
                  <section className="flex flex-col gap-4" style={{width:"100%"}}>
                    
                    <div className="grid grid-cols-10 gap-4">
                           <p className="text-sm text-gray-400">Thang đo KPI</p>
                           <p className="text-sm text-gray-400 text-right col-start-4">Đã đạt</p>
                           <p className="text-sm text-gray-400 text-right">Chỉ tiêu</p>
                           <p className="text-sm text-gray-400 text-center">Đơn vị đo</p>
                           <p className="text-sm text-gray-400 text-right">Trọng số</p>
                    </div>
                      {d.kpis.map((kpi) => (
                        <div className="grid grid-cols-10 gap-4">
                          
                            <p className='col-span-3 truncate'>{kpi.name}</p>
                            <p className="text-right col-start-4">{kpi.actual} </p>
                            <p className="text-right">{kpi.target} </p>
                            <p className="text-center">_</p>
                            <p className="text-right">{kpi.weight} </p>
                            
                            <div className='col-span-1 col-end-11'>
                            <Progress 
                            value={kpi.actual * 100.0 / kpi.target} size={'sm'} 
                            color= {kpi.actual/(0.000001+cnumDays)<kpi.target/numDays?'yellow.6':(kpi.actual/cnumDays<kpi.target/numDays?'indigo.6':'teal.6')}
                            />
                          </div>
                        </div>
                      ))}
                    
                  </section>
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
  

