import { Check, Plus, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { insertCategorySchema } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const formSchema = insertCategorySchema.pick({ name: true });

type FormValues = z.input<typeof formSchema>;

type CategoryFormProps = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  isLoadingDelete?: boolean;
  className?: string;
};

export function CategoryForm({
  onSubmit,
  defaultValues,
  disabled = false,
  id,
  onDelete,
  isLoading = false,
  isLoadingDelete = false,
  className,
}: CategoryFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("space-y-4 pt-4", className)}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end lg:flex-col lg:items-start">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-grow lg: w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="e.g Cash, Bank, Credit Card"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            disabled={disabled || !form.formState.isDirty}
            className="w-full md:w-min lg:w-full"
            isLoading={isLoading}
          >
            {id ? <Check /> : <Plus />}
            {id ? "Save changes" : "Create category"}
          </Button>

          {!!id && (
            <Button
              type="button"
              disabled={disabled}
              onClick={handleDelete}
              className="w-full md:w-min lg:w-full"
              variant="outline"
              isLoading={isLoadingDelete}
            >
              <Trash className="size-4 mr-2" />
              Delete category
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
