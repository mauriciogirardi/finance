import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
  return (
    <div>
      <ClerkLoading>
        <Loader2 className="animate-spin size-10" />
      </ClerkLoading>

      <ClerkLoaded>
        <SignUp
          path="/sign-up"
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
