"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server } from "@/lib/server";
import { useRouter } from "next/navigation";

const commonSchema = {
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" }),
};

const restaurantSchema = z.object(commonSchema);
const ngoSchema = z.object(commonSchema);

export default function SignUpForm() {
  const [activeTab, setActiveTab] = useState("restaurant");
  const [error, setError] = useState("");
  const router = useRouter();

  const restaurantForm = useForm({
    resolver: zodResolver(restaurantSchema),
  });

  const ngoForm = useForm({
    resolver: zodResolver(ngoSchema),
  });

  const onSubmit = async (data, type) => {
    setError("");
    try {
      // Here you would typically send a request to your authentication API
      console.log(`${type} signup data:`, data);
      const res = await Server.post(
        activeTab === "ngo" ? "/register-ngo/" : "/register-restaurant/",
        {
          address: data.address,
          name: data.name,
          phone: data.phone,
          user: {
            username: data.email,
            password: data.password,
            email: data.email,
          },
        }
      );
      router.push("/login"); // Redirect to login page after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  const renderForm = (type, { register, formState: { errors } }) => (
    <form
      onSubmit={
        type === "restaurant"
          ? restaurantForm.handleSubmit((data) => onSubmit(data, "restaurant"))
          : ngoForm.handleSubmit((data) => onSubmit(data, "ngo"))
      }
      className="space-y-4"
    >
      {["email", "password", "name", "address", "phone"].map((field) => (
        <div key={field} className="space-y-2">
          <Label htmlFor={`${type}-${field}`}>
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </Label>
          <Input
            id={`${type}-${field}`}
            type={field === "password" ? "password" : "text"}
            placeholder={
              field === "email"
                ? "you@example.com"
                : field === "password"
                ? "••••••••"
                : `Enter your ${field}`
            }
            {...register(field)}
            className={errors[field] ? "border-red-500" : ""}
          />
          {errors[field] && (
            <p className="text-red-500 text-sm">{errors[field].message}</p>
          )}
        </div>
      ))}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button type="submit" className="w-full">
        Sign Up as {type === "restaurant" ? "Restaurant" : "NGO"}
      </Button>
    </form>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Sign Up
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="restaurant">Restaurant</TabsTrigger>
            <TabsTrigger value="ngo">NGO</TabsTrigger>
          </TabsList>
          <TabsContent value="restaurant">
            {renderForm("restaurant", restaurantForm)}
          </TabsContent>
          <TabsContent value="ngo">{renderForm("ngo", ngoForm)}</TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
