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
import { Input } from "@/components/ui/input";
import { cn, convertAmountToMiliunits } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { insertTransactionSchema } from "@/db/schema";
import { Select } from "@/components/select";
import { DatePicker } from "@/components/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { InputAmount } from "@/components/amount-input";

const formSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  amount: z.string(),
  notes: z.string().nullable().optional(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const apiSchema = insertTransactionSchema.omit({ id: true });

type FormValues = z.input<typeof formSchema>;
type ApiFromValues = z.input<typeof apiSchema>;

type TransactionFormProps = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: ApiFromValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  isLoadingDelete?: boolean;
  className?: string;
  accountOptions: { label: string; value: string }[];
  categoryOptions: { label: string; value: string }[];
  onCreateAccount: (name: string) => void;
  onCreateCategory: (name: string) => void;
};

export function TransactionForm({
  onSubmit,
  defaultValues,
  disabled = false,
  id,
  onDelete,
  isLoading = false,
  isLoadingDelete = false,
  className,
  accountOptions,
  categoryOptions,
  onCreateAccount,
  onCreateCategory,
}: TransactionFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit({
      ...values,
      amount: convertAmountToMiliunits(parseFloat(values.amount)),
    });
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
            name="date"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-grow lg: w-full">
                <FormControl>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="accountId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-grow lg: w-full">
                <FormLabel>Account</FormLabel>
                <FormControl>
                  <Select
                    placeholder="Select an account"
                    options={accountOptions}
                    onCreate={onCreateAccount}
                    disabled={disabled}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="categoryId"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-grow lg: w-full">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    placeholder="Select a category"
                    options={categoryOptions}
                    onCreate={onCreateCategory}
                    disabled={disabled}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="payee"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-grow lg: w-full">
                <FormLabel>Payee</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={disabled}
                    placeholder="Add a payee"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-grow lg: w-full">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <InputAmount
                    {...field}
                    disabled={disabled}
                    placeholder="0.00"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="notes"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-grow lg: w-full">
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ""}
                    disabled={disabled}
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
            {id ? "Save changes" : "Create transaction"}
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
              Delete transaction
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
