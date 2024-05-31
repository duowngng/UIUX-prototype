/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */
"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";

type Props = {};

const columns = [
  {
    accessorKey: "category",
    header: ""
  },
  {
    accessorKey: "value",
    header: ""
  }
];
const data = [
  {
    category: "Tài khoản",
    value: true
  },
  {
    category: "Thông báo",
    value: false
  },
  {
    category: "Ngôn ngữ",
    value: "Tiếng Việt"
  },
  {
    category: "Giao diện",
    value: "Tối"
  }
];

export default function TrangCàiĐặt({}: Props) {
  return (
    <div className="flex flex-col gap-5 p-8 pt-6 w-full">
      <PageTitle title="Cài đặt" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
