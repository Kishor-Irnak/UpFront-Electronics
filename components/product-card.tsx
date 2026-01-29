"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCartStore } from "@/store/cartStore";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  tag?: string | null;
}

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

export const ProductCard = ({ product }: { product: Product }) => {
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
    <Card className="group relative bg-white rounded-2xl border border-transparent hover:border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col overflow-hidden p-0">
      <Link
        href={`/products/${product.id}`}
        className="flex flex-col flex-1 p-3 md:p-4"
      >
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
        <div className="relative aspect-square mb-3 overflow-hidden rounded-xl bg-gray-50/50">
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

          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} />
            <span className="text-[10px] font-medium text-slate-400">
              ({product.reviews})
            </span>
          </div>

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
      </Link>
    </Card>
  );
};
