"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { useMountedState } from "react-use";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";

export default function CategoriesPage() {
  const { onOpen } = useNewCategory();
  const isMounted = useMountedState();
  const categoriesQuery = useGetCategories();
  const deleteCategories = useBulkDeleteCategories();

  const categories = categoriesQuery?.data || [];
  const isPending = categoriesQuery.isLoading || deleteCategories.isPending;

  if (!isMounted) return null;

  if (categoriesQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="ext-xl line-clamp-1">Categories</CardTitle>
            <Skeleton className="h-10 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-9 w-80 my-4" />
            <div className="w-full space-y-1">
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton className="w-full h-11" key={index} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="ext-xl line-clamp-1">Categories</CardTitle>
          <Button onClick={onOpen}>
            <Plus />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={categories}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteCategories.mutate({ ids });
            }}
            filterKey="name"
            disabled={isPending}
            isLoading={deleteCategories.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
