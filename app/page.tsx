"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Plane,
  RotateCcw,
  Wallet,
  Headset,
  Speaker,
  Laptop,
  Headphones,
  TabletSmartphone,
  Camera,
  Tv,
  Smartphone,
  Star,
  ShoppingCart,
  Heart,
  ArrowRight,
  Truck,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/store/cartStore";
import data from "@/data.json";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Icon Mapping
const IconMap: Record<string, React.ElementType> = {
  plane: Plane,
  "rotate-ccw": RotateCcw,
  wallet: Wallet,
  headset: Headset,
  speaker: Speaker,
  laptop: Laptop,
  headphones: Headphones,
  "tablet-smartphone": TabletSmartphone,
  camera: Camera,
  tv: Tv,
  smartphone: Smartphone,
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < Math.floor(rating) ? "fill-[#ffd700] text-[#ffd700]" : "fill-gray-200 text-gray-200"}`}
      />
    ))}
  </div>
);

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  tag?: string | null;
}

const ProductCard = ({ product }: { product: Product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success("Added to cart!");
  };

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <div className="group relative bg-white rounded-2xl p-3 md:p-4 border border-transparent hover:border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Discount Badge */}
        {product.tag && (
          <Badge
            className={`absolute top-3 left-3 z-10 px-2 py-0.5 text-[10px] font-bold rounded-sm border-none shadow-sm ${product.tag === "OUT OF STOCK" ? "bg-red-50 text-red-600" : "bg-[#ffd700] text-slate-900"}`}
          >
            {product.tag}
          </Badge>
        )}

        {/* Wishlist Button */}
        <button
          className="absolute top-2 right-2 z-10 p-2 text-slate-300 hover:text-red-500 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            toast.success("Added to wishlist");
          }}
        >
          <Heart className="h-5 w-5 fill-current" />
        </button>

        {/* Product Image */}
        <div className="relative aspect-[1/1] mb-3 overflow-hidden rounded-xl bg-gray-50/50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col space-y-2">
          <h3 className="font-semibold text-sm text-slate-800 leading-snug line-clamp-2 h-[36px]">
            {product.name}
          </h3>

          <div className="mt-auto space-y-2">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    ₹{product.oldPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              {product.oldPrice && (
                <span className="text-[10px] font-bold text-green-600">
                  {Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) *
                      100,
                  )}
                  % off
                </span>
              )}
            </div>

            <Button
              size="sm"
              className="w-full rounded-full bg-[#ffd700] hover:bg-[#ffe135] text-slate-900 text-xs font-bold h-9 shadow-sm"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pb-24 bg-gray-50/50">
      {/* 1. Hero Section (Mobile Optimized) */}
      <section className="px-4 pt-4 md:pt-6">
        <div className="relative rounded-[2rem] overflow-hidden h-[400px] md:h-[500px] bg-white group shadow-sm">
          <Image
            src={data.heroBanner.image}
            alt="Hero Banner"
            fill
            className="object-cover object-bottom md:object-right transition-transform duration-1000 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-white via-white/50 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end md:justify-center p-6 md:p-12 pb-12 md:pb-12 text-center md:text-left items-center md:items-start">
            <Badge className="bg-slate-900 text-white border-none px-3 py-1 mb-4 text-[10px] tracking-widest uppercase font-bold rounded-full animate-in fade-in slide-in-from-bottom-5">
              New Arrival
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-[0.9] tracking-tighter mb-4 max-w-sm">
              {data.heroBanner.title}
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-6">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Starting at
              </p>
              <span className="text-3xl font-black text-slate-900">
                ₹59,999
              </span>
            </div>
            <Button
              size="lg"
              className="h-12 md:h-14 rounded-full bg-[#ffd700] hover:bg-[#ffe135] text-slate-900 font-bold px-8 shadow-lg shadow-yellow-400/20 active:scale-95 transition-all w-full md:w-auto"
            >
              {data.heroBanner.buttonText}
            </Button>
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            <div className="h-1.5 w-6 rounded-full bg-slate-900" />
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          </div>
        </div>
      </section>

      {/* 2. Categories (Horizontal Scroll) */}
      <section className="w-full">
        <div className="px-4 mb-4 flex items-center justify-between">
          <h3 className="font-bold text-lg text-slate-900">Categories</h3>
          <Link href="#" className="text-xs font-bold text-blue-600">
            See All
          </Link>
        </div>
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex gap-4 px-4">
            {data.categories.map((cat, i) => {
              const Icon = IconMap[cat.icon];
              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-sm relative overflow-hidden">
                    {Icon && <Icon className="h-7 w-7 text-slate-700" />}
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">
                    {cat.name}
                  </span>
                </div>
              );
            })}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </section>

      {/* 3. Small Banners (Stacked Grid) */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.smallBanners.map((banner) => (
            <div
              key={banner.id}
              className="relative h-40 md:h-48 rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm flex items-center px-6"
            >
              <div className="relative z-10 w-1/2 space-y-2">
                <h3 className="font-black text-lg md:text-xl text-slate-900 leading-none uppercase">
                  {banner.title}
                </h3>
                <span className="inline-block text-[10px] font-bold bg-[#ffd700] px-2 py-0.5 rounded-sm">
                  {banner.subtitle}
                </span>
              </div>
              <div className="absolute right-0 bottom-0 top-0 w-1/2">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Best Selling Grid */}
      <section className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <Zap className="h-5 w-5 text-[#ffd700] fill-current" />
          <h2 className="text-xl font-bold text-slate-900">
            Best Selling Deals
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {data.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Trust Signals (Swipeable Row) */}
      <section className="container mx-auto px-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex flex-wrap justify-between gap-y-6 md:gap-4">
            {[
              { icon: Truck, title: "Free Delivery", sub: "On orders > ₹1000" },
              {
                icon: RotateCcw,
                title: "Easy Returns",
                sub: "7 Days replacement",
              },
              {
                icon: ShieldCheck,
                title: "1 Year Warranty",
                sub: "Authorized Brand",
              },
              { icon: Wallet, title: "Secure Payment", sub: "UPI & Cards" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 w-[45%] md:w-auto"
              >
                <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-slate-900 shrink-0">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-500">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Newsletter */}
      <section className="container mx-auto px-4 pb-8">
        <div className="bg-slate-900 rounded-3xl p-8 text-center text-white space-y-6">
          <h2 className="text-2xl font-black">Get 10% Off Your First Order</h2>
          <p className="text-slate-400 text-sm">
            Join our newsletter and get exclusive deals directly.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 rounded-full bg-white/10 border-white/10 px-4 py-3 text-sm"
            />
            <Button className="rounded-full bg-[#ffd700] text-slate-900 font-bold">
              Join
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
