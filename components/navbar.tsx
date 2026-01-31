"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  ChevronDown,
  AlignLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import data from "@/data.json";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export function Navbar() {
  const { items, total } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const wishlistCount = wishlistItems.length;
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col w-full sticky top-0 z-50 bg-white shadow-sm">
      {/* 1. Top Bar (Yellow) */}
      <div className="bg-[#ffd700] py-1.5 text-[10px] md:text-xs font-bold text-slate-900 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block px-4">
          <span className="mx-4">{data.topBar.message}</span>
          <span className="mx-4">{data.topBar.message}</span>
          <span className="mx-4">{data.topBar.message}</span>
          <span className="mx-4">{data.topBar.message}</span>
        </div>
      </div>

      {/* 2. Main Header */}
      <header className="border-b py-2.5 md:py-4">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter group-hover:opacity-90 transition-opacity">
              electhub
            </span>
          </Link>

          <div className="hidden lg:block flex-1 w-full max-w-3xl px-0 lg:px-12">
            <div className="relative flex items-center w-full group">
              <Input
                type="search"
                placeholder="Search products, brands and categories..."
                className="w-full rounded-full border-2 border-gray-100 pr-14 h-12 bg-gray-50 focus-visible:ring-0 focus-visible:border-[#ffd700] focus-visible:bg-white transition-all shadow-sm hover:shadow-md"
              />
              <Button
                size="icon"
                className="absolute right-1.5 top-1.5 h-9 w-9 rounded-full bg-[#ffd700] hover:bg-[#ffe135] text-slate-900 shadow-sm transition-transform active:scale-95"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/profile"
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors group"
            >
              <User className="h-6 w-6 stroke-[1.5] group-hover:stroke-2 transition-all" />
              <span className="text-[10px] font-bold uppercase tracking-wider hidden md:block">
                Profile
              </span>
            </Link>
            <Link
              href="/wishlist"
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors group relative"
            >
              <div className="relative">
                <Heart className="h-6 w-6 stroke-[1.5] group-hover:stroke-2 transition-all" />
                <span
                  className={`absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffd700] text-[9px] font-extrabold shadow-sm transform transition-transform ${wishlistCount > 0 ? "scale-100" : "scale-0 group-hover:scale-100"}`}
                >
                  {wishlistCount}
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider hidden md:block">
                Wishlist
              </span>
            </Link>
            <Link
              href="/cart"
              className="flex flex-col items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors group"
            >
              <div className="relative">
                <ShoppingCart className="h-6 w-6 stroke-[1.5] group-hover:stroke-2 transition-all" />
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffd700] text-[9px] font-extrabold shadow-sm animate-in zoom-in spin-in-12 duration-300">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider hidden md:block">
                {mounted ? `₹${total().toLocaleString("en-IN")}` : "Cart"}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* 3. Navigation Bar */}
      <div className="bg-white border-b hidden lg:block">
        <div className="container mx-auto px-4 flex items-center justify-between h-12">
          {/* ... existing browser categories ... */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex gap-2.5 px-4 h-full rounded-none border-r hover:bg-gray-50 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <AlignLeft className="h-5 w-5" />
                Browse All Categories
                <ChevronDown className="h-3.5 w-3.5 opacity-40 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 p-2 shadow-xl rounded-xl border-gray-100"
              align="start"
              sideOffset={0}
            >
              {data.categories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/products?category=${cat.name
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                  passHref
                >
                  <DropdownMenuItem className="py-2.5 px-4 font-medium text-slate-600 focus:text-slate-900 focus:bg-[#fff9c4] rounded-lg cursor-pointer">
                    {cat.name}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <nav className="flex items-center gap-10 flex-1 justify-center">
            {data.navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-[13px] font-semibold text-slate-600 hover:text-slate-900 uppercase tracking-wide transition-colors group py-4"
              >
                {item.name}
                {item.badge && (
                  <span className="absolute -top-1 -right-5 bg-[#ffd700] text-slate-900 text-[8px] px-1.5 py-px rounded-sm font-black shadow-sm transform transition-transform">
                    {item.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ffd700] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="text-xs font-bold text-slate-400">
            Free Shipping on Orders ₹1000+
          </div>
        </div>
      </div>

      {/* Mobile Menu Trigger (Visible on small screens) */}
      <div className="hidden container mx-auto px-4 py-2 border-t justify-between items-center bg-gray-50">
        <span className="text-xs font-bold text-slate-500">Menu</span>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6 text-slate-900" />
        </Button>
      </div>
    </div>
  );
}
