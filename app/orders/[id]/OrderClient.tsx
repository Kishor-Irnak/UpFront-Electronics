"use client";

import * as React from "react";
import Link from "next/link";
import {
  Check,
  Package,
  Truck,
  CheckCircle,
  MapPin,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function OrderClient({ params }: { params: { id: string } }) {
  const [orderId, setOrderId] = React.useState<string>("");

  React.useEffect(() => {
    setOrderId(params.id);
  }, [params.id]);

  // Mock timeline data
  const timeline = [
    {
      id: 1,
      title: "Order Placed",
      date: "Today, 10:23 AM",
      completed: true,
      icon: Check,
    },
    {
      id: 2,
      title: "Processing",
      date: "Today, 10:45 AM",
      completed: true,
      icon: Package,
    },
    {
      id: 3,
      title: "Shipped",
      date: "Expected Tomorrow",
      completed: false,
      icon: Truck,
      current: true,
    },
    {
      id: 4,
      title: "Out for Delivery",
      date: "Expected Wed, 28 Jan",
      completed: false,
      icon: MapPin,
    },
    {
      id: 5,
      title: "Delivered",
      date: "Expected Wed, 28 Jan",
      completed: false,
      icon: CheckCircle,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 min-h-screen flex flex-col items-center">
      <div className="bg-white p-8 rounded-[2rem] shadow-sm text-center max-w-2xl w-full border border-green-100">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6 animate-in zoom-in duration-500">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">
          Thank you for your order!
        </h1>
        <p className="text-slate-500 mb-8">
          Order #{orderId} has been successfully placed.
        </p>

        <div className="bg-gray-50 rounded-2xl p-8 text-left mb-8 relative overflow-hidden">
          <h2 className="font-bold text-slate-800 mb-8 border-b pb-4">
            Order Timeline
          </h2>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-gray-200" />

            <div className="space-y-8 relative z-10">
              {timeline.map((step) => (
                <div key={step.id} className="flex gap-6 relative">
                  <div
                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-4 shrink-0 transition-colors duration-500
                    ${step.completed ? "bg-green-500 border-green-100 text-white" : ""}
                    ${step.current ? "bg-white border-[#ffd700] text-[#ffd700]" : ""}
                    ${!step.completed && !step.current ? "bg-white border-gray-200 text-gray-300" : ""}
                  `}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div
                    className={`flex-1 pt-1 ${step.current ? "opacity-100" : step.completed ? "opacity-100" : "opacity-40"}`}
                  >
                    <h4 className="font-bold text-slate-900 leading-none mb-1">
                      {step.title}
                    </h4>
                    <p className="text-xs font-medium text-slate-500">
                      {step.date}
                    </p>
                    {step.current && (
                      <span className="inline-block mt-2 text-[10px] font-bold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full animate-pulse">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Link href="/">
          <Button
            size="lg"
            className="rounded-full bg-slate-900 text-white hover:bg-slate-800 font-bold w-full md:w-auto px-12"
          >
            Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
