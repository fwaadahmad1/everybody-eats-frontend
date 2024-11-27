"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Info } from "lucide-react";
import { ClaimDonationDialog } from "../../../components/ClaimDonationDialog";
import { Server } from "@/lib/server";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const getRandomGradient = () => {
  const hue1 = Math.floor(Math.random() * 360);
  const hue2 = (hue1 - 45) % 360; // Complementary color
  return `linear-gradient(135deg, hsl(${hue1}, 80%, 50%), hsl(${hue2}, 80%, 50%))`;
};

export default function RestaurantPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [gradient, setGradient] = useState("");
  const isNgo = localStorage.getItem("role") === "ngo";

  const fetchRestaurant = useCallback(async () => {
    try {
      const response = await Server.get(`/restaurants/${id}`);
      setRestaurant(response.data);
    } catch (error) {
      console.error("Failed to fetch restaurant:", error);
    }
  }, [id]);

  useEffect(() => {
    setGradient(getRandomGradient());
    fetchRestaurant();
  }, [fetchRestaurant]);

  if (!restaurant) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-1/2" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-3/4 mb-4" />
            <Skeleton className="h-5 w-1/2 mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-5 w-1/2 mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div
        className="mb-8 relative h-64 rounded-xl overflow-hidden"
        style={{ background: gradient }}
      >
        <div className="absolute inset-0 flex items-end">
          <div className="p-6">
            <h1 className="text-4xl font-bold text-white mb-2">
              {restaurant.name}
            </h1>
            <div className="flex flex-row gap-2">
              <Badge variant="secondary" className="text-sm">
                {restaurant.address}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {restaurant.phone}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {restaurant.food_listings.map((food) => (
          <div key={food.id}>
            <Card>
              <CardHeader>
                <CardTitle>Donation Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <MapPin size={16} className="mr-2" />
                  <span className="flex gap-2">
                    <span className="font-semibold">Address:</span>
                    {food.pickup_address}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span className="flex gap-2">
                    <span className="font-semibold">Pickup Time:</span>
                    {food.available_pickup_times}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-4 flex items-center">
                  <Info size={16} className="mr-2" />
                  <span className="flex gap-2">
                    <span className="font-semibold">Status:</span>
                    {food.status
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </span>
                </p>
                <h3 className="font-semibold mb-2">Available Food:</h3>
                <p className="text-sm mb-4">
                  {food.food_name} - {food.remaining_quantity} available
                </p>
                <h3 className="font-semibold mb-2">Special Instructions:</h3>
                <p className="text-sm mb-4">{food.special_instructions}</p>
                {isNgo && (
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="w-full"
                  >
                    Claim Donation
                  </Button>
                )}
              </CardContent>
            </Card>
            <ClaimDonationDialog
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              foodId={food.id}
              availableQuantity={restaurant.total_quantity}
              onSuccess={() => {
                setIsDialogOpen(false);
                fetchRestaurant();
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
