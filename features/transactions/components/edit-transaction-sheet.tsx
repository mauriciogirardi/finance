"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import { useConfirm } from "@/hooks/use-confirm";
import { useOpenTransaction } from "../hooks/use-open-transactions";
import { useGetTransaction } from "../api/use-get-transaction";
import { useUpdateTransaction } from "../api/use-update-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { TransactionForm } from "./transaction-form";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertTransactionSchema.omit({ id: true });
type FormValues = z.input<typeof formSchema>;

export function EditTransactionSheet() {
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction."
  );

  const { isOpen, onClose, id } = useOpenTransaction();

  const transactionQuery = useGetTransaction(id);
  const editMutation = useUpdateTransaction(id);
  const deleteMutation = useDeleteTransaction(id);
  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();
  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();

  const handleSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => onClose(),
      });
    }
  };

  const defaultValues = {
    amount: String(transactionQuery?.data?.amount) || "",
    notes: transactionQuery?.data?.notes || "",
    payee: transactionQuery?.data?.payee || "",
    accountId: transactionQuery?.data?.accountId || "",
    categoryId: transactionQuery?.data?.categoryId || "",
    date: transactionQuery?.data?.date
      ? new Date(transactionQuery?.data?.date)
      : new Date(),
  };

  const handleCreateAccount = (name: string) =>
    accountMutation.mutate({ name });

  const handleCreateCategory = (name: string) =>
    categoryMutation.mutate({ name });

  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const isPending =
    editMutation.isPending ||
    deleteMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;
  const isLoading =
    transactionQuery.isLoading ||
    accountQuery.isLoading ||
    categoryQuery.isLoading;

  return (
    <>
      <ConfirmationDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader className="text-left">
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction.</SheetDescription>
          </SheetHeader>

          {isLoading && (
            <div className="space-y-4 pt-4">
              <div>
                <Skeleton className="h-[38px] w-full" />
              </div>
              <div>
                <span className="text-sm pb-1">Account</span>
                <Skeleton className="h-[38px] w-full" />
              </div>
              <div>
                <span className="text-sm pb-1">Category</span>
                <Skeleton className="h-[38px] w-full" />
              </div>
              <div>
                <span className="text-sm pb-1">Payee</span>
                <Skeleton className="h-[38px] w-full" />
              </div>
              <div>
                <span className="text-sm pb-1">Amount</span>
                <Skeleton className="h-[38px] w-full" />
              </div>
              <div>
                <span className="text-sm pb-1">Notes</span>
                <Skeleton className="h-20 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          )}

          {!isLoading && (
            <TransactionForm
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
              disabled={isPending}
              isLoading={editMutation.isPending}
              isLoadingDelete={deleteMutation.isPending}
              onDelete={handleDelete}
              id={id}
              accountOptions={accountOptions}
              categoryOptions={categoryOptions}
              onCreateAccount={handleCreateAccount}
              onCreateCategory={handleCreateCategory}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
