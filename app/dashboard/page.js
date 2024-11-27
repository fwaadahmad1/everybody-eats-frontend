"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "../components/Overview";
import { RecentDonations } from "../components/RecentDonations";
import { useEffect, useState } from "react";
import { Server } from "@/lib/server";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  CookingPot,
  Hash,
  Utensils,
} from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await Server.get("/donation-statistics");
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
  }, []);

  const donationChangePercent =
    (stats?.current_month_donations?.total_donations /
      stats?.total_donations?.total_donations) *
    100;

  const quantityChangePercent =
    (stats?.current_month_donations?.total_quantity /
      stats?.total_donations?.total_quantity) *
    100;

  const StatCard = ({ title, description, value, icon: Icon, change }) => (
    <Card className="bg-white bg-opacity-80 backdrop-blur-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-col">
          <CardTitle className="tracking-wide">{title}</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            {description}
          </CardDescription>
        </div>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p
            className={`text-xs ${
              change >= 0 ? "text-green-500" : "text-red-500"
            } flex items-center`}
          >
            {change >= 0 ? (
              <ArrowUpRight className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDownRight className="mr-1 h-4 w-4" />
            )}
            {change}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-5xl font-bold text-blue-700">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Donations"
          description="Donations til date"
          value={stats?.total_donations?.total_donations}
          icon={Hash}
        />
        <StatCard
          title="Active Donations"
          description="Donations this month"
          value={stats?.current_month_donations.total_donations}
          icon={Activity}
          change={quantityChangePercent}
        />
        <StatCard
          title="Total Meals Served"
          description="Meals served til date"
          value={stats?.total_donations?.total_quantity}
          icon={Utensils}
        />
        <StatCard
          title="Active Meals Served"
          description="Meals served this month"
          value={stats?.current_month_donations.total_quantity}
          icon={CookingPot}
          change={quantityChangePercent}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentDonations recentDonations={stats?.recent_donations} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
