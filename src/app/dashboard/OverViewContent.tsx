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

const Goals = cycles[0].goals;
const currentCycle = cycles[0];
const fromDate = new Date(currentCycle.dateRange.from.toString());
const toDate = new Date(currentCycle.dateRange.to.toString());
const timeDiff = Math.abs(toDate.getTime() - fromDate.getTime());
const Currentime = new Date();
const ctimeDiff = Math.abs(Currentime.getTime() - fromDate.getTime());
const numDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
const cnumDays = Math.ceil(ctimeDiff / (1000 * 3600 * 24));
const cardData_1 = {
      label: cycles[0].id,
      amount: Goals.length,
      progress: 20,
      dateRange: cycles[0].dateRange,
      numDays: numDays,
      cnumDays: cnumDays
    }
  ;


  export default function OverviewContent() {
    return (
      <MantineProvider> 
        <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-3 justify-between ">
        
            <Card
              amount={cardData_1.amount}
              progress={cardData_1.progress}
              label={cardData_1.label}
              dateRange={cardData_1.dateRange}
              numDays={cardData_1.numDays}
              cnumDays={cardData_1.cnumDays}
            />
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
            {Goals.map((d,i) => (
             <Accordion type="single" collapsible >
             <AccordionItem value="item-1">
               <AccordionTrigger>
               <div className ='grid grid-cols-1 gap-4' style={{width:"100%"}}> 
                  <div className='flex justify-between'>
                  <div className='flex gap-4'>
                      <div className = ''>
                              <DonutChart
                                size={50}
                                thickness={8}
                                chartLabel={10}
                                data={d.kpis.map((kpi) => ({
                                  name: kpi.name,
                                  value: kpi.weight,
                                  color: kpi.actual/(0.000001+cnumDays)<kpi.target/numDays?'yellow.6':(kpi.actual/cnumDays<kpi.target/numDays?'indigo.6':'teal.6'),
                                }))}
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
                    <Progress style={{width:"100%"}} size="md" value={100*d.kpis.reduce((total, kpi) => total + kpi.actual*kpi.weight*1.0/kpi.target, 0) } />
                  </div>
                  </div>
                  </div>
                    
                </div>
               </AccordionTrigger>    
               <AccordionContent>
                  <section className="flex flex-col gap-4">
                    <p className="text-sm text-gray-400">Thang đo KPI</p>
                    <div className="grid grid-cols-1 gap-4">
                      {d.kpis.map((kpi) => (
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p>{kpi.name}</p>
                          </div>
                          <div>
                            <p>Hiện tại: {kpi.actual} - Chỉ tiêu:{kpi.target} </p>
                          </div>
                          <div>
                            <Progress 
                            value={kpi.actual * 100.0 / kpi.target} size={'sm'} 
                            color= {kpi.actual/(0.000001+cnumDays)<kpi.target/numDays?'yellow.6':(kpi.actual/cnumDays<kpi.target/numDays?'indigo.6':'teal.6')}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
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
  