"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BRANDS = [
  {
    name: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    name: "Samsung",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
  },
  {
    name: "Sony",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg",
  },
  {
    name: "JBL",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/1e/JBL_logo.svg",
  },
  {
    name: "Beats",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/17/Beats_Electronics_logo.svg",
  },
  {
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    name: "Dell",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg",
  },
  {
    name: "Asus",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg",
  },
  {
    name: "HP",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg",
  },
  {
    name: "Lenovo",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg",
  },
  {
    name: "Xiaomi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg",
  },
  {
    name: "OnePlus",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f8/OnePlus_logo.svg",
  },
];

export default function BrandsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <section className="bg-white border-b py-12 px-4 shadow-sm">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
            Premium Brands
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Discover the world's most trusted electronics brands. We partner
            directly with manufacturers to bring you authentic products with
            comprehensive warranties.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={`/products?search=${brand.name}`}
              className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#ffd700] transition-all group aspect-square"
            >
              <div className="h-16 w-32 relative flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                {/* Fallback to text if image fails or for simplicity in this demo environment */}
                <span className="text-xl font-black text-slate-800">
                  {brand.name}
                </span>
              </div>
              <div className="mt-8 flex items-center gap-2 text-xs font-bold text-[#ffd700] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                View Products <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
