"use client"
import React from 'react';
import Header from "../dashboard/_components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

function UpgradePage() {
  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      period: "month",
      description: "Perfect for beginners",
      features: [
        "5 AI Interview Sessions",
        "Basic Performance Analytics",
        "Email Support"
      ],
      isPopular: false
    },
    {
      name: "Pro",
      price: "$19.99",
      period: "month",
      description: "Best for serious job seekers",
      features: [
        "Unlimited AI Interview Sessions",
        "Advanced Performance Analytics",
        "Video Interview Practice",
        "Priority Email Support"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "$49.99",
      period: "month",
      description: "For teams and organizations",
      features: [
        "All Pro Features",
        "Custom Interview Scenarios",
        "Team Performance Tracking",
        "Dedicated Account Manager",
        "24/7 Phone Support"
      ],
      isPopular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Upgrade Your Plan</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`flex flex-col ${plan.isPopular ? 'border-blue-500 border-2' : ''}`}>
              {plan.isPopular && (
                <div className="bg-blue-500 text-white text-center py-1 px-4 rounded-t-lg">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-3xl font-bold mb-4">
                  {plan.price}<span className="text-sm font-normal">/{plan.period}</span>
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={plan.isPopular ? "default" : "outline"}>
                  Choose {plan.name}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

export default UpgradePage;