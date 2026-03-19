import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingDown,
  TrendingUp,
  AlertCircle,
  Building2,
} from "lucide-react";
import { formatCurrency } from "@/lib/mock-data";

interface SummaryItem {
  title: string;
  value: string;
  icon: React.ElementType;
  description: string;
}

const summaryData: SummaryItem[] = [
  {
    title: "Total Expenses",
    value: formatCurrency(10368.2),
    icon: TrendingDown,
    description: "This month",
  },
  {
    title: "Total Income",
    value: formatCurrency(6650),
    icon: TrendingUp,
    description: "This month",
  },
  {
    title: "Needs Review",
    value: "6",
    icon: AlertCircle,
    description: "Uncategorized transactions",
  },
  {
    title: "Properties",
    value: "3",
    icon: Building2,
    description: "5 linked accounts",
  },
];

export function SummaryCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryData.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <item.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {item.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
