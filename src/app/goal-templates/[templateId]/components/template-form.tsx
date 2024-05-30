"use client";

import * as z from "zod";

import { use, useRef, useState } from "react";

import { FilePlus2, Plus, Target, Trash } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage
} from "@/components/ui/form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import axios from "axios";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { FancyBox } from "./fancy-box";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  weight: z.coerce.number().min(1).max(100),
  kpis: z.array(
    z.object({
      name: z.string().min(1),
      weight: z.coerce.number().min(1).max(100),
      target: z.coerce.number().min(1),
      unit: z.object({
        value: z.string().min(1),
        label: z.string().min(1),
      }),
      frequency: z.string().min(1),
    })
  ),

})

type TemplateFormValues = z.infer<typeof formSchema>;

interface TemplateFormProps {
  initialData: any;
}

export const TemplateForm: React.FC<TemplateFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const title = initialData ? "Chỉnh sửa mẫu" : "Tạo mẫu";
  const description = initialData ? "Chỉnh sửa mẫu mục tiêu" : "Tạo mẫu mục tiêu mới";
  const toastMessage = initialData ? "Đã sửa mẫu" : "Đã tạo mẫu";
  const action = initialData ? "Lưu thay đổi" : "Tạo mới";
  const breadcrumb = initialData? "Chỉnh sửa" : "Tạo mới"
  
  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      weight: undefined,
      kpis: [],
    },
  });
  
  const { control, setValue, handleSubmit } = form;
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "kpis",
  });

  const handleFileChange = () => {
    const sampleData = {
      name: "Mẫu 1",
      description: "Mô tả mẫu 1",
      weight: 50,
      kpis: [
        {
          name: "KPI 1",
          weight: 50,
          target: 60,
          unit: {
            value: "gio",
            label: "Giờ",
          },
          frequency: "Hàng tuần"
        },
        {
          name: "KPI 2",
          weight: 50,
          target: 30,
          unit: {
            value: "sinhvien",
            label: "Sinh viên",
          },
          frequency: "Hàng tháng"
        }
      ]
    
    };
    setValue("name", sampleData.name);
    setValue("description", sampleData.description);
    setValue("weight", sampleData.weight);
    setValue("kpis", sampleData.kpis);
    toast.success("Đã nhập dữ liệu từ file");
  };

  const fileInputRef = useRef<HTMLInputElement>(null); 

  const handleOpenFileChooser = () => {
    fileInputRef.current?.click(); 
  };

  const onSubmit = async (data: TemplateFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/goal-templates/${params.templateId}`, data);
      } else {
      await axios.post(`/api/goal-templates`, data);
      }
      router.refresh();
      router.push(`/goal-templates`); 
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
      await axios.delete(`/api/goal-templates/${params.templateId}`);
      router.refresh();
      router.push(`/goal-templates`);
      toast.success("Đã xóa thành công");
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/goal-templates">Mẫu mục tiêu</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{breadcrumb}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
        {!initialData && (
        <label htmlFor="fileInput">
          <Button
            disabled={loading}
            onClick={handleOpenFileChooser}
          >
            <FilePlus2 className="mr-2 h-4 w-4" />
            Tạo mới từ File
          </Button>
          <input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </label>
      )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-row-3 gap-4 md:grid-cols-3 md:gap-8">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên mục tiêu</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Nhập tên mục tiêu"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Mô tả mục tiêu"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trọng số</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="1 - 100"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="kpis"
            render={() => (
              <FormItem className="flex flex-col space-y-6">
                <FormLabel>KPIs</FormLabel>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex flex-col gap-5 md:ml-20 ">
                    <div className="grid grid-cols-12 gap-4 mb-2">
                      <div className="flex flex-row col-span-11 gap-8">
                        <FormField
                          control={control}
                          name={`kpis.${index}.name`}
                          render={({ field }) => (
                            <FormItem className="w-1/2">
                              <FormLabel>{`KPI ${index + 1}`}</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nhập tên KPI"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`kpis.${index}.weight`}
                          render={({ field }) => (
                            <FormItem className="w-1/2">
                              <FormLabel>Trọng số</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="1 - 100"
                                  type="number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        className="mt-auto ml-auto"
                        disabled={loading}
                        variant="destructive"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      <div className="flex flex-row col-span-11 md:col-span-12 gap-8">
                        <FormField
                          control={control}
                          name={`kpis.${index}.target`}
                          render={({ field }) => (
                            <FormItem className="w-1/2 md:w-1/3">
                              <FormLabel>Chỉ tiêu</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nhập chỉ tiêu"
                                  type="number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`kpis.${index}.unit`}
                          render={({ field }) => (
                            <FormItem className="w-1/2 md:w-1/3">
                              <FormLabel>Đơn vị</FormLabel>
                              <FormControl>
                                <FancyBox onChange={field.onChange} value={field.value}/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                        control={control}
                        name={`kpis.${index}.frequency`}
                        render={({ field }) => (
                          <FormItem className="hidden md:block md:w-1/3">
                            <FormLabel>Tần suất cập nhật</FormLabel>
                            <Select 
                            onValueChange={(value) => {field.onChange(value);
                              console.log(field.value);
                            }} 
                            defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className={!field.value ? "text-muted-foreground" : "" } >
                                  <SelectValue placeholder="Chọn tần suất cập nhật"/>
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1lan">1 lần</SelectItem>
                                <SelectItem value="hangngay">Hàng ngày</SelectItem>
                                <SelectItem value="hangtuan">Hàng tuần</SelectItem>
                                <SelectItem value="hangthang">Hàng tháng</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                        />
                      </div>
                      <div className="flex flex-row col-span-11 md:hidden gap-8">
                        <FormField
                        control={control}
                        name={`kpis.${index}.frequency`}
                        render={({ field }) => (
                          <FormItem className="md:hidden w-full">
                            <FormLabel>Tần suất cập nhật</FormLabel>
                            <Select 
                            onValueChange={(value) => {field.onChange(value);
                              console.log(field.value);
                            }} 
                            defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className={!field.value ? "text-muted-foreground" : "" } >
                                  <SelectValue placeholder="Chọn tần suất cập nhật"/>
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1 lần">1 lần</SelectItem>
                                <SelectItem value="Hàng ngày">Hàng ngày</SelectItem>
                                <SelectItem value="Hàng tuần">Hàng tuần</SelectItem>
                                <SelectItem value="Hàng tháng">Hàng tháng</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                        />
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
                <FormMessage />
                <Button
                  className="mt-4"
                  variant="secondary"
                  size="icon"
                  type="button"
                  onClick={() => append({ name: "", weight: NaN, target: NaN, unit:undefined, frequency: ""})}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </FormItem>
            )}
          />
          <Separator />
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
          <Button disabled={loading} variant="destructive" className="ml-4" type="button" onClick={() => router.push(`/goal-templates`)} >
            Hủy
          </Button>
        </form>
      </Form>
    </>
  );
};