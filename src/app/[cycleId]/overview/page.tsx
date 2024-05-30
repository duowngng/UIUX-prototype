/** @format */
"use client";
import { Tabs } from "@mantine/core";
import { Separator } from "@/components/ui/separator";
import OverviewContent from "./components/OverViewContent";
import GoalContent from "./components/GoalContent";
import HistoryContent from "./components/HistoryContent";
import { useState } from "react";
import { Input, MantineProvider, Select } from "@mantine/core";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import data from "@/app/data.json";
import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import { Heading } from "@/components/ui/heading";

import { useRouter } from "next/navigation";

const Home = ({ params }: { params: { cycleId: string } }) => {
  const selectData = data.cycles.map((cycle) => `${cycle.id}`);
  let curCycle;
  for (const key in data.cycles) {
    if (data.cycles[key].id === params.cycleId) {
      curCycle = data.cycles[key];
      break;
    }
  }
  if (curCycle === undefined) {
    curCycle = data.cycles[0];
  }
  const router = useRouter();
  const [selectedContent, setSelectedContent] = useState("Tổng quan");

  return (
    <MantineProvider>
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between">
            <Heading title={`Trang chủ`} description="Thông tin chu kỳ" />
            <div className="w-fit mr-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Xuất
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Kết quả chu kỳ </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>CSV</DropdownMenuItem>
                  <DropdownMenuItem>PDF</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Separator />
          <div className="grid  grid-cols-2 gap-8">
            <Input className="self-end" placeholder="Tìm kiếm" />

            <Select
              placeholder={curCycle.id}
              data={selectData}
              withScrollArea={false}
              className="self-center"
              description="Chọn chu kỳ"
              styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
              mt="md"
              onChange={(value) => router.push(`/${value}/overview`)}
            />
          </div>
          <Tabs defaultValue="Tổng quan">
            <Tabs.List className="mb-4">
              <Tabs.Tab value="Tổng quan" leftSection={""}>
                Tổng quan
              </Tabs.Tab>
              <Tabs.Tab value="Mục tiêu" leftSection={""}>
                Mục tiêu
              </Tabs.Tab>
              <Tabs.Tab value="Lịch sử" leftSection={""}>
                Lịch sử
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="Tổng quan">
              <OverviewContent cycle={curCycle} />
            </Tabs.Panel>

            <Tabs.Panel value="Mục tiêu">
              <GoalContent cycle={curCycle} />
            </Tabs.Panel>

            <Tabs.Panel value="Lịch sử">
              <HistoryContent cycle={curCycle} />
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </MantineProvider>
  );
};
export default Home;
