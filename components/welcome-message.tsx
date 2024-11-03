"use client";

import { useUser } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";

export function WelcomeMessage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <WelcomeMessageSkeleton />;
  }

  return (
    <div className="space-y-2 mb-4 font-sans">
      <h2 className="text-2xl lg:text-4xl font-bold text-white ">
        Welcome Back{`, ${user?.firstName}`}
      </h2>
      <p className="text-sm lg:text-base text-white">
        This is your Financial Overview Report
      </p>
    </div>
  );
}

function WelcomeMessageSkeleton() {
  return (
    <div className="space-y-2 mb-4">
      <Skeleton className="lg:w-[400px] w-72 lg:h-10 h-7" />
      <Skeleton className="lg:w-72 w-64 h-4 lg:h-6" />
    </div>
  );
}
