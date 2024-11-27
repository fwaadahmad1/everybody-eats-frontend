"use client";
import { useCallback, useEffect, useState } from "react";
import { RestaurantCard } from "./RestaurantCard";
import { Server } from "@/lib/server";

const mockRestaurants = [
  {
    id: 1,
    name: "Joe's Diner",
    pickup_address: "123 Main St, Anytown, USA",
    available_pickup_times: "Mon-Fri 2PM-6PM",
    status: "Available",
    total_quantity: 50,
  },
  {
    id: 2,
    name: "Pizza Palace",
    pickup_address: "456 Elm St, Somewhere, USA",
    available_pickup_times: "Tue-Sat 11AM-3PM",
    status: "Partially Claimed",
    total_quantity: 30,
  },
  {
    id: 3,
    name: "Sushi Spot",
    pickup_address: "789 Oak St, Elsewhere, USA",
    available_pickup_times: "Wed-Sun 4PM-8PM",
    status: "Available",
    total_quantity: 40,
  },
];

export function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  const fetchRestaurants = useCallback(async () => {
    try {
      const response = await Server.get("/restaurants");
      setRestaurants(response.data);
    } catch (error) {
      console.error("Failed to fetch restaurants:", error);
    }
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
