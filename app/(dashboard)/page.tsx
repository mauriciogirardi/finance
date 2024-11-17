"use client";

import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { useMountedState } from "react-use";

export default function Home() {
  const { onOpen } = useNewAccount();
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <div>
      <p>Home page</p>
      <Button onClick={onOpen}>Open sheet</Button>
    </div>
  );
}
