import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

type CategoryColumnProps = {
  category: string | null;
  categoryId: string | null;
};

export function CategoryColumn({ category, categoryId }: CategoryColumnProps) {
  const onOpenCategory = useOpenCategory((state) => state.onOpen);

  const handleClickCategory = () => {
    if (!categoryId) return;
    onOpenCategory(categoryId);
  };

  return (
    <div
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-rose-500 pointer-events-none hover:no-underline"
      )}
      onClick={handleClickCategory}
    >
      {!category && <TriangleAlert className="mr-2 size-4 flex-shrink-0" />}
      {category || "Uncategorized"}
    </div>
  );
}
