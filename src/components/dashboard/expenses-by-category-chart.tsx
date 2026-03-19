"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { categoryBreakdown } from "@/lib/mock-data";

const chartData = categoryBreakdown.map((item) => ({
  name: item.category,
  amount: item.amount,
}));

export function ExpensesByCategoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-border"
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                className="fill-muted-foreground"
                angle={-35}
                textAnchor="end"
                height={70}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                className="fill-muted-foreground"
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip
                formatter={(value) => [
                  `$${Number(value).toLocaleString()}`,
                  "Amount",
                ]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--popover)",
                  color: "var(--popover-foreground)",
                  fontSize: "13px",
                }}
              />
              <Bar
                dataKey="amount"
                fill="var(--chart-1)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
