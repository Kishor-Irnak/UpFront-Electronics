"use client";

import * as React from "react";
import { Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import data from "@/data.json";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const sortParam = searchParams.get("sort");
  const queryParam = searchParams.get("search");

  // Filter products logic
  const filteredProducts = React.useMemo(() => {
    let products = [...data.products];

    // 1. Filter by Search Query (Name or Brand or Category)
    if (queryParam) {
      const q = queryParam.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q)),
      );
    }

    // 2. Filter by Category
    if (categoryParam) {
      const cat = categoryParam.toLowerCase();
      products = products.filter((p) => {
        // If product category explicitly matches
        if (p.category && p.category.toLowerCase().includes(cat)) return true;
        // Or if product name contains the category term (loose match for things like 'watch')
        // "smart-watch" -> "watch"
        const simpleCat = cat.replace("smart-", "").replace("android-", "");
        if (p.name.toLowerCase().includes(simpleCat)) return true;
        return false;
      });
    }

    // 3. Sort / Filter by special tags like 'new'
    if (sortParam === "new") {
      products = products.sort((a, b) => {
        const aIsNew = a.tag === "NEW";
        const bIsNew = b.tag === "NEW";
        if (aIsNew && !bIsNew) return -1;
        if (!aIsNew && bIsNew) return 1;
        // Secondary sort by ID desc (simulating newer items have higher IDs)
        return b.id - a.id;
      });
    }

    return products;
  }, [categoryParam, sortParam, queryParam]);

  // Determine Title based on filters
  const pageTitle = React.useMemo(() => {
    if (queryParam) return `Results for "${queryParam}"`;
    if (categoryParam) {
      // Humanize slug: "smart-watch" -> "Smart Watch"
      return categoryParam
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    }
    if (sortParam === "new") return "New Arrivals";
    return "Explore All Products";
  }, [categoryParam, sortParam, queryParam]);

  return (
    <div className="flex flex-col gap-8 pb-24 bg-gray-50/50 min-h-screen">
      <section className="container mx-auto px-4 pt-8">
        <div className="flex items-center gap-2 mb-8">
          <Zap className="h-6 w-6 text-[#ffd700] fill-current" />
          <h1 className="text-3xl font-black text-slate-900 tracking-tight capitalize">
            {pageTitle}
          </h1>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-center mb-4">
              <Zap className="h-12 w-12 text-slate-200" />
            </div>
            <p className="text-xl text-slate-500 font-bold">
              No products found for this category.
            </p>
            <button
              onClick={() => (window.location.href = "/products")}
              className="mt-4 px-6 py-2 bg-[#ffd700] text-slate-900 rounded-lg font-black hover:bg-[#ffe135] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
