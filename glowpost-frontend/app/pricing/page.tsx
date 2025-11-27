"use client"

import { useState, useEffect } from "react"
import { Check, Star, Flame, Rocket } from "lucide-react"

const pricingData = {
  INR: {
    symbol: "₹",
    plans: [
      { name: "Free", price: "0", period: "forever" },
      { name: "Pro", price: "199", period: "/month" },
      { name: "Agency", price: "799", period: "/month" },
    ],
    templates: "₹49–₹299",
  },
  USD: {
    symbol: "$",
    plans: [
      { name: "Free", price: "0", period: "forever" },
      { name: "Pro", price: "2.99", period: "/month" },
      { name: "Agency", price: "9.99", period: "/month" },
    ],
    templates: "$0.99–$3.99",
  },
}

const planDetails = [
  {
    name: "Free",
    icon: Star,
    description: "Perfect for getting started",
    features: ["Create posts", "Save posts locally", "Basic calendar", "Limited templates"],
    cta: "Start Free",
    popular: false,
    glowColor: "blue",
  },
  {
    name: "Pro",
    icon: Flame,
    description: "Best for content creators",
    features: [
      "Everything in Free",
      "Unlimited drafts",
      "Advanced scheduler",
      "Brand settings",
      "Export content",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    popular: true,
    glowColor: "purple",
  },
  {
    name: "Agency",
    icon: Rocket,
    description: "For teams and agencies",
    features: [
      "Everything in Pro",
      "Manage multiple brands",
      "Team access",
      "Content folders",
      "Custom colors",
      "Dedicated support",
    ],
    cta: "Contact for Agency Access",
    popular: false,
    glowColor: "pink",
  },
]

export default function PricingPage() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR")

  useEffect(() => {
    const detectCurrency = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()
        if (data.country_code === "US") {
          setCurrency("USD")
        } else {
          setCurrency("INR")
        }
      } catch {
        // Default to INR if detection fails
        setCurrency("INR")
      }
    }
    detectCurrency()
  }, [])

  const currentPricing = pricingData[currency]

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Choose Your{" "}
          <span className="bg-gradient-to-r from-[#A855F7] to-[#EC4899] bg-clip-text text-transparent">Plan</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">Select the perfect plan for your content creation needs</p>

        <div className="inline-flex items-center gap-1 p-1 bg-[#1A1A2E] rounded-lg border border-[#A855F7]/20">
          <button
            onClick={() => setCurrency("INR")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              currency === "INR"
                ? "bg-gradient-to-r from-[#A855F7] to-[#EC4899] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            INR (₹)
          </button>
          <button
            onClick={() => setCurrency("USD")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              currency === "USD"
                ? "bg-gradient-to-r from-[#A855F7] to-[#EC4899] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            USD ($)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {planDetails.map((plan, index) => {
          const Icon = plan.icon
          const pricing = currentPricing.plans[index]
          return (
            <div
              key={plan.name}
              className={`neon-card relative ${plan.popular ? "neon-glow-purple border-[#A855F7]/50" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#A855F7] to-[#EC4899] rounded-full text-xs font-semibold">
                  Most Popular
                </div>
              )}

              <div className="text-center mb-6">
                <div
                  className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 ${
                    plan.glowColor === "purple"
                      ? "bg-[#A855F7]/20"
                      : plan.glowColor === "pink"
                        ? "bg-[#EC4899]/20"
                        : "bg-[#3B82F6]/20"
                  }`}
                >
                  <Icon
                    className={`w-7 h-7 ${
                      plan.glowColor === "purple"
                        ? "text-[#A855F7]"
                        : plan.glowColor === "pink"
                          ? "text-[#EC4899]"
                          : "text-[#3B82F6]"
                    }`}
                  />
                </div>
                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">
                    {currentPricing.symbol}
                    {pricing.price}
                  </span>
                  <span className="text-gray-400">{pricing.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#A855F7] flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular ? "neon-button" : "neon-button-outline"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          )
        })}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-400">
          Template packs available from <span className="text-[#A855F7] font-semibold">{currentPricing.templates}</span>
        </p>
      </div>
    </div>
  )
}
