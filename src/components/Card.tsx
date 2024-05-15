/** @format */

import React from "react";
import { LucideIcon,Crosshair,Clock3,Calendar} from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
export type CardProps = {
  label: string;
  icon: LucideIcon;
  amount: string;
  progress: number;
};

export default function Card(props: CardProps) {
  return (
    <CardContent>
      <section className="flex justify-between gap-2">
        {/* label */}
        <p className="text-sm">{props.label}</p>
      </section>        
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">{props.amount}</h2>
      </section>
      <section className="flex justify-between gap-2 items-center">
        <Progress value={props.progress} />
        <p>{props.progress}%</p>
        </section>
      <section className="flex flex-col gap-1">
        <div className="flex justify-between gap-2 items-center">
        Crosshair;,Clock3,Calendar
        
          <Progress value={props.progress} />
          <p>{props.progress}%</p>
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
