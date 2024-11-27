"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Server } from "@/lib/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Food name must be at least 2 characters long"),
  total_quantity: z.number().min(1, "Quantity must be at least 1"),
  available_pickup_times: z.string().min(5, "Please provide pickup times"),
  pickup_address: z.string().min(5, "Please provide a valid pickup address"),
  special_instructions: z.string().optional(),
  status: z.enum(["Available", "Partially Claimed", "Claimed"]),
});

export function FoodDonationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "Available",
    },
  });

  const onSubmit = async (data) => {
    console.log("Donation data:", data);
    // Send data to the server
    try {
      const res = await Server.post("/food-listings/", {
        food_name: data.name,
        total_quantity: data.total_quantity,
        available_pickup_times: data.available_pickup_times,
        pickup_address: data.pickup_address,
        special_instructions: data.special_instructions,
        status: data.status,
      });
      console.log("Response:", res.data);
      toast.success(
        "Your food donation has been successfully submitted. Thank you for your generosity!"
      );
      reset(); // Clear the form
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Add Food for Donation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Food Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="e.g., Assorted Sandwiches"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="total_quantity">Total Quantity</Label>
            <Input
              id="total_quantity"
              type="number"
              {...register("total_quantity", { valueAsNumber: true })}
              placeholder="e.g., 20"
            />
            {errors.total_quantity && (
              <p className="text-red-500 text-sm">
                {errors.total_quantity.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="available_pickup_times">
              Available Pickup Times
            </Label>
            <Input
              id="available_pickup_times"
              {...register("available_pickup_times")}
              placeholder="e.g., Mon-Fri 2PM-6PM"
            />
            {errors.available_pickup_times && (
              <p className="text-red-500 text-sm">
                {errors.available_pickup_times.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickup_address">Pickup Address</Label>
            <Textarea
              id="pickup_address"
              {...register("pickup_address")}
              placeholder="Enter the full address for pickup"
            />
            {errors.pickup_address && (
              <p className="text-red-500 text-sm">
                {errors.pickup_address.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="special_instructions">
              Special Instructions (Optional)
            </Label>
            <Textarea
              id="special_instructions"
              {...register("special_instructions")}
              placeholder="Any special instructions for pickup or handling"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue="Available" {...register("status")}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Partially Claimed">
                  Partially Claimed
                </SelectItem>
                <SelectItem value="Claimed">Claimed</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Submit Donation
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
