"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  ClipboardCheck,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/review", label: "Review", icon: ClipboardCheck },
  { href: "/properties", label: "Properties", icon: Building2 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 border-r border-border bg-sidebar">
        <div className="flex h-14 items-center gap-2 border-b border-border px-4">
          <Building2 className="size-5 text-primary" />
          <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
            Rental Expense Assistant
          </span>
        </div>
        <nav className="flex-1 space-y-1 px-2 py-3">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden border-t border-border bg-sidebar">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2 text-xs font-medium transition-colors",
                isActive
                  ? "text-sidebar-primary"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
