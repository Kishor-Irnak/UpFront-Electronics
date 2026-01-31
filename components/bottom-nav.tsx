"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  LayoutGrid,
  Search,
  ShoppingCart,
  User,
  X,
  ChevronRight,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import data from "@/data.json";

export function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      // Close sheet logic would be here if using state-controlled sheet
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 lg:hidden pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
      <div className="flex justify-around items-center h-16">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
            pathname === "/"
              ? "text-[#ffd700]"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <Home
            className={`h-6 w-6 ${pathname === "/" ? "fill-current" : "stroke-[1.5]"}`}
          />
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            Home
          </span>
        </Link>

        {/* Search Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-400 hover:text-slate-600 transition-colors">
              <Search className="h-6 w-6 stroke-[1.5]" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">
                Search
              </span>
            </button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="h-[200px] rounded-t-[2rem] border-none"
          >
            <div className="container mx-auto px-4 py-8">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  autoFocus
                  placeholder="Search products, brands..."
                  className="h-14 rounded-full border-2 border-gray-100 pr-16 focus-visible:ring-0 focus-visible:border-[#ffd700] bg-gray-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-2 h-10 rounded-full bg-[#ffd700] hover:bg-[#ffe135] text-slate-900 font-bold px-6"
                >
                  Search
                </Button>
              </form>
            </div>
          </SheetContent>
        </Sheet>

        {/* Cart */}
        <Link
          href="/cart"
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
            pathname === "/cart"
              ? "text-[#ffd700]"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <div className="relative">
            <ShoppingCart
              className={`h-6 w-6 ${pathname === "/cart" ? "fill-current" : "stroke-[1.5]"}`}
            />
            {mounted && itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffd700] text-slate-900 text-[9px] font-black border-2 border-white animate-in zoom-in">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            Cart
          </span>
        </Link>

        {/* Profile */}
        <Link
          href="/profile"
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
            pathname === "/profile"
              ? "text-[#ffd700]"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <User
            className={`h-6 w-6 ${pathname === "/profile" ? "fill-current" : "stroke-[1.5]"}`}
          />
          <span className="text-[10px] font-bold uppercase tracking-tighter">
            Profile
          </span>
        </Link>
      </div>
    </div>
  );
}
