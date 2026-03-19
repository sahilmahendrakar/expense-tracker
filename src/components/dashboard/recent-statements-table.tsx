import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { statements, getAccountName, MONTHS } from "@/lib/mock-data";
import type { StatementStatus } from "@/lib/types";

const statusVariant: Record<StatementStatus, "default" | "secondary" | "destructive" | "outline"> = {
  processed: "default",
  pending: "secondary",
  error: "destructive",
};

const recentStatements = statements.slice(0, 5);

export function RecentStatementsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Statements</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead>Month</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Transactions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentStatements.map((stmt) => (
              <TableRow key={stmt.id}>
                <TableCell className="font-medium">
                  {getAccountName(stmt.accountId)}
                </TableCell>
                <TableCell>
                  {MONTHS[stmt.month - 1]} {stmt.year}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[stmt.status]}>
                    {stmt.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {stmt.transactionCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
