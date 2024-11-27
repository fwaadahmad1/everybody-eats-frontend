"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Server } from "@/lib/server";
import { format } from "date-fns";

export default function PastDonationsPage() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await Server.get("/donations");
        console.log("Donations:", response.data);

        setDonations(response.data);
      } catch (error) {
        console.error("Failed to fetch donations:", error);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Past Donations</h1>
      <Card>
        <CardHeader>
          <CardTitle>Donation History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Food Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>{donation.food_listing.food_name}</TableCell>
                  <TableCell>{donation.claimed_quantity}</TableCell>
                  <TableCell>
                    {format(new Date(donation.claimed_at), "MMMM dd, yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
