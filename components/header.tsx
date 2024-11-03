import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { HeaderLogo } from "./header-logo";
import { Navigation } from "./navigation";
import { Skeleton } from "./ui/skeleton";
import { WelcomeMessage } from "./welcome-message";

export function Header() {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-white px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton
              appearance={{
                layout: {
                  unsafe_disableDevelopmentModeWarnings: true,
                },
              }}
            />
          </ClerkLoaded>
          <ClerkLoading>
            <Skeleton className="size-7 rounded-full" />
          </ClerkLoading>
        </div>
        <WelcomeMessage />
      </div>
    </header>
  );
}
