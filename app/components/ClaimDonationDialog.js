"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Server } from "@/lib/server";

const formSchema = z.object({
  quantity: z
    .number()
    .min(1, "Quantity must be at least 1")
    .max(1000, "Quantity must not exceed 1000"),
});

export function ClaimDonationDialog({
  isOpen,
  onClose,
  foodId,
  availableQuantity,
  onSuccess,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await Server.post(`/claim-food/`, {
        food_listing: foodId,
        claimed_quantity: data.quantity,
      });
      console.log("Claim submitted:", response.data);
      toast.success(
        "Your claim has been successfully submitted. Thank you for your contribution!"
      );
      onSuccess & onSuccess();
    } catch (error) {
      const message = error.response?.data?.[0] || error.message;
      toast.error(message);
    }
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Claim Donation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity to Claim</Label>
            <Input
              id="quantity"
              type="number"
              {...register("quantity", { valueAsNumber: true })}
              max={availableQuantity}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Submit Claim</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
