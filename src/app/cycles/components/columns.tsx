"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"


export type CycleColumn = {
  id: string
  name: string
  startDate: string
  endDate: string
}

export const columns: ColumnDef<CycleColumn>[] = [
  {
    accessorKey: "name",
    header: "Tên chu kỳ",
  },
  {
    accessorKey: "startDate",
    header: "Ngày bắt đầu",
  },
  {
    accessorKey: "endDate",
    header: "Ngày kết thúc",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original}/>
  }
]
