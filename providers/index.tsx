"use client";

import { ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { SheetProvider } from "./sheet-provider";
import { useMountedState } from "react-use";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <QueryProvider>
      <SheetProvider />
      {children}
    </QueryProvider>
  );
}
