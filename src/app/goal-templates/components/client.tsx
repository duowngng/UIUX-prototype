"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table";

import { TemplateColumn, columns } from "./columns";
import TemplatesTable from "./template-table";
import CycleList from "@/app/cycles/components/cycle-list";

interface TemplateClientProps {
  data: TemplateColumn[];
}

export const TemplateClient: React.FC<TemplateClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();
  
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Mẫu mục tiêu`}
          description="Quản lí mẫu mục tiêu"
        />
        <Button onClick={() => router.push(`/goal-templates/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Tạo mới
        </Button>
      </div>
      <Separator />
      {/* <DataTable searchKey="name" columns={columns} data={data}/> */}
      <TemplatesTable/>
    </>
  );
}