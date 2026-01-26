"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CreditCard, Truck, ShieldCheck, Wallet, Banknote } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const cartTotal = total();
  const tax = cartTotal * 0.18;
  const finalTotal = cartTotal + tax;

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    toast.success("Order placed successfully!");
    router.push(`/orders/ORDER-${Math.floor(Math.random() * 100000)}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">
        Checkout
      </h1>

      <form
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto"
      >
        {/* Left Column: Forms */}
        <div className="lg:col-span-8 space-y-8">
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" /> Shipping Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" required />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="123 Main St, Apartment 4B"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="New York" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" placeholder="10001" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" /> Payment Method
            </h2>
            <RadioGroup
              defaultValue="card"
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="card"
                  id="card"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="card"
                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all h-full"
                >
                  <CreditCard className="mb-3 h-6 w-6" />
                  <span className="font-semibold">Card</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                <Label
                  htmlFor="upi"
                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all h-full"
                >
                  <Wallet className="mb-3 h-6 w-6" />
                  <span className="font-semibold">UPI / NetBanking</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
                <Label
                  htmlFor="cod"
                  className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all h-full"
                >
                  <Banknote className="mb-3 h-6 w-6" />
                  <span className="font-semibold">Cash on Delivery</span>
                </Label>
              </div>
            </RadioGroup>

            <div className="mt-6 space-y-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <Label>Card Number</Label>
                <Input placeholder="0000 0000 0000 0000" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label>CVC</Label>
                  <Input placeholder="123" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-2xl border shadow-sm sticky top-24 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-4">
              Order Summary
            </h2>
            <div className="space-y-4 max-h-[300px] overflow-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-16 w-16 bg-gray-50 rounded-lg shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium line-clamp-2">
                      {item.name}
                    </h4>
                    <p className="text-sm font-bold text-slate-600">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%)</span>
                <span>₹{tax.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-green-600 font-bold">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between items-end">
              <span className="font-bold text-lg">Total</span>
              <span className="font-black text-2xl">
                ₹{finalTotal.toLocaleString("en-IN")}
              </span>
            </div>

            <Button
              type="submit"
              disabled={isProcessing}
              size="lg"
              className="w-full rounded-full bg-[#ffd700] text-slate-900 hover:bg-[#ffc800] font-bold text-lg h-14 shadow-lg shadow-yellow-400/20"
            >
              {isProcessing
                ? "Processing..."
                : `Pay ₹${finalTotal.toLocaleString("en-IN")}`}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4" /> Secure SSL Encryption
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
