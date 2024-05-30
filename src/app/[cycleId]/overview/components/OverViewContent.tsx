/** @format */
"use client";
import { MantineProvider, TextInput } from "@mantine/core";
import { CardContent } from "@/components/Card";
import { useForm } from "@mantine/form";
import { DonutChart } from "@mantine/charts";
import { Progress } from "@mantine/core";
import React, { useState } from "react";
import { Modal } from "antd";
import { Crosshair, Clock3, Calendar } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import data from "@/app/data.json";

import { List, ThemeIcon, rem, Text } from "@mantine/core";
import {
  IconCircleDotted,
  IconCircleDashed,
  IconCircle,
  IconCircleCheck,
} from "@tabler/icons-react";
// import { Edit } from '@tabler/icons-react';
import { ActionIcon, Group, Button } from "@mantine/core";
import { Edit } from "lucide-react";

export type Cycle = (typeof data.cycles)[0];
export type CycleProps = {
  cycle: Cycle;
};
const OverviewContent: React.FC<CycleProps> = (props) => {
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
  //modal
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [loading, setLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("Đang phát triển chức năng cập nhật KPI");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
    },
  });
  return (
    <>
      <MantineProvider>
        <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-3 justify-between ">
          <CardContent className="grid content-between">
            <section className="flex justify-between ">
              {/* label */}
              <p className="text-sm">Tổng quan mục tiêu</p>
            </section>
            <div>
              <section className="flex flex-col py-4">
                <h2 className="text-3xl font-semibold">
                  {Number(cycleProgress)}%
                </h2>
              </section>

              <Progress
                value={cycleProgress}
                size={"lg"}
                color={getProgressColor(dpc)}
              />
            </div>

            <section className="align-bottom flex flex-col gap-1">
              <div className="flex gap-4 items-center">
                <Crosshair className="h-4 w-4 text-gray-400" />
                <p className="truncate text-xs">
                  {Goals.length} MT cá nhân - 0 MT gián tiếp
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <Clock3 className="h-4 w-4 text-gray-400" />
                <p className={`truncate text-xs`}>
                  Ngày thứ{" "}
                  <span
                    className={`truncate  text-xs ${
                      cnumDays > numDays ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {cnumDays}
                  </span>
                  /{numDays}
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <Calendar className="h-4 w-4 text-gray-400" />
                <p className="truncate text-xs">
                  Chu kì :{currentCycle.dateRange.from} đến{" "}
                  {currentCycle.dateRange.to}
                </p>
              </div>
            </section>
          </CardContent>
          <CardContent>
            <p className="text-sm">Trạng thái mục tiêu </p>
            <div className="flex gap-10 items-center flex-wrap justify-center">
              {/* <div className='absolute text-5xl font-black ml-16'>{cycleProgress} </div> */}
              <div>
                <DonutChart
                  chartLabel={"SL: " + Goals.length}
                  withLabelsLine
                  withLabels
                  style={{ zIndex: 1 }}
                  size={100}
                  thickness={17}
                  data={Goals.map((goal, i) => ({
                    name: goal.name,
                    value: Number(progressData[i].progressGoal.toFixed(1)),
                    color: getProgressColor(progressData[i].dpg),
                  }))}
                />
              </div>

              <List
                spacing="xs"
                size="sm"
                center
                className="md:flex-auto md:flex-wrap "
              >
                <List.Item
                  icon={
                    <ThemeIcon color="teal.6" size={14} radius="xl">
                      <IconCircleCheck
                        style={{ width: rem(16), height: rem(16) }}
                      />
                    </ThemeIcon>
                  }
                  className="text-xs"
                >
                  Xuất sắc
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="indigo.6" size={14} radius="xl">
                      <IconCircle style={{ width: rem(16), height: rem(16) }} />
                    </ThemeIcon>
                  }
                  className="text-xs"
                >
                  Đúng tiến độ
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="yellow.6" size={14} radius="xl">
                      <IconCircleDashed
                        style={{ width: rem(16), height: rem(16) }}
                      />
                    </ThemeIcon>
                  }
                  className="text-xs"
                >
                  Chậm tiến độ
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="gray.6" size={14} radius="xl">
                      <IconCircleDotted
                        style={{ width: rem(16), height: rem(16) }}
                      />
                    </ThemeIcon>
                  }
                  className="text-xs"
                >
                  Chưa làm
                </List.Item>
              </List>
              <div></div>
            </div>
          </CardContent>

          <CardContent className="row-start-1 h-60  md:col-start-3 md:h-64 ">
            <p className="text-sm  ">KPI đến lịch cập nhật</p>
            <div className="grid grid-cols-7  items-center border-b-2 pb-2">
              <p className="text-xs md:text-sm text-gray-400 col-start-1 col-span-2">
                Tên KPI
              </p>
              <p className="text-xs md:text-sm text-gray-400 col-end-8 col-span-3 text-right">
                Cập nhật
              </p>
            </div>
            <div className=" overflow-y-scroll text-sm">
              {Goals.map((goal, i) =>
                goal.kpis.map((kpi, j) => {
                  if (progressData[i].progressKPIs[j].dpk < 100)
                    return (
                      <div
                        className="grid grid-cols-7  items-center gap-0.5"
                        key={`${i}-${j}`}
                      >
                        <p className="truncate col-start-1 col-span-2">
                          {kpi.name}
                        </p>
                        <div className="col-span-2 col-start-4">
                          <Progress
                            value={(kpi.actual * 100.0) / kpi.target}
                            size={"sm"}
                            color={getProgressColor(
                              progressData[i].progressKPIs[j].dpk
                            )}
                          />
                        </div>
                        <p className="col-start-6 text-xs ">
                          {progressData[i].progressKPIs[j].progressKPI.toFixed(
                            1
                          )}
                          %
                        </p>
                        <div className=" col-span-1 col-end-8 justify-self-end text-right">
                          <ActionIcon
                            autoContrast
                            aria-label="autoContrast action icon"
                            size="lg"
                            color="gray.2"
                            onClick={showModal}
                          >
                            <Edit size={15} />
                          </ActionIcon>
                        </div>
                      </div>
                    );
                })
              )}
            </div>
          </CardContent>
        </section>
        <section className="grid grid-cols-1  gap-4 transition-all ">
          <CardContent className="flex justify-between gap-4">
            <section>
              <p>Mục tiêu</p>
              <p className="text-sm text-gray-400">
                Cập nhật lần cuối lúc 12:00 PM 27-05-2024
              </p>
            </section>
            {Goals.map((d, j) => (
              <Accordion key={d.id} type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2  justify-between md:grid-cols-4">
                      <div className="grid grid-rows-3 grid-flow-col gap-y-1 gap-x-3 md:col-start-1 md:col-span-2  md:grid-cols-10">
                        <div
                          className="row-span-full row-start-1 self-center justify-self-center"
                          style={{ zIndex: -j + Goals.length }}
                        >
                          <DonutChart
                            size={45}
                            thickness={8}
                            chartLabel={d.weight}
                            data={d.kpis.map((kpi, i) => ({
                              key: kpi.id,
                              name: kpi.name,
                              value: kpi.weight,
                              color: getProgressColor(
                                progressData[j].progressKPIs[i].dpk
                              ),
                            }))}
                          />
                        </div>
                        <div className="col-span-2 row-start-1 row-span-2 truncate text-left md:col-span-7 md:col-start-2">
                          <p>
                            {d.id}-{d.name}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600 truncate hover:text-clip">
                            {d.description}
                          </p>
                        </div>
                        <div className="truncate text-left row-start-3 row-span-1 col-span-3 md:col-span-4 md:col-start-2">
                          <p className="text-xs sm:text-sm text-gray-600 md:col-span-4 md:col-start-2">
                            {currentCycle.dateRange.from}:
                            {currentCycle.dateRange.to}
                          </p>
                        </div>
                      </div>
                      <div className="md:col-end-5 md:col-span-2 md:self-center mr-4">
                        <Progress
                          style={{ width: "100%", zIndex: 0 }}
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
                          Thang đo KPI
                        </p>
                        <p className="text-xs text-nowrap md:text-sm text-gray-400 text-right col-start-4 hidden md:block">
                          Đã đạt
                        </p>
                        <p className="text-xs text-nowrap md:text-sm text-gray-400 text-right col-start-5">
                          Chỉ tiêu
                        </p>
                        <p className=" text-xs text-nowrap md:text-sm text-gray-400 text-right col-start-6 hidden md:block">
                          Đơn vị
                        </p>
                        <p className=" text-xs text-nowrap md:text-sm text-gray-400 text-right col-start-7 hidden md:block">
                          Tần suất
                        </p>
                        <p className="text-xs text-nowrap md:text-sm text-gray-400 text-right col-start-8">
                          Trọng số
                        </p>
                        <p className="text-xs text-nowrap md:text-sm text-gray-400 text-right col-end-13">
                          Cập nhật
                        </p>
                      </div>
                      {d.kpis.map((kpi, i) => (
                        <div
                          className="grid grid-cols-12  items-center"
                          key={kpi.id}
                        >
                          <p className="truncate col-span-3">{kpi.name}</p>
                          <p className="text-right col-start-4 hidden md:block">
                            {kpi.actual}{" "}
                          </p>
                          <p className="text-right col-start-5">
                            {kpi.target}{" "}
                          </p>
                          <p className="text-right col-start-6 hidden md:block">
                            {kpi.unit}
                          </p>
                          <p className="text-right col-start-7 hidden md:block">
                            {kpi.frequency}
                          </p>
                          <p className="text-right col-start-8">
                            {kpi.weight}{" "}
                          </p>

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
                            {progressData[j].progressKPIs[
                              i
                            ].progressKPI.toFixed(1)}
                            %
                          </p>
                          <div className=" col-span-1 col-end-13 text-right justify-self-end">
                            <ActionIcon
                              autoContrast
                              aria-label="autoContrast action icon"
                              size="lg"
                              color="gray.2"
                              onClick={showModal}
                            >
                              <Edit size={15} />
                            </ActionIcon>
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
        <Modal
          title="Title"
          open={open}
          closable={false}
          // onOk={handleOk}
          // confirmLoading={confirmLoading}

          // onCancel={handleCancel}
          footer={[
            <Button
              style={{ backgroundColor: "rgb(75,85,99)" }}
              className="mr-3"
            >
              Hủy
            </Button>,
            <Button
              style={{ backgroundColor: "rgb(13,148,136)" }}
              className="mr-3"
            >
              Cập nhật
            </Button>,
          ]}
        >
          <div>
            <TextInput />
            <TextInput />
          </div>
        </Modal>
      </MantineProvider>
    </>
  );
};

export default OverviewContent;
