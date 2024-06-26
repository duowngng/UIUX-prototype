"use client";

import * as z from "zod";
import axios from "axios";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import { FancyMultiSelect } from "./fancy-multi-select";
import data from "@/app/data.json";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const formSchema = z.object({
  name: z.string().min(1, { message: "Tên không được để trống" }),
  dateRange: z.object(
      {
        from: z.date(),
        to: z.date(),
      },
      {
        required_error: "Ngày bắt đầu và kết thúc không được để trống",
      }
    ),
    goals: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        weight: z.number(),
        kpis: z.array(
          z.object({
            name: z.string(),
            weight: z.number(),
            target: z.number(),
            unit: z.string(),
            frequency: z.string(),
          })
        ),
      })
    ).optional(),
  })
  .refine((data) => data.dateRange.from < data.dateRange.to, {
    path: ["dateRange"],
    message: "Ngày bắt đầu phải trước ngày kết thúc",
  });

type CycleFormValues = z.infer<typeof formSchema>;

interface CycleFormProps {
  initialData: any;
}

export const CycleForm: React.FC<CycleFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();
  const scrollableRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Chỉnh sửa chu kỳ" : "Tạo chu kỳ";
  const description = initialData ? "Chỉnh sửa chu kỳ" : "Tạo chu kỳ mới";
  const toastMessage = initialData ? "Đã sửa chu kỳ" : "Đã tạo chu kỳ";
  const action = initialData ? "Lưu thay đổi" : "Tạo mới";

  const form = useForm<CycleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
      goals: [],
    },
  });

  const onSubmit = async (data: CycleFormValues) => {
    try {
      setLoading(true);
      let cycleId;
      console.log(data);
      if (initialData) {
        await axios.patch(`/api/cycles/${params.cycleId}`, data);
      } else {
        const response = await axios.post(`/api/cycles`, data);
        cycleId = response.data.id;
      }
      router.refresh();
      if (cycleId) {
        window.location.assign(`/${cycleId}/overview`);
      } else {
        window.location.assign(`/cycles`);
      }
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/cycles/${params.cycleId}`);
      router.refresh();
      window.location.assign(`/cycles`);
      toast.success("Đã xóa thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const templates = data.templates;

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between min-h-full">
        <Heading
          title={title}
          description={description}
        />
        {initialData && (
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
        )}
      </div>
      <Separator/>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid lg:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên chu kỳ</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Tên chu kỳ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ngày bắt đầu - Ngày kết thúc</FormLabel>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "dd/MM/yyyy")} - {format(field.value.to, "dd/MM/yyyy")}
                          </>
                        ) : (
                          format(field.value.from, "dd/MM/yyyy")
                        )
                      ) : (
                        <span>Chọn ngày</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center">
                  {/* <div ref={scrollableRef} className="max-h-[400px] overflow-y-auto"> */}
                  <ScrollArea className="max-h-[400px]">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value.from}
                      selected={{
                        from: field.value.from!,
                        to: field.value.to,
                      }}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                    />
                  <ScrollBar />
                  </ScrollArea>
                  {/* </div> */}
                  </PopoverContent>
                </Popover>
                <FormDescription>Lựa chọn thời gian bắt đầu và kết thúc</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <FormField
                control={form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mục tiêu</FormLabel>
                    <FormControl>
                      <FancyMultiSelect onChange={field.onChange} value={field.value}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit" >
            {action}
          </Button>
          <Button disabled={loading} variant="destructive" className="ml-4" type="button" onClick={() => router.push(`/cycles`)} >
            Hủy
          </Button>
        </form>
      </Form>
    </>
  );
};
