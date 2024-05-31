/** @format */
"use client";
import { MantineProvider } from "@mantine/core";
import { CardContent } from "@/components/Card";
import { DonutChart } from "@mantine/charts";
import { Progress } from "@mantine/core";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import data from "@/app/data.json";
import { ActionIcon, Group } from "@mantine/core";
import { Edit } from "lucide-react";

export type Cycle = (typeof data.cycles)[0];
export type CycleProps = {
  cycle: Cycle;
};
export default function OverviewContent(props: CycleProps) {
  const currentCycle = props.cycle;
  const Goals = currentCycle.goals;

  const fromDate = new Date(currentCycle.dateRange.from.toString());
  const toDate = new Date(currentCycle.dateRange.to.toString());
  const timeDiff = Math.abs(toDate.getTime() - fromDate.getTime());
  const Currentime = new Date();
  const ctimeDiff = Math.abs(Currentime.getTime() - fromDate.getTime());
  const numDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const cnumDays = Math.ceil(ctimeDiff / (1000 * 3600 * 24));
  const cycleProgress = Number(
    Goals.reduce(
      (total, goal) =>
        total +
        (goal.weight *
          goal.kpis.reduce(
            (total, kpi) =>
              total + (kpi.actual * kpi.weight * 1.0) / kpi.target,
            0
          )) /
          100,
      0
    ).toFixed(1)
  );

  const f = (cnumDays + 0.000001) / numDays;
  const dpc = cycleProgress / f;
  function getProgressColor(dp: number) {
    if (dp == 0) {
      return "gray.6";
    } else if (dp < 100) {
      return "yellow.6";
    } else if (dp < 120) {
      return "indigo.6";
    } else {
      return "teal.6";
    }
  }
  const progressData = Goals.map((goal) => {
    return {
      progressGoal: goal.kpis.reduce(
        (total, kpi) => total + (kpi.actual * kpi.weight * 1.0) / kpi.target,
        0
      ),
      dpg:
        goal.kpis.reduce(
          (total, kpi) => total + (kpi.actual * kpi.weight * 1.0) / kpi.target,
          0
        ) / f,
      progressKPIs: goal.kpis.map((kpi) => {
        return {
          progressKPI: (100.0 * kpi.actual) / kpi.target,
          dpk: (100.0 * kpi.actual) / kpi.target / f,
        };
      }),
    };
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
        {Goals.map((d, j) => (
          <Accordion type="single" key={d.id}>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-3 justify-between md:grid-cols-8">
                  <div className="grid grid-rows-3 grid-flow-col gap-y-1 gap-x-3">
                    <div className="row-span-full row-start-1">
                      <DonutChart
                        size={45}
                        thickness={8}
                        chartLabel={d.weight}
                        data={d.kpis.map((kpi, i) => ({
                          name: kpi.name,
                          value: kpi.weight,
                          color: getProgressColor(
                            progressData[j].progressKPIs[i].dpk
                          ),
                        }))}
                        style={{ zIndex: -j + 10 }}
                      />
                    </div>
                    <div className="col-span-2 row-start-1 row-span-2 truncate text-left md:col-span-5">
                      <p>
                        {d.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 truncate hover:text-clip">
                        {d.description}
                      </p>
                    </div>
                    <div className="truncate text-left row-start-3 row-span-1 col-span-3 md:col-span-5">
                      <p className="text-xs sm:text-sm text-indigo-600 ">
                        {currentCycle.dateRange.from}:
                        {currentCycle.dateRange.to}
                      </p>
                    </div>
                  </div>
                  <div className="md:col-end-8 md:col-span-4 md:self-center mr-4">
                    <Progress
                      style={{ width: "100%" }}
                      size="md"
                      value={progressData[j].progressGoal}
                      color={getProgressColor(progressData[j].dpg)}
                    />
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <section
                  className="flex flex-col gap-4"
                  style={{ width: "100%" }}
                >
                  <div className="grid grid-cols-12 border-b-2 pb-2">
                    <p className="text-xs text-nowrap md:text-sm text-gray-400">
                      Thang KPI
                    </p>
                    <p className="text-xs text-nowrap md:text-sm text-gray-400 text-right col-start-5 hidden">
                      Đã đạt
                    </p>
                    <p className="text-xs text-nowrap md:text-sm text-gray-400 text-left md:text-right col-start-5">
                      Chỉ tiêu
                    </p>
                    <p className=" text-xs text-nowrap md:text-sm text-gray-400 text-center col-start-7 hidden">
                      Đơn vị đo
                    </p>
                    <p className="text-xs text-nowrap md:text-sm text-gray-400 text-right col-start-8">
                      Trọng số
                    </p>
                    <p className="text-xs text-nowrap md:text-sm text-gray-400 text-left col-start-13">
                      Cập nhật
                    </p>
                  </div>
                  {d.kpis.map((kpi, i) => (
                    <div className="grid grid-cols-12  items-center" key={kpi.id}>
                      <p className="truncate col-span-3">{kpi.name}</p>
                      <p className="text-right col-start-5 hidden">
                        {kpi.actual}{" "}
                      </p>
                      <p className="text-right col-start-5">{kpi.target} </p>
                      <p className="text-center col-start-7 hidden ">_</p>
                      <p className="text-right col-start-8">{kpi.weight} </p>

                      <div className="col-span-1 col-start-11">
                        <Progress
                          value={(kpi.actual * 100.0) / kpi.target}
                          size={"sm"}
                          color={getProgressColor(
                            progressData[j].progressKPIs[i].dpk
                          )}
                        />
                      </div>
                      <p className="hidden">
                        {progressData[j].progressKPIs[i].progressKPI.toFixed(1)}
                        %
                      </p>
                      <div className=" col-span-1 col-start-13 text-right">
                        <Group>
                          <ActionIcon
                            autoContrast
                            aria-label="autoContrast action icon"
                            size="lg"
                            color="lime.4"
                          >
                            <Edit size={20} />
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
    </MantineProvider>
  );
}
