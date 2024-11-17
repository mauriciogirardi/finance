"use client";

import { ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { SheetProvider } from "./sheet-provider";
import { useMountedState } from "react-use";
import { Toaster } from "sonner";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <QueryProvider>
      <SheetProvider />
      <Toaster richColors theme="light" />
      {children}
    </QueryProvider>
  );
}
