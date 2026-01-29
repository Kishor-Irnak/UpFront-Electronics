"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  Undo2,
  RotateCcw,
  CheckCircle,
  Share2,
  Heart,
  Monitor,
  Cpu,
  Camera as CameraIcon,
  Battery,
  User,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  specs: Record<string, any>;
  image: string;
  tag?: string | null;
  category: string;
}

export default function ProductDetails({
  product,
  params,
}: {
  product: Product;
  params: { id: string };
}) {
  const router = useRouter();
  const [activeImage, setActiveImage] = React.useState<string>(product.image);
  const [quantity, setQuantity] = React.useState(1);
  const [userRating, setUserRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const discountPercentage = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
    toast.success("Added to cart!");
  };

  return (
    <div className="bg-white pb-20">
      {/* Breadcrumb / Back Navigation */}
      <div className="container mx-auto px-4 py-4 md:py-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <Undo2 className="mr-2 h-4 w-4" /> Back to Products
        </Link>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Images (Stick on Desktop) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="sticky top-24 space-y-6">
            <div className="relative aspect-[4/3] rounded-[2rem] bg-[#f8f8f8] overflow-hidden group border border-transparent hover:border-gray-100 transition-all">
              {product.tag && (
                <span className="absolute top-6 left-6 z-10 bg-[#ffd700] text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  {product.tag}
                </span>
              )}
              <div className="absolute top-6 right-6 z-10 flex flex-col gap-3">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full bg-white shadow-sm hover:shadow-md text-slate-600 hover:text-red-500 transition-all"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full bg-white shadow-sm hover:shadow-md text-slate-600 hover:text-blue-500 transition-all"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-contain p-12 transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {[product.image, product.image, product.image].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 h-24 rounded-2xl bg-[#f8f8f8] border-2 flex-shrink-0 overflow-hidden transition-all ${activeImage === img && i === 0 ? "border-[#ffd700] ring-1 ring-[#ffd700]/50" : "border-transparent hover:border-gray-200"}`}
                >
                  <Image
                    src={img}
                    alt="Thumbnail"
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="lg:col-span-5 space-y-8">
          {/* Header Info */}
          <div className="space-y-4 border-b border-gray-100 pb-8">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-[1.1]">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                <span className="font-bold text-sm text-slate-900 mr-2">
                  {product.rating}
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-[#ffd700] text-[#ffd700]" : "fill-gray-300 text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <Link
                href="#reviews"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                {product.reviews} Verified Reviews
              </Link>
              <span className="flex items-center gap-1.5 text-green-600 text-sm font-bold bg-green-50 px-2 py-0.5 rounded-full">
                <CheckCircle className="h-3.5 w-3.5" /> In Stock
              </span>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black text-slate-900 tracking-tight">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.oldPrice && (
                <div className="flex flex-col items-start leading-none">
                  <span className="text-lg text-slate-400 line-through font-medium">
                    ₹{product.oldPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    Save ₹
                    {(product.oldPrice - product.price).toLocaleString("en-IN")}{" "}
                    ({discountPercentage}%)
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs font-medium text-slate-500">
              Inclusive of all taxes.{" "}
              <span className="text-blue-600 cursor-pointer">
                EMI starts at ₹{(product.price / 12).toFixed(0)}/mo
              </span>
            </p>
          </div>

          {/* Quick Specifications Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Monitor, label: "Display", value: "OLED" },
              { icon: Cpu, label: "Processor", value: "Fast" },
              { icon: CameraIcon, label: "Camera", value: "Pro" },
              { icon: Battery, label: "Battery", value: "Long" },
            ].map((spec, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1 hover:bg-gray-100 transition-colors cursor-default"
              >
                <spec.icon className="h-5 w-5 text-slate-700" />
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  {spec.label}
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          {/* Accordion Details */}
          <div className="pt-2">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description" className="border-gray-100">
                <AccordionTrigger className="font-bold text-slate-900 hover:no-underline">
                  Description
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed text-base">
                  {product.description}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="specs" className="border-gray-100">
                <AccordionTrigger className="font-bold text-slate-900 hover:no-underline">
                  Detailed Specifications
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {product.specs &&
                      Object.entries(product.specs).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between py-2 border-b border-gray-50 last:border-0"
                        >
                          <span className="text-slate-500 font-medium">
                            {key}
                          </span>
                          <span className="text-slate-900 font-bold">
                            {value as string}
                          </span>
                        </div>
                      ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Actions */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-gray-100 rounded-full h-14 px-4 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:text-[#ffd700] transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-bold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:text-[#ffd700] transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button
                size="lg"
                className="flex-1 h-14 rounded-full bg-[#ffd700] hover:bg-[#ffe135] text-slate-900 font-bold text-lg shadow-xl shadow-yellow-400/20 active:scale-95 transition-all"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
            <Button
              variant="outline"
              size="lg"
              className="w-full h-14 rounded-full border-2 border-slate-200 font-bold text-slate-900 hover:bg-slate-50 hover:border-slate-300"
              onClick={() => {
                handleAddToCart();
                router.push("/checkout");
              }}
            >
              Buy Now
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            {[
              { icon: Truck, title: "Free Delivery", sub: "By Wed, Jan 28" },
              {
                icon: ShieldCheck,
                title: "1 Year Warranty",
                sub: "Brand Authorized",
              },
              {
                icon: RotateCcw,
                title: "30 Days Return",
                sub: "No questions asked",
              },
              {
                icon: CheckCircle,
                title: "Secure Payment",
                sub: "SSL Encrypted",
              },
            ].map((badge, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <badge.icon className="h-5 w-5 text-slate-900 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    {badge.title}
                  </h4>
                  <p className="text-[10px] font-medium text-slate-500">
                    {badge.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div
        id="reviews"
        className="container mx-auto px-4 mt-20 border-t border-gray-100 pt-16"
      >
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column: Review Summary & List */}
          <div className="lg:col-span-12 w-full lg:w-2/3 space-y-10">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                Customer Reviews
                <Badge
                  variant="secondary"
                  className="bg-[#ffd700] text-slate-900 rounded-full px-3"
                >
                  {product.reviews}
                </Badge>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mock Review 1 */}
              <div className="bg-gray-50/50 rounded-3xl p-8 space-y-4 border border-transparent hover:border-gray-100 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-[#ffd700]/20 flex items-center justify-center">
                      <User className="h-6 w-6 text-slate-700" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Rahul Sharma</p>
                      <p className="text-xs text-slate-500 font-medium">
                        Verified Buyer • 2 days ago
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-[#ffd700] text-[#ffd700]"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium capitalize">
                  "Absolutely amazing product! The build quality is premium and
                  it performs better than expected. Highly recommended for
                  everyone."
                </p>
              </div>

              {/* Mock Review 2 */}
              <div className="bg-gray-50/50 rounded-3xl p-8 space-y-4 border border-transparent hover:border-gray-100 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                      <User className="h-6 w-6 text-slate-700" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Ananya Iyer</p>
                      <p className="text-xs text-slate-500 font-medium">
                        Verified Buyer • 1 week ago
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < 4 ? "fill-[#ffd700] text-[#ffd700]" : "fill-gray-200 text-gray-200"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium capitalize">
                  "Great value for money. The delivery was super fast and the
                  packaging was excellent. One star less just because of the
                  color options."
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-14 rounded-full border-2 border-slate-200 font-bold text-slate-900 hover:bg-slate-50"
            >
              Show All Reviews
            </Button>
          </div>

          {/* Right Column: Write a Review Form */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white space-y-8 shadow-2xl shadow-slate-200">
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight">
                  Write a Review
                </h3>
                <p className="text-slate-400 text-sm font-medium">
                  Your feedback helps us improve and helps others shop better.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-slate-300 font-bold text-xs uppercase tracking-wider">
                    Overall Rating
                  </Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        className="p-1 hover:scale-110 transition-transform focus:outline-none"
                        onMouseEnter={() => setHoverRating(s)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => {
                          setUserRating(s);
                          toast.success(`You rated ${s} stars!`);
                        }}
                      >
                        <Star
                          className={`h-8 w-8 transition-all duration-200 ${
                            s <= (hoverRating || userRating)
                              ? "fill-[#ffd700] text-[#ffd700]"
                              : "text-slate-700 fill-slate-800"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-300 font-bold text-xs uppercase tracking-wider">
                    Your Review
                  </Label>
                  <Textarea
                    placeholder="What did you like or dislike? How are you using it?"
                    className="bg-slate-800 border-none rounded-2xl min-h-[120px] focus-visible:ring-1 focus-visible:ring-[#ffd700] text-white placeholder:text-slate-500 p-4"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-slate-300 font-bold text-xs uppercase tracking-wider">
                    Title
                  </Label>
                  <Input
                    placeholder="Sum up your review in one line"
                    className="bg-slate-800 border-none rounded-2xl h-12 focus-visible:ring-1 focus-visible:ring-[#ffd700] text-white placeholder:text-slate-500 px-4"
                  />
                </div>

                <Button
                  className="w-full h-14 rounded-full bg-[#ffd700] hover:bg-[#ffe135] text-slate-900 font-black text-lg shadow-xl shadow-[#ffd700]/10"
                  onClick={() =>
                    toast.success("Review submitted for moderation!")
                  }
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
