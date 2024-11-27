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

export default function PastClaimsPage() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await Server.get("/claims");
        console.log("Claims:", response.data);

        setClaims(response.data);
      } catch (error) {
        console.error("Failed to fetch claims:", error);
      }
    };
    fetchClaims();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Past Claims</h1>
      <Card>
        <CardHeader>
          <CardTitle>Claim History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Restaurant</TableHead>
                <TableHead>Food Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell>{claim.food_listing.restaurant_name}</TableCell>
                  <TableCell>{claim.food_listing.food_name}</TableCell>
                  <TableCell>{claim.claimed_quantity}</TableCell>
                  <TableCell>
                    {format(new Date(claim.claimed_at), "MMMM dd, yyyy")}
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
