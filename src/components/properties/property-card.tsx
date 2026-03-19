import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import type { Property, Account } from "@/lib/types";

const accountTypeLabel: Record<Account["type"], string> = {
  checking: "Checking",
  savings: "Savings",
  credit: "Credit Card",
};

interface PropertyCardProps {
  property: Property;
  propertyAccounts: Account[];
}

export function PropertyCard({ property, propertyAccounts }: PropertyCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{property.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="size-3" />
              {property.address}
            </CardDescription>
          </div>
          <Badge variant="secondary">
            {property.units ?? 0} unit{(property.units ?? 0) > 1 ? "s" : ""}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
          Linked Accounts
        </p>
        <div className="space-y-2">
          {propertyAccounts.map((acct) => (
            <div
              key={acct.id}
              className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
            >
              <div>
                <p className="text-sm font-medium">{acct.name}</p>
                <p className="text-xs text-muted-foreground">
                  {accountTypeLabel[acct.type]} •••• {acct.lastFour}
                </p>
              </div>
            </div>
          ))}
          {propertyAccounts.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No accounts linked yet.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
