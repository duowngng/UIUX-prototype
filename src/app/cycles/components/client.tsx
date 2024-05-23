"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table";

import { CycleColumn, columns } from "./columns";
import CycleList from "./cycle-list";

interface CycleClientProps {
  data: CycleColumn[];
}

export const CycleClient: React.FC<CycleClientProps> = ({
  data
}) => {
  const router = useRouter();
  
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Chu kỳ`}
          description="Quản lý chu kỳ"
        />
        <Button onClick={() => router.push(`/cycles/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Tạo mới
        </Button>
      </div>
      <Separator />
      {/* <DataTable searchKey="name" columns={columns} data={data}/> */}
      <CycleList data={data}/>
    </>
  );
}