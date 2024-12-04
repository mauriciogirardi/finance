"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenAccount } from "../hooks/use-open-accounts";
import { useGetAccount } from "../api/use-get-account";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateAccount } from "../api/use-update-account";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertAccountSchema.pick({ name: true });
type FormValues = z.input<typeof formSchema>;

export function EditAccountSheet() {
  const { isOpen, onClose, id } = useOpenAccount();

  const { data, isLoading } = useGetAccount(id);
  const { mutate, isPending } = useUpdateAccount(id);

  const handleSubmit = (values: FormValues) => {
    mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  const defaultValues = {
    name: data?.name || "",
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader className="text-left">
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>Edit an existing account.</SheetDescription>
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
          <AccountForm
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
            disabled={isPending}
            isLoading={isPending}
            id={id}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
