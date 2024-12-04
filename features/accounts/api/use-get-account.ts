import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export function useGetAccount(id?: string) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["account", { id }],
    queryFn: async () => {
      const response = await client.api.accounts[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch account.");
      }

      const { account } = await response.json();
      return account;
    },
  });

  return query;
}
