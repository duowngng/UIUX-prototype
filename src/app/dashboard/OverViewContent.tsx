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
import data from "@/app/data.json";

import { List, ThemeIcon, rem } from '@mantine/core';
import { IconCircleDotted,IconCircleDashed ,IconCircle, IconCircleCheck} from '@tabler/icons-react';
import { IconFingerprint } from '@tabler/icons-react';
import { ActionIcon, Group } from '@mantine/core'; 


    


export type Cycle = typeof data.cycles[0];
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
            <div className='absolute text-5xl font-black ml-16'>{cycleProgress} </div>
          <DonutChart   
          withLabelsLine withLabels style={{zIndex: 9999 }}   size={150} thickness={17} 
          data={Goals.map((goal,i) => ({
                                  name: goal.name,
                                  value: Number(progressData[i].progressGoal.toFixed(1)),
                                  color: getProgressColor(progressData[i].dpg),         
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
                            }>Xuất sắc</List.Item>
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
              <p className="p-4 font-semibold text-red-500 ">KPI đến lịch cập nhật</p>
              <div className="grid grid-cols-12  items-center">
              <p className= 'text-sm text-gray-400 col-span-2'>Cập nhật</p>
              <p className= 'text-sm text-gray-400 col-start-3 col-span-3'>Tên KPI</p>
              </div>
            <div>
            <div className="grid grid-cols-12  items-center">
            <div className= " col-span-1 col-start-1 text-right"> 
                          <Group>
                            <ActionIcon autoContrast aria-label="autoContrast action icon" size="lg" color="lime.4">
                              <IconFingerprint size={20} />
                            </ActionIcon>
                          </Group>
                          
                          
                        </div>
                          <p className='truncate col-start-3 col-span-3'>{Goals[1].kpis[1].name}</p>
                          
                          <div className='col-span-2 col-start-8'>
                          <Progress 
                          value={Goals[1].kpis[1].actual * 100.0 / Goals[1].kpis[1].target} size={'sm'} 
                          color= {getProgressColor(progressData[1].progressKPIs[1].dpk)}
                          />
                          </div>
                          <p className= 'col-start-11'>{progressData[1].progressKPIs[1].progressKPI.toFixed(1)}%</p>
                        
                      </div>
            
            </div>
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
          {/*  */}
        </section>
      </MantineProvider>
    );
  }
  

