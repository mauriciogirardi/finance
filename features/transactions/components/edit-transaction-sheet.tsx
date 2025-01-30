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
    amount: transactionQuery?.data?.amount || "",
    notes: transactionQuery?.data?.notes || "",
    payee: transactionQuery?.data?.payee || "",
    accountId: transactionQuery?.data?.accountId || "",
    categoryId: transactionQuery?.data?.categoryId || "",
    date: transactionQuery?.data?.date || "",
  };

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = transactionQuery.isLoading;

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
                <span className="text-sm pb-1">Name</span>
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
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
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
