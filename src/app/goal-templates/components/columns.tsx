"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"


export type TemplateColumn = {
  id: string
  name: string
  description: string
  weight: number
  kpis: any[]
}

export const columns: ColumnDef<TemplateColumn>[] = [
  {
    accessorKey: "name",
    header: "Tên nhiệm vụ",
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  {
    accessorKey: "weight",
    header: "Trọng số",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original}/>
  }
]
