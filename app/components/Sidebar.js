"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  List,
  PlusCircle,
  Settings,
  LogOut,
  Clock,
  CheckSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Server } from "@/lib/server";

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const role = localStorage.getItem("role");

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    {
      href: "/dashboard/available-donations",
      icon: List,
      label: "Available Donations",
    },
    ...(role === "restaurant"
      ? [
          {
            href: "/dashboard/add-donation",
            icon: PlusCircle,
            label: "Add Donation",
          },
          {
            href: "/dashboard/past-donations",
            icon: Clock,
            label: "Past Donations",
          },
        ]
      : [
          {
            href: "/dashboard/past-claims",
            icon: CheckSquare,
            label: "Past Claims",
          },
        ]),

    // { href: "/dashboard/settings", icon: Settings, label: "Settings" },

    ,
  ];

  async function logout() {
    try {
      await Server.post("/logout/");
      localStorage.removeItem("auth-token");
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 h-full shadow-lg text-white">
      <div className="flex items-center justify-center h-20 border-b border-blue-500">
        <h1 className="text-3xl font-bold">Everybody Eats</h1>
      </div>
      <nav className="mt-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center py-3 px-8 transition-colors duration-200 ease-in-out ${
              pathname === item.href
                ? "bg-blue-700 text-white border-r-4 border-white"
                : "text-blue-100 hover:bg-blue-700"
            }`}
          >
            <item.icon className="mr-3" size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-0 w-64 p-6">
        <Button
          variant="link"
          href="/logout"
          className="flex w-full justify-start items-center py-4 px-4 text-blue-100 hover:bg-blue-700 rounded transition-colors duration-200 ease-in-out"
          onClick={logout}
        >
          <LogOut className="mr-3" size={20} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
}
