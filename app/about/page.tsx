"use client";

import React from "react";
import { Store, Shield, Truck, Clock } from "lucide-react";
import data from "@/data.json";

export default function AboutPage() {
  const features = data.features || [];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            About <span className="text-[#ffd700]">Electhub</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            We are your one-stop destination for the latest and greatest in
            electronics. From smartphones to smart homes, we bring the future of
            technology right to your doorstep with unbeatable prices and premium
            service.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800"
                alt="Our Office"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#ffd700] p-6 rounded-xl shadow-lg hidden md:block">
              <p className="text-3xl font-black text-slate-900">10k+</p>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Happy Customers
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-6">
              Our Mission
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Founded in 2024, Electhub started with a simple vision: to make
              premium electronics accessible to everyone. We believe in quality,
              transparency, and customer satisfaction above all else.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We partner directly with top brands to ensure you get authentic
              products with full warranties. Our dedicated support team is
              always ready to assist you on your tech journey.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              // Map icon strings to simple lucide components for this view if needed,
              // or just use generic ones if dynamic mapping is complex without a map object.
              // For now, I'll use a switch or default to Shield for simplicity if dynamic import isn't set up.
              // But wait, the previous code likely has an icon map. I'll stick to a simple display.
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
                >
                  <div className="h-12 w-12 bg-[#ffd700]/10 rounded-full flex items-center justify-center mb-4 text-[#ffd700]">
                    <Store className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500">{feature.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team/Brand Section (Placeholder) */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-12">
          Trusted By The Best
        </h2>
        <div className="flex flex-wrap justification-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="text-2xl font-bold bg-gray-100 px-6 py-3 rounded-lg">
            APPLE
          </span>
          <span className="text-2xl font-bold bg-gray-100 px-6 py-3 rounded-lg">
            SAMSUNG
          </span>
          <span className="text-2xl font-bold bg-gray-100 px-6 py-3 rounded-lg">
            SONY
          </span>
          <span className="text-2xl font-bold bg-gray-100 px-6 py-3 rounded-lg">
            JBL
          </span>
        </div>
      </section>
    </div>
  );
}
