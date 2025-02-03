"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useState } from "react";
import { UploadButton } from "./upload-button";
import { ImportCard } from "./import-card";
import { transactions as transactionSchema } from "@/db/schema";
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";
import { toast } from "sonner";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

export default function TransactionsPage() {
  const [AccountDialog, confirmAccountDialog] = useSelectAccount();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const { onOpen } = useNewTransaction();
  const transactionQuery = useGetTransactions();
  const deleteTransactions = useBulkDeleteTransactions();
  const bulkCreateTransactionMutation = useBulkCreateTransactions();

  const transactions = transactionQuery?.data || [];
  const isPending = transactionQuery.isLoading || deleteTransactions.isPending;

  const handleUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const handleCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const handleSubmitImport = async (
    values: (typeof transactionSchema.$inferInsert)[]
  ) => {
    const accountId = (await confirmAccountDialog()) as string;

    if (!accountId) {
      return toast.error("Please select an account to continue.");
    }

    const data = values.map((item) => ({
      ...item,
      accountId,
    }));

    bulkCreateTransactionMutation.mutate(data, {
      onSuccess: () => {
        handleCancelImport();
      },
    });
  };

  if (transactionQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="ext-xl line-clamp-1">
              Transaction History
            </CardTitle>
            <div className="flex flex-wrap gap-3 items-center">
              <Skeleton className="h-10 w-full md:w-48" />
              <Skeleton className="h-10 w-full md:w-48" />
            </div>
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

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <AccountDialog />
        <ImportCard
          data={importResults.data}
          onCancel={handleCancelImport}
          onSubmit={handleSubmitImport}
          loading={bulkCreateTransactionMutation.isPending}
        />
      </>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transaction History
          </CardTitle>
          <div className="flex items-center gap-2 flex-wrap">
            <Button onClick={onOpen} size="sm" className="w-full md:w-auto">
              <Plus />
              Add new
            </Button>
            <UploadButton onUpload={handleUpload} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
            filterKey="payee"
            disabled={isPending}
            isLoading={
              deleteTransactions.isPending ||
              bulkCreateTransactionMutation.isPending
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
