"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { properties } from "@/lib/mock-data";

export function AddAccountDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant="outline" size="sm" />}
      >
        <Plus className="size-4 mr-1.5" />
        Add Account
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Account</DialogTitle>
          <DialogDescription>
            Link a bank account to a property for statement uploads.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="acct-name">Account Name</Label>
            <Input id="acct-name" placeholder="e.g. Main Operating Account" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="acct-type">Account Type</Label>
            <Select>
              <SelectTrigger id="acct-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="checking">Checking</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="credit">Credit Card</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="acct-last4">Last 4 Digits</Label>
            <Input
              id="acct-last4"
              placeholder="0000"
              maxLength={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="acct-property">Property</Label>
            <Select>
              <SelectTrigger id="acct-property">
                <SelectValue placeholder="Select property" />
              </SelectTrigger>
              <SelectContent>
                {properties.map((prop) => (
                  <SelectItem key={prop.id} value={prop.id}>
                    {prop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              // TODO: Save account to backend
              setOpen(false);
            }}
          >
            Add Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
