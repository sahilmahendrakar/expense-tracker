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
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { statements, getAccountName, MONTHS, formatDate } from "@/lib/mock-data";
import type { StatementStatus } from "@/lib/types";

const statusVariant: Record<StatementStatus, "default" | "secondary" | "destructive" | "outline"> = {
  processed: "default",
  pending: "secondary",
  error: "destructive",
};

export function UploadedStatements() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Previously Uploaded</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>File</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {statements.map((stmt) => (
              <TableRow key={stmt.id}>
                <TableCell className="font-medium">
                  {getAccountName(stmt.accountId)}
                </TableCell>
                <TableCell>
                  {MONTHS[stmt.month - 1]} {stmt.year}
                </TableCell>
                <TableCell className="text-muted-foreground text-xs">
                  {stmt.fileName}
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[stmt.status]}>
                    {stmt.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatDate(stmt.uploadedAt)}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm">
                    <Eye className="size-4" />
                    {/* TODO: Navigate to review page filtered by statement */}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
