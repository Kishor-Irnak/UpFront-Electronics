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
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import data from "@/data.json";
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
  specs: Record<string, string>;
  image: string;
  tag?: string | null;
}

export default function ProductDetails({ params }: { params: { id: string } }) {
  const router = useRouter();
  // Unwrapping params for cleaner Next.js compatibility in future versions if needed,
  // currently we treat it as sync mostly but good practice to allow for async

  const [product, setProduct] = React.useState<Product | null>(null);
  const [activeImage, setActiveImage] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState(1);
  const addItem = useCartStore((state) => state.addItem);

  React.useEffect(() => {
    // Handling async params for robust future-proofing
    const resolveParams = async () => {
      const resolved = await params;
      const productId = parseInt(resolved.id);
      const foundProduct = data.products.find((p) => p.id === productId);
      if (!foundProduct) {
        // In a real app we might redirect or show 404 component
        return;
      }
      setProduct(foundProduct);
      setActiveImage(foundProduct.image);
    };
    resolveParams();
  }, [params]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center space-x-2">
        <div className="h-4 w-4 bg-[#ffd700] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-4 w-4 bg-[#ffd700] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-4 w-4 bg-[#ffd700] rounded-full animate-bounce"></div>
      </div>
    );
  }

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

            {/* Thumbnails (Mocked for now since data.json has 1 image per product, normally we'd map) */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {[activeImage, activeImage, activeImage].map((img, i) => (
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
    </div>
  );
}
