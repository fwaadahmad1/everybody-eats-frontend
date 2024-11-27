'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  quantity: z.number().min(1, "Quantity must be at least 1").max(1000, "Quantity must not exceed 1000"),
});

export function ClaimDonationForm({ restaurantId, availableQuantity, onClose }) {
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    // Here you would typically send the data to your backend
    console.log('Claim data:', { restaurantId, ...data });
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSuccess(true);
  };

  if (success) {
    return (
      (<Card>
        <CardContent className="pt-6">
          <Alert>
            <AlertDescription>
              Your claim has been successfully submitted. Thank you for your contribution!
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button onClick={onClose} className="w-full">Close</Button>
        </CardFooter>
      </Card>)
    );
  }

  return (
    (<Card>
      <CardHeader>
        <CardTitle>Claim Donation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity to Claim</Label>
            <Input
              id="quantity"
              type="number"
              {...register('quantity', { valueAsNumber: true })}
              max={availableQuantity} />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Submit Claim
          </Button>
        </form>
      </CardContent>
    </Card>)
  );
}

