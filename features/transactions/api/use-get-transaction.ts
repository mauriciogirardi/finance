import { client } from "@/lib/hono";
import { convertAmountFromMiliunits } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export function useGetTransaction(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["transaction", { id }],
    queryFn: async () => {
      const response = await client.api.transactions[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transaction.");
      }

      const { transaction } = await response.json();
      return {
        ...transaction,
        amount: convertAmountFromMiliunits(transaction.amount),
      };
    },
  });

  return query;
}
