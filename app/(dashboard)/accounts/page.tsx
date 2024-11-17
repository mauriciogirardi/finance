"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { useMountedState } from "react-use";

export default function AccountPage() {
  const { onOpen } = useNewAccount();
  const isMounted = useMountedState();

  if (!isMounted) return null;

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
            data={[]}
            onDelete={() => {}}
            filterKey="name"
          />
        </CardContent>
      </Card>
    </div>
  );
}
