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
import { Skeleton } from "@/components/ui/skeleton";
import { useConfirm } from "@/hooks/use-confirm";
import { useOpenCategory } from "../hooks/use-open-category";
import { useGetCategory } from "../api/use-get-category";
import { useUpdateCategory } from "../api/use-update-category";
import { useDeleteCategory } from "../api/use-delete-category";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formSchema = insertCategorySchema.pick({ name: true });
type FormValues = z.input<typeof formSchema>;

export function EditCategorySheet() {
  const [ConfirmationDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category."
  );

  const { isOpen, onClose, id } = useOpenCategory();

  const categoryQuery = useGetCategory(id);
  const editMutation = useUpdateCategory(id);
  const deleteMutation = useDeleteCategory(id);

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
    name: categoryQuery?.data?.name || "",
  };

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = categoryQuery.isLoading;

  return (
    <>
      <ConfirmationDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader className="text-left">
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an existing category.</SheetDescription>
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
            <CategoryForm
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
