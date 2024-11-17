"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewAccount } from "../hooks/use-new-account";
import { AccountForm } from "./account-form";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateAccount } from "../api/use-create-account";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertAccountSchema.pick({ name: true });
type FormValues = z.input<typeof formSchema>;

export function NewAccountSheet() {
  const { isOpen, onClose } = useNewAccount();

  const { mutate, isPending } = useCreateAccount();

  const handleSubmit = (values: FormValues) => {
    mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader className="text-left">
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create new account to track your transactions.
          </SheetDescription>
        </SheetHeader>

        <AccountForm
          onSubmit={handleSubmit}
          defaultValues={{ name: "" }}
          disabled={isPending}
        />
      </SheetContent>
    </Sheet>
  );
}
