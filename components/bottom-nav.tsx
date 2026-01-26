"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Search, ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import * as React from "react";

export function BottomNav() {
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Categories", href: "#categories", icon: LayoutGrid },
    { name: "Search", href: "#search", icon: Search },
    { name: "Cart", href: "/cart", icon: ShoppingCart, badge: itemCount },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 lg:hidden pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? "text-[#ffd700]" : "text-slate-500"
              }`}
            >
              <div className="relative">
                <item.icon
                  className={`h-6 w-6 ${isActive ? "fill-current" : "stroke-[1.5]"}`}
                />
                {item.name === "Cart" &&
                  mounted &&
                  item.badge !== undefined &&
                  item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffd700] text-slate-900 text-[10px] font-bold border-2 border-white">
                      {item.badge}
                    </span>
                  )}
              </div>
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
