import { SignIn, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  return (
    <div>
      <ClerkLoading>
        <Loader2 className="animate-spin size-10" />
      </ClerkLoading>

      <ClerkLoaded>
        <SignIn
          path="/sign-in"
          appearance={{
            layout: {
              animations: true,
              socialButtonsPlacement: "bottom",
            },
          }}
        />
      </ClerkLoaded>
    </div>
  );
}
