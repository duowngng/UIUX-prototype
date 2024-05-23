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
import { IconFingerprint } from '@tabler/icons-react';
import { ActionIcon, Group } from '@mantine/core'; 
import { CycleProps } from "./OverViewContent";



  export default function GoalContent(props: CycleProps) {
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
          label: 'Số mục tiêu',
          amount: Goals.length,
          progress: cycleProgress,
          dateRange: currentCycle.dateRange,
          numDays: numDays,
          cnumDays: cnumDays
        }
      ;
      const f = (cnumDays+0.000001)/numDays;
      function getProgressColor(dp:number){
        if(dp==0){
          return 'gray.6';
        }
        else if(dp<100){
          return 'yellow.6';
        }
        else if(dp<120){
          return 'indigo.6';
        }
        else{
          return 'teal.6';
        }
      }
    const progressData = Goals.map((goal) => {
      return {
        progressGoal: goal.kpis.reduce((total, kpi) => total + kpi.actual*kpi.weight*1.0/kpi.target, 0),
        dpg:goal.kpis.reduce((total, kpi) => total + kpi.actual*kpi.weight*1.0/kpi.target, 0)/f,
        progressKPIs: goal.kpis.map((kpi) => {return{
          progressKPI:100.0*kpi.actual/kpi.target,
          dpk:(100.0*kpi.actual/kpi.target)/f
        }}),
      }
    });


    return (
      <MantineProvider> 
          <CardContent className="flex justify-between gap-4">
            <section>
              <p>Mục tiêu</p>
              <p className="text-sm text-gray-400">
                Cập nhật lần cuối lúc 12:00 PM
              </p>
            </section>
            {Goals.map((d,j) => (
             <Accordion type="single" collapsible >
             <AccordionItem value="item-1">
               <AccordionTrigger>
               <div className ='grid grid-cols-1 gap-4' style={{width:"100%"}}> 
                  <div className='flex justify-between'>
                  <div className='flex gap-4 '>
                      <div className = 'w-20 '>
                              <DonutChart 
                              chartLabel = { d.weight}
                                size={50}
                                thickness={8}
                                data={d.kpis.map((kpi,i) => ({
                                  name: kpi.name,
                                  value: kpi.weight,
                                  color: getProgressColor(progressData[j].progressKPIs[i].dpk),
                                }))} 
                                className="absolute"
                                style={{zIndex: 1000-j }}
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
                    <Progress style={{width:"100%"}} size="md" value={progressData[j].progressGoal} 
                    color= {getProgressColor(progressData[j].dpg)} 
                    />
                  </div>
                  </div>
                  </div>
                    
                </div>
               </AccordionTrigger>    
               <AccordionContent>
                  <section className="flex flex-col gap-4" style={{width:"100%"}}>
                    
                    <div className="grid grid-cols-12 ">
                           <p className="text-sm text-gray-400">Thang đo KPI</p>
                           <p className="text-sm text-gray-400 text-right col-start-5 ">Đã đạt</p>
                           <p className="text-sm text-gray-400 text-right col-start-6">Chỉ tiêu</p>
                           <p className="text-sm text-gray-400 text-center col-start-7">Đơn vị đo</p>
                           <p className="text-sm text-gray-400 text-right col-start-8">Trọng số</p>
                           <p className="text-sm text-gray-400 text-right col-start-12">Cập nhật</p>

                    </div>
                      {d.kpis.map((kpi,i) => (
                        <div className="grid grid-cols-12  items-center">
                          
                            <p className='truncate col-span-3'>{kpi.name}</p>
                            <p className="text-right col-start-5">{kpi.actual} </p>
                            <p className="text-right col-start-6">{kpi.target} </p>
                            <p className="text-center col-start-7">_</p>
                            <p className="text-right col-start-8">{kpi.weight} </p>
                            
                            <div className='col-span-1 col-start-11'>
                            <Progress 
                            value={kpi.actual * 100.0 / kpi.target} size={'sm'} 
                            color= {getProgressColor(progressData[j].progressKPIs[i].dpk)}
                            />
                            </div>
                            <p>{progressData[j].progressKPIs[i].progressKPI.toFixed(1)}%</p>
                            <div className= " col-span-1 col-start-13 text-right"> 
                            <Group>
                              <ActionIcon autoContrast aria-label="autoContrast action icon" size="lg" color="lime.4">
                                <IconFingerprint size={20} />
                              </ActionIcon>
                            </Group>
                            
                            
                          </div>
                        </div>
                      ))}
                    
                  </section>
               </AccordionContent>
             </AccordionItem>
           </Accordion>
           
            ))}
          </CardContent>
      </MantineProvider>
    );
  }
  