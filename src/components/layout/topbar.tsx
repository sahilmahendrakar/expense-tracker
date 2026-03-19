"use client";

import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/upload": "Upload Statement",
  "/review": "Review Transactions",
  "/properties": "Properties & Accounts",
};

export function Topbar() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <h1 className="text-base font-semibold tracking-tight">{title}</h1>
      <div className="flex items-center gap-3">
        <Avatar className="size-8">
          <AvatarFallback className="text-xs font-medium bg-muted">
            JD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
