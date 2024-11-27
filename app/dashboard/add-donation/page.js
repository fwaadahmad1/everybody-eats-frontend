import { FoodDonationForm } from '../../components/FoodDonationForm';

export default function AddDonationPage() {
  return (
    (<div className="space-y-6">
      <h1 className="text-3xl font-bold">Add Food for Donation</h1>
      <p className="text-xl text-gray-600">Please provide details about the food you wish to donate:</p>
      <FoodDonationForm />
    </div>)
  );
}

