import { SummaryCards } from "@/components/dashboard/summary-cards";
import { ExpensesByCategoryChart } from "@/components/dashboard/expenses-by-category-chart";
import { MonthlyExpensesChart } from "@/components/dashboard/monthly-expenses-chart";
import { RecentStatementsTable } from "@/components/dashboard/recent-statements-table";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <SummaryCards />

      <div className="grid gap-6 lg:grid-cols-2">
        <ExpensesByCategoryChart />
        <MonthlyExpensesChart />
      </div>

      <RecentStatementsTable />
    </div>
  );
}
