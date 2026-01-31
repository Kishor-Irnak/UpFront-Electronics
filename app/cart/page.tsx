"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center gap-6 min-h-[60vh]">
        <div className="bg-gray-100 p-8 rounded-full">
          <Trash2 className="h-12 w-12 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Your cart is empty
        </h1>
        <p className="text-slate-500">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Link href="/">
          <Button
            size="lg"
            className="rounded-full bg-[#ffd700] text-slate-900 hover:bg-[#ffc800] font-bold"
          >
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border p-6 hidden md:grid grid-cols-12 gap-4 text-sm font-bold text-slate-500 uppercase tracking-wide">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          <ScrollArea className="h-full max-h-[600px] pr-4">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border p-4 grid grid-cols-12 gap-4 items-center group"
                >
                  <div className="col-span-12 md:col-span-6 flex items-center gap-4">
                    <div className="relative h-20 w-20 md:h-24 md:w-24 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-900 line-clamp-2">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-red-500 hover:underline mt-1 flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>

                  <div className="col-span-4 md:col-span-2 text-center font-medium">
                    ₹{item.price.toLocaleString("en-IN")}
                  </div>

                  <div className="col-span-4 md:col-span-2 flex justify-center">
                    <div className="flex items-center border rounded-full py-1 px-3 bg-gray-50">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="p-1 hover:text-primary transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="mx-3 font-bold text-sm min-w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:text-primary transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <div className="col-span-4 md:col-span-2 text-right font-bold text-lg">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border p-6 space-y-6 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₹{total().toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax (18% GST)</span>
                <span>₹{(total() * 0.18).toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-end">
              <span className="font-bold text-slate-900 text-lg">Total</span>
              <span className="font-black text-2xl text-slate-900">
                ₹{(total() * 1.18).toLocaleString("en-IN")}
              </span>
            </div>

            <Link href="/checkout" className="block w-full">
              <Button
                size="lg"
                className="w-full rounded-full bg-[#ffd700] text-slate-900 hover:bg-[#ffc800] font-bold text-base h-12 shadow-lg shadow-yellow-400/20"
              >
                Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <p className="text-xs text-center text-slate-400">
              Secure Checkout - 100% Satisfaction Guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
