"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileText, Info } from "lucide-react";
import { accounts, MONTHS } from "@/lib/mock-data";

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

export function UploadForm() {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const canUpload = selectedAccount && selectedMonth && selectedYear && fileName;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Bank Statement</CardTitle>
        <CardDescription>
          Select the account and period, then upload the statement file.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="account">Account</Label>
            <Select value={selectedAccount} onValueChange={(v) => setSelectedAccount(v ?? "")}>
              <SelectTrigger id="account">
                <SelectValue placeholder="Select account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((acct) => (
                  <SelectItem key={acct.id} value={acct.id}>
                    {acct.name} (••{acct.lastFour})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="month">Month</Label>
            <Select value={selectedMonth} onValueChange={(v) => setSelectedMonth(v ?? "")}>
              <SelectTrigger id="month">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map((month, i) => (
                  <SelectItem key={month} value={String(i + 1)}>
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Select value={selectedYear} onValueChange={(v) => setSelectedYear(v ?? "")}>
              <SelectTrigger id="year">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* File upload dropzone */}
        <div
          className={`relative flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 transition-colors ${
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border hover:border-muted-foreground/50"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            const file = e.dataTransfer.files[0];
            if (file) setFileName(file.name);
          }}
        >
          {fileName ? (
            <>
              <FileText className="size-8 text-primary" />
              <p className="text-sm font-medium">{fileName}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFileName(null)}
              >
                Remove
              </Button>
            </>
          ) : (
            <>
              <Upload className="size-8 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm font-medium">
                  Drag & drop your statement here
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  or click to browse
                </p>
              </div>
              <input
                type="file"
                className="absolute inset-0 cursor-pointer opacity-0"
                accept=".pdf,.csv"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFileName(file.name);
                }}
              />
            </>
          )}
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
          <Info className="size-4 text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">
            PDF and CSV bank statements are supported. The file will be processed
            by AI to extract and categorize transactions.
            {/* TODO: Connect to backend file processing (Gemini API) */}
          </p>
        </div>

        <Button disabled={!canUpload} className="w-full sm:w-auto">
          <Upload className="size-4 mr-2" />
          Upload Statement
          {/* TODO: Implement actual upload to Firebase Storage */}
        </Button>
      </CardContent>
    </Card>
  );
}
