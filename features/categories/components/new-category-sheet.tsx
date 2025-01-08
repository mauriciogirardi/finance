"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { insertCategorySchema } from "@/db/schema";
import { z } from "zod";
import { useNewCategory } from "../hooks/use-new-category";
import { useCreateCategory } from "../api/use-create-category";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertCategorySchema.pick({ name: true });
type FormValues = z.input<typeof formSchema>;

export function NewCategorySheet() {
  const { isOpen, onClose } = useNewCategory();

  const { mutate, isPending } = useCreateCategory();

  const handleSubmit = (values: FormValues) => {
    mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader className="text-left">
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>Create new category.</SheetDescription>
        </SheetHeader>

        <CategoryForm
          onSubmit={handleSubmit}
          defaultValues={{ name: "" }}
          disabled={isPending}
          isLoading={isPending}
        />
      </SheetContent>
    </Sheet>
  );
}
