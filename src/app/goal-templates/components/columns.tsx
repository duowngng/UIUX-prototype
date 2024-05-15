"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"


export type BillboardColumn = {
  id: string
  name: string
  description: string
  weight: number
  kpis: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
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
    header: "Tỷ lệ",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original}/>
  }
]
