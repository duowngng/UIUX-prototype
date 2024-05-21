"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import TemplatesCollapsible from "./template-collapsible";
import { Input } from "@/components/ui/input";
import { CellAction } from "./cell-action";

import { ChevronDown, ChevronUp, X, ArrowUpDown, ChevronsLeftRightIcon, ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

import data from "@/app/data.json";

export default function TemplatesTable() {
  const templates = data.templates;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openStates, setOpenStates] = useState({});

  const toggleOpenState = (id: any) => {
    setOpenStates({
      ...openStates,
      [id]: !openStates[id]
    });
  };

  const renderSortIcon = (column) => {
    const sort = column.getIsSorted();
    if (!sort) {
      return <ChevronsLeftRightIcon className="ml-2 h-4 w-4 rotate-90" />;
    }
    return sort === 'desc' ? <ArrowDownIcon className="ml-2 h-4 w-4" /> : <ArrowUpIcon className="ml-2 h-4 w-4" />;
  };

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
        {
          accessorKey: 'name',
          header: ({ column }) => {
            const className = "cursor-pointer select-none flex items-center";
            const title = "Tên mẫu mục tiêu";
            if (!column.getCanSort()) {
              return <div className={className}>{title}</div>;
            }
            return (
              <div className={className}>
                <Button variant="ghost" size="icon" className="h-8 w-fit" onClick={column.getToggleSortingHandler()}>
                  <span>{title}</span>
                  {renderSortIcon(column)}
                </Button>
              </div>
            );
          },
        },
        {
        accessorKey: 'description',
        header: ({ column }) => {
          const className = "cursor-pointer select-none flex items-center";
          const title = "Mô tả";
          if (!column.getCanSort()) {
            return <div className={className}>{title}</div>;
          }
          return (
            <div className={className}>
              <Button variant="ghost" size="icon" className="h-8 w-fit" onClick={column.getToggleSortingHandler()}>
                <span>{title}</span>
                {renderSortIcon(column)}
              </Button>
            </div>
          );
        },
      },
      {
        accessorKey: 'weight',
        header: ({ column }) => {
          const className = "cursor-pointer select-none flex items-center";
          const title = "Trọng số";
          if (!column.getCanSort()) {
            return <div className={className}>{title}</div>;
          }
          return (
            <div className={className}>
              <Button variant="ghost" size="icon" className="h-8 w-fit" onClick={column.getToggleSortingHandler()}>
                <span>{title}</span>
                {renderSortIcon(column)}
              </Button>
            </div>
          );
        },
        cell: ({ row }) => <div className="w-[150px]">{row.original.weight}</div>,
        style: { width: '150px' },
      },
      {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />,
      },
      {
        id: 'toggle',
        cell: ({ row }) => (
          openStates[row.original.id] ? <ChevronUp size={24} className="cursor-pointer" onClick={() => toggleOpenState(row.original.id)} /> : <ChevronDown size={24} className="cursor-pointer" onClick={() => toggleOpenState(row.original.id)} />
        ),
      },
    ],
    [openStates]
  );

  const table = useReactTable({
    data: templates,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setColumnFilters([{ id: 'name', value: e.target.value }]);
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center py-4 max-w-sm">
        <Input
          placeholder="Tìm kiếm"
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
        {searchTerm && (
          <X
            onClick={() => handleSearch({ target: { value: '' } })}
            size={16}
            className="absolute right-2 cursor-pointer ml-2"
          />
        )}
      </div>
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <Collapsible asChild key={row.id}>
                <>
                  <CollapsibleTrigger asChild onClick={() => toggleOpenState(row.original.id)}>
                    <TableRow>
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  </CollapsibleTrigger>
                  <CollapsibleContent asChild>
                    <TemplatesCollapsible templateId={row.original.id} />
                  </CollapsibleContent>
                </>
              </Collapsible>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
