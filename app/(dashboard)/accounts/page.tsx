"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { useMountedState } from "react-use";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";

export default function AccountsPage() {
  const { onOpen } = useNewAccount();
  const isMounted = useMountedState();
  const accountsQuery = useGetAccounts();
  const deleteAccount = useBulkDeleteAccounts();

  const accounts = accountsQuery?.data || [];
  const isPending = accountsQuery.isLoading || deleteAccount.isPending;

  if (!isMounted) return null;

  if (accountsQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="ext-xl line-clamp-1">Accounts</CardTitle>
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
          <CardTitle className="ext-xl line-clamp-1">Accounts</CardTitle>
          <Button onClick={onOpen}>
            <Plus />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={accounts}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteAccount.mutate({ ids });
            }}
            filterKey="name"
            disabled={isPending}
            isLoading={deleteAccount.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
