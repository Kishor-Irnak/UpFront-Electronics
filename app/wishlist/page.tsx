"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { useWishlistStore } from "@/store/wishlistStore";

export default function WishlistPage() {
  const { items: wishlistItems } = useWishlistStore();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-6 w-6 text-[#ffd700] fill-current" />
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            My Wishlist ({wishlistItems.length})
          </h1>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="h-24 w-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-10 w-10 text-slate-300" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
              Explore our vast collection of electronics and save your favorites
              here.
            </p>
            <Link href="/products">
              <Button className="bg-[#ffd700] text-slate-900 hover:bg-[#ffe135] font-bold px-8">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
