"use client"

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { TemplateColumn } from "./columns";
import { AlertModal } from "@/components/modals/alert-modal";
import axios from "axios";

interface CellActionProps {
  data: TemplateColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID đã được sao chép");
  }

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/goal-templates/${data.id}`);
      router.refresh();
      window.location.assign(`/goal-templates`);
      toast.success("Đã xóa thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

  return (
    <>
      <AlertModal 
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={handleDropdownClick}>
          <DropdownMenuLabel>
            Hành động
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={(e) => { handleDropdownClick(e); onCopy(data.id); }}>
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => { handleDropdownClick(e); router.push(`/goal-templates/${data.id}`); }}>
            <Edit className="mr-2 h-4 w-4" />
            Chỉnh sửa
          </DropdownMenuItem>
          <DropdownMenuItem onClick={(e) => { handleDropdownClick(e); setOpen(true); }}>
            <Trash className="mr-2 h-4 w-4" />
            Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
