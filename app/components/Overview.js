"use client";

import { Server } from "@/lib/server";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
} from "recharts";

const LongToShortMonth = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "rgba(245, 245, 245, 0.8)",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <p className="label">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name.charAt(0).toUpperCase() + entry.name.slice(1)} : ${
              entry.value
            }`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export function Overview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchMonthlyDonations = async () => {
      try {
        try {
          const response = await Server.get("/monthly-donations");

          const processedDataArray = Object.entries(LongToShortMonth).map(
            ([key, value]) => {
              const data = response.data.monthly_donations.find(
                (data) => data.month === key
              );
              return {
                name: value,
                donations: data ? data.donations_count : 0,
                claims: data ? data.total_claimed_quantity : 0,
              };
            }
          );

          console.log("processedDataArray", processedDataArray);

          setStats(processedDataArray);
        } catch (error) {
          console.error("Failed to fetch stats:", error);
        }
      } catch (error) {
        console.error("Failed to fetch monthly donations:", error);
      }
    };
    fetchMonthlyDonations();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={stats}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="donations" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
        <Bar dataKey="claims" fill="#22c55e" radius={[4, 4, 0, 0]} />
        <Legend
          formatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
          wrapperStyle={{ fontSize: "14px", fontWeight: "bold" }}
          iconType="circle"
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
