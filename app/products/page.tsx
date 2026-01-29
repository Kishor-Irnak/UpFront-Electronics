"use client";

import * as React from "react";
import { Zap } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import data from "@/data.json";

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-8 pb-24 bg-gray-50/50 min-h-screen">
      <section className="container mx-auto px-4 pt-8">
        <div className="flex items-center gap-2 mb-8">
          <Zap className="h-6 w-6 text-[#ffd700] fill-current" />
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Explore All Products
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
