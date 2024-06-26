/** @format */

import React from "react";
import { LucideIcon,Crosshair,Clock3,Calendar} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
export type CardProps = {
  label: string;
  amount: number;
  progress: number;
  dateRange: {
    from:String;
    to: String;
  };
  numDays: number;
  cnumDays: number;
};

export default function Card(props: CardProps) {
  return (
    <CardContent className= "grid content-between">
      <section className="flex justify-between ">
        {/* label */}
        <p className="text-sm">{props.label}</p>
      </section> 
      <div>
          <section className="flex flex-col py-4">
            <h2 className="text-5xl font-semibold">{props.progress}%</h2>
          </section>
          <section className="flex justify-between  items-center">
            <Progress value={props.progress} />
            </section>
        </div>       
      
      <section className="align-bottom flex flex-col gap-1">
        <div className="flex gap-4 items-center">
          <Crosshair className="h-4 w-4 text-gray-400" />
          <p className="truncate">{props.amount} MT cá nhân - 0 MT gián tiếp</p>
        </div>
        <div className="flex gap-4 items-center">
          <Clock3 className="h-4 w-4 text-gray-400" />
          <p className={`truncate`}>
            Ngày thứ <span className={`truncate ${props.cnumDays > props.numDays ? 'text-red-500' : 'text-green-500'}` }>{props.cnumDays}</span> trên {props.numDays}
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <Calendar className="h-4 w-4 text-gray-400" />
          <p className="truncate">Chu kì :{props.dateRange.from} đến {props.dateRange.to}</p>
        </div>

      </section>
    </CardContent>
  );
}
 
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
        props.className
      )}
    />
  );
}


