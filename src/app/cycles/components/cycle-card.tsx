import Image from "next/image";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";

import { Edit, FolderInputIcon, MoreHorizontal, MoreVertical, Trash, TrashIcon } from "lucide-react";
import { useTheme } from "next-themes";

import BarChart from "@/components/shared/icons/bar-chart";
import Check from "@/components/shared/icons/check";
import Copy from "@/components/shared/icons/copy";
import { Button } from "@/components/ui/button";
import { Gauge } from "@/components/ui/gauge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

type CyclesCardProps = {
  cycle: any;
};
export default function CyclesCard({
  cycle
}: CyclesCardProps) {
  const router = useRouter();
  const { theme, systemTheme } = useTheme();
  const isLight =
    theme === "light" || (theme === "system" && systemTheme === "light");

  const [isFirstClick, setIsFirstClick] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const calculateCycleCompletion = () => {
    let weightedGoalScores = 0;
    let totalGoalWeights = 0;
    if (cycle.goals){
    for (const goal of cycle.goals) {
      let weightedKpiScores = 0;
      let totalKpiWeights = 0;

      for (const kpi of goal.kpis) {
        const kpiCompletion = Math.min(kpi.actual / kpi.target * 100, 100); // Cap at 100%
        weightedKpiScores += kpiCompletion * kpi.weight;
        totalKpiWeights += kpi.weight;
      }
      const goalScore = weightedKpiScores / totalKpiWeights;
      weightedGoalScores += goalScore * goal.weight;
      totalGoalWeights += goal.weight;
    }
    }
    const cycleCompletion = Math.round(weightedGoalScores / totalGoalWeights);

    return cycleCompletion;
  };

  const cycleCompletion = calculateCycleCompletion();

  // Determine color class based on completion
  const progressColorClass = 
    cycleCompletion < 30 ? 'text-red-500' :
    cycleCompletion < 50 ? 'text-yellow-400' :
    cycleCompletion < 100 ? 'text-sky-400' :
    'text-green-500';

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
    //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    //     setMenuOpen(false);
    //     setIsFirstClick(false);
    //   }
    // }

    // cycle.addEventListener("mousedown", handleClickOutside);
    // return () => {
    //   cycle.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID đã được sao chép");
  }

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/cycles/${cycle.id}`);
      router.refresh();
      window.location.assign(`/cycles`);
      toast.success("Đã xóa thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  const handleButtonClick = (event: any, cycleId: string) => {
    event.stopPropagation();
    event.preventDefault();

    if (isFirstClick) {
      handleDeleteCycle(cycleId);
      setIsFirstClick(false);
      setMenuOpen(false); // Close the dropdown after deleting
    } else {
      setIsFirstClick(true);
    }
  };

  const handleDeleteCycle = async (cycleId: string) => {

  };

  const handleMenuStateChange = (open: boolean) => {
    if (isFirstClick) {
      setMenuOpen(true); // Keep the dropdown open on the first click
      return;
    }

    // If the menu is closed, reset the isFirstClick state
    if (!open) {
      setIsFirstClick(false);
      setMenuOpen(false); // Ensure the dropdown is closed
    } else {
      setMenuOpen(true); // Open the dropdown
    }
  };

  return (
    <>
      <li className="group/row relative flex items-center justify-between rounded-lg border-0 p-3 ring-1 ring-gray-200 transition-all hover:bg-secondary hover:ring-gray-300 dark:bg-secondary dark:ring-gray-700 hover:dark:ring-gray-500 sm:p-4">
        <div className="flex min-w-0 shrink items-center space-x-2 sm:space-x-4">
          <div className="mx-0.5 flex w-8 items-center justify-center text-center sm:mx-1">
            <Gauge value={cycleCompletion} size="small" showValue={true} color={progressColorClass} bgcolor="text-gray-200" />
          </div>

          <div className="flex">
            <div className="flex-col items-center">
              <h1 className="min-w-0 max-w-[150px] truncate font-bold leading-6 text-foreground sm:max-w-md">
                <Link
                  href={`/${cycle.id}`}
                  className="w-full truncate"
                >
                  <span>{cycle.name}</span>
                  <span className="absolute inset-0" />
                </Link>
              </h1>
              {/* <div className="ml-2 flex">
                <button
                  className="group z-10 rounded-md bg-gray-200 p-1 transition-all duration-75 hover:scale-105 hover:bg-emerald-100 active:scale-95 dark:bg-gray-700 hover:dark:bg-emerald-200"
                  onClick={() =>
                    handleCopyToClipboard(cycle.links[0].id)
                  }
                  title="Copy to clipboard"
                >
                  {isCopied ? (
                    <Check className="size-3 text-muted-foreground group-hover:text-emerald-700" />
                  ) : (
                    <Copy className="size-3 text-muted-foreground group-hover:text-emerald-700" />
                  )}
                </button>
              </div> */}
              <div className="mt-1 flex items-center space-x-1 text-sm leading-5 text-muted-foreground">
                <p className="truncate">
                {cycle.goals ? cycle.goals.length : 0} mục tiêu
                </p>
              </div>
            </div>
            

          </div>
        </div>
        
        <div className="mt-1 mr-20 ml-auto flex items-center space-x-1">
          <h2 className="truncate">{cycle.startDate}</h2>
          <h2>–</h2>
          <h2 className="truncate">{cycle.endDate}</h2>
        </div>
        
        <div className="flex flex-row space-x-2">
          <DropdownMenu open={menuOpen} onOpenChange={handleMenuStateChange}>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className="z-10 h-8 w-8 border-gray-200 bg-transparent p-0 hover:bg-gray-200 dark:border-gray-700 hover:dark:bg-gray-700 lg:h-9 lg:w-9"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" ref={dropdownRef}>
              <DropdownMenuLabel>Hành động</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onCopy(cycle.id)}>
                <Copy className="mr-2 h-4 w-4" />
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/cycles/${cycle.id}`)}>
                <Edit className="mr-2 h-4 w-4" />
                Chỉnh sửa
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className="mr-2 h-4 w-4" />
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </li>
    </>
  );
}
