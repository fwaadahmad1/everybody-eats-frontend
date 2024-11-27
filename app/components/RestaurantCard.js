import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Info, Phone } from "lucide-react";
import Link from "next/link";

export function RestaurantCard({ restaurant }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{restaurant.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
          <MapPin size={16} className="mr-2" />
          {restaurant.address}
        </p>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
          <Phone size={16} className="mr-2" />
          {restaurant.phone}
        </p>
        <h3 className="font-semibold mb-2">Available Food:</h3>
        {restaurant.food_listings.slice(0, 2).map((food) => (
          <p key={food.id} className="text-sm mb-2">
            {food.food_name} - {food.remaining_quantity} available
          </p>
        ))}
        {restaurant.food_listings.length > 2 && (
          <p className="text-xs mb-4 text-muted-foreground">
            {'Click "View Details" to see more.'}
          </p>
        )}
        <Link href={`/dashboard/restaurant/${restaurant.id}`} passHref>
          <Button className="w-full">View Details</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
