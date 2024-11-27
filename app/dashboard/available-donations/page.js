import { RestaurantList } from '../../components/RestaurantList';

export default function AvailableDonationsPage() {
  return (
    (<div className="space-y-6">
      <h1 className="text-3xl font-bold">Available Donations</h1>
      <p className="text-xl text-gray-600">Here are the restaurants with available food donations:</p>
      <RestaurantList />
    </div>)
  );
}

