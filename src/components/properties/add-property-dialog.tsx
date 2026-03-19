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
import { Plus } from "lucide-react";

export function AddPropertyDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant="outline" size="sm" />}
      >
        <Plus className="size-4 mr-1.5" />
        Add Property
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Property</DialogTitle>
          <DialogDescription>
            Add a new rental property to track expenses against.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="prop-name">Property Name</Label>
            <Input id="prop-name" placeholder="e.g. Elm Street Triplex" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prop-address">Address</Label>
            <Input id="prop-address" placeholder="123 Elm St, City, ST 00000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prop-units">Number of Units</Label>
            <Input
              id="prop-units"
              type="number"
              min={1}
              placeholder="1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              // TODO: Save property to backend
              setOpen(false);
            }}
          >
            Add Property
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
