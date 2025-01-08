import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export function useGetCategory(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["category", { id }],
    queryFn: async () => {
      const response = await client.api.categories[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch category.");
      }

      const { category } = await response.json();
      return category;
    },
  });

  return query;
}
