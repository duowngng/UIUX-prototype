"use client";

import * as z from "zod";

import { useState } from "react";

import { Trash } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  weight: z.coerce.number().min(1).max(100),
  kpis: z.array(
    z.object({
      name: z.string().min(1),
      weight: z.coerce.number().min(1).max(100),
    })
  )
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

  const title = initialData ? "Chỉnh sửa mẫu" : "Tạo mẫu";
  const description = initialData ? "Chỉnh sửa mẫu mục tiêu" : "Thêm mới mẫu mục tiêu";
  const toastMessage = initialData ? "Đã sửa mẫu" : "Đã tạo mẫu";
  const action = initialData ? "Lưu thay đổi" : "Tạo";

  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      weight: undefined,
      kpis: [],
    },
  });

  const { control, register, handleSubmit } = useForm<TemplateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      weight: undefined,
      kpis: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "kpis",
  });

  const onSubmit = async (data: TemplateFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        console.log("Update template", data);
      } else {
        console.log("Create template", data);
      }

      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);

      toast.success("Template deleted");
    } catch (error) {
      toast.error("Make sure to delete all catergories using this template first");
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
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
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
      <Separator />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
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
              <FormItem className="flex flex-col space-y-8">
                <FormLabel>KPIs</FormLabel>
                {fields.map((field, index) => (
                  <div key={field.id} className="flex flex-col gap-5 ml-20 ">
                    
                    <div className="grid grid-cols-12 gap-8">
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
                        className="w-fit mt-auto"
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                      >
                        Xóa
                      </Button>
                    </div>
                    <Separator />
                  </div>
                ))}
                <FormMessage />
                <Button
                  className="w-fit mt-4"
                  type="button"
                  onClick={() => append({ name: "", weight: NaN })}
                >
                  Thêm KPI
                </Button>
              </FormItem>
            )}
          />
          <Separator />
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};