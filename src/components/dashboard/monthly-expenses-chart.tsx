"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monthlySummaries } from "@/lib/mock-data";

export function MonthlyExpensesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlySummaries}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-border"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12 }}
                className="fill-muted-foreground"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                className="fill-muted-foreground"
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip
                formatter={(value) => [
                  `$${Number(value).toLocaleString()}`,
                ]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--popover)",
                  color: "var(--popover-foreground)",
                  fontSize: "13px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke="var(--chart-1)"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Expenses"
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="var(--chart-2)"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Income"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
