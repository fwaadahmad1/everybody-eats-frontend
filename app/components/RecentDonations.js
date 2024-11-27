import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentDonations({ recentDonations }) {
  return (
    <div className="space-y-8">
      {recentDonations?.map((donation, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {donation.restaurant_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {donation.restaurant_name}
            </p>
            <p className="text-sm text-muted-foreground">
              {donation.most_recent_donation.food_name}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {donation.most_recent_donation.claimed_quantity}
          </div>
        </div>
      ))}
    </div>
  );
}
