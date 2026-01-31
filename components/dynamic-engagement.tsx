"use client";

import * as React from "react";
import { toast } from "sonner";
import data from "@/data.json";
import { ShoppingBag } from "lucide-react";

export function DynamicEngagement() {
  const DEFAULT_TITLE = "ElectHub - Premium Electronics Store";
  const originalTitle = React.useRef(DEFAULT_TITLE);
  const [isTabActive, setIsTabActive] = React.useState(true);

  // 1. Dynamic Tab Title Logic
  React.useEffect(() => {
    // If current title is generic 404, use our default
    if (document.title.includes("404")) {
      document.title = DEFAULT_TITLE;
    }
    originalTitle.current = document.title || DEFAULT_TITLE;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabActive(false);
        document.title = "🔥 Don't miss out! 30% OFF";
      } else {
        setIsTabActive(true);
        // Ensure we don't go back to a 404 title
        document.title = originalTitle.current.includes("404")
          ? DEFAULT_TITLE
          : originalTitle.current;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // 2. "Someone Purchased" Toast Logic
  React.useEffect(() => {
    const showRandomToast = () => {
      if (document.hidden) return;

      const randomProduct =
        data.products[Math.floor(Math.random() * data.products.length)];
      const locations = [
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Chennai",
        "Hyderabad",
        "Pune",
        "Kolkata",
        "Ahmedabad",
        "Jaipur",
      ];
      const randomLocation =
        locations[Math.floor(Math.random() * locations.length)];

      toast(
        <div className="flex items-center gap-3">
          <div className="bg-[#ffd700] p-2 rounded-full">
            <ShoppingBag className="h-4 w-4 text-slate-900" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-900 leading-tight">
              Order Placed!
            </p>
            <p className="text-[10px] text-slate-500 line-clamp-1">
              Someone in {randomLocation} just bought {randomProduct.name}
            </p>
          </div>
        </div>,
        {
          duration: 4000,
          position: "bottom-left",
        },
      );
    };

    // Initial delay
    const initialDelay = setTimeout(showRandomToast, 3000);

    // Show every 12-20 seconds for a more "active" feel
    const interval = setInterval(() => {
      showRandomToast();
    }, 15000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  return null;
}
