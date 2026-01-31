"use client";

import React, { useState } from "react";
import {
  User,
  Package,
  Heart,
  LogOut,
  MapPin,
  Edit2,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWishlistStore } from "@/store/wishlistStore";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter();
  const { items: wishlistItems } = useWishlistStore();

  // Simulated User Data
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  };

  // Simulated Orders
  const orders = [
    {
      id: "#ORD-7723",
      date: "Jan 24, 2026",
      status: "Delivered",
      total: 89999,
      items: 2,
    },
    {
      id: "#ORD-7722",
      date: "Jan 12, 2026",
      status: "Processing",
      total: 1499,
      items: 1,
    },
    {
      id: "#ORD-7721",
      date: "Dec 30, 2025",
      status: "Delivered",
      total: 3499,
      items: 3,
    },
  ];

  // Simulated Addresses
  const addresses = [
    {
      id: 1,
      type: "Home",
      address: "123 Tech Park, Silicon Valley, CA 94025, USA",
    },
    {
      id: 2,
      type: "Work",
      address: "456 Innovation Drive, Tech City, TC 10101",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-6">
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    First Name
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-slate-900 font-medium">
                    {user.firstName}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Last Name
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-slate-900 font-medium">
                    {user.lastName}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-slate-900 font-medium">
                    {user.email}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-slate-900 font-medium">
                    {user.phone}
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <Button className="bg-[#ffd700] text-slate-900 hover:bg-[#ffe135] font-bold">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setActiveTab("orders")}
              >
                <div className="text-3xl font-black text-[#ffd700] mb-1">
                  {orders.length}
                </div>
                <div className="text-sm font-bold text-slate-600">
                  Total Orders
                </div>
              </div>
              <div
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => router.push("/wishlist")}
              >
                <div className="text-3xl font-black text-[#ffd700] mb-1">
                  {wishlistItems.length}
                </div>
                <div className="text-sm font-bold text-slate-600">
                  Wishlist Items
                </div>
              </div>
            </div>
          </>
        );

      case "orders":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Orders History
            </h3>
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col md:flex-row justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="mb-2 md:mb-0">
                    <p className="font-bold text-slate-900">{order.id}</p>
                    <p className="text-xs text-slate-500">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">
                        ₹{order.total.toLocaleString("en-IN")}
                      </p>
                      <p className="text-xs text-slate-500">
                        {order.items} Items
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "addresses":
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                Saved Addresses
              </h3>
              <Button
                size="sm"
                className="bg-[#ffd700] text-slate-900 hover:bg-[#ffe135] font-bold"
              >
                <Plus className="h-4 w-4 mr-1" /> Add New
              </Button>
            </div>
            <div className="space-y-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-4 border rounded-lg flex justify-between items-start"
                >
                  <div>
                    <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded mb-2 inline-block">
                      {addr.type}
                    </span>
                    <p className="text-slate-700 font-medium mt-1">
                      {addr.address}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-slate-900"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <h1 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">
          My Account
        </h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <User className="h-8 w-8 text-slate-400" />
                </div>
                <h2 className="font-bold text-slate-900">John Doe</h2>
                <p className="text-xs text-slate-500">john.doe@example.com</p>
              </div>

              <nav className="space-y-1">
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab("profile")}
                  className={`w-full justify-start gap-3 font-bold ${
                    activeTab === "profile"
                      ? "bg-[#fff9c4] text-slate-900"
                      : "text-slate-600 hover:text-slate-900 hover:bg-gray-50"
                  }`}
                >
                  <User className="h-4 w-4" /> Profile Info
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab("orders")}
                  className={`w-full justify-start gap-3 font-bold ${
                    activeTab === "orders"
                      ? "bg-[#fff9c4] text-slate-900"
                      : "text-slate-600 hover:text-slate-900 hover:bg-gray-50"
                  }`}
                >
                  <Package className="h-4 w-4" /> My Orders
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => router.push("/wishlist")}
                  className="w-full justify-start gap-3 text-slate-600 hover:text-slate-900 hover:bg-gray-50 font-bold"
                >
                  <Heart className="h-4 w-4" /> Wishlist
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full justify-start gap-3 font-bold ${
                    activeTab === "addresses"
                      ? "bg-[#fff9c4] text-slate-900"
                      : "text-slate-600 hover:text-slate-900 hover:bg-gray-50"
                  }`}
                >
                  <MapPin className="h-4 w-4" /> Addresses
                </Button>
                {/* Settings REMOVED */}
                <div className="pt-4 mt-4 border-t">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 font-bold"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </Button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
