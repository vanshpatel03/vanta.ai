import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

const tiers = [
  {
    name: "Premium",
    price: "$9.99",
    period: "/ month",
    description: "For the dedicated job seeker. Unlimited access and priority features.",
    features: [
      "Unlimited AI Resume builds",
      "Unlimited AI Cover Letters",
      "Unlimited outreach messages",
      "Priority career plans",
      "Advanced AI models",
    ],
    cta: "Upgrade to Premium",
    href: "https://vanta.lemonsqueezy.com/checkout/buy/c8a8e5f0-3c1a-4d3a-9e2a-6a5a0c5c7d1e",
    popular: true,
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "/ month",
    description: "For professionals who want personalized guidance and advanced tools.",
    features: [
      "All Premium features",
      "1-on-1 AI mentor",
      "Priority job matching",
      "Dedicated email support",
    ],
    cta: "Upgrade to Pro",
    href: "https://vanta.lemonsqueezy.com/checkout/buy/b8a8e5f0-3c1a-4d3a-9e2a-6a5a0c5c7d1e",
  },
  {
    name: "Pro Annual",
    price: "$49.99",
    period: "/ year",
    description: "Get the ultimate career advantage with a one-time annual payment.",
    features: [
      "All Pro features",
      "Save over 75% with annual billing",
      "Early access to new features",
      "Top-tier priority support",
    ],
    cta: "Go Pro Annual",
    href: "https://vanta.lemonsqueezy.com/checkout/buy/a8a8e5f0-3c1a-4d3a-9e2a-6a5a0c5c7d1e",
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-3xl md:text-4xl font-headline font-bold">Choose Your Paid Plan</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select the plan that best fits your job search needs and career goals. No free tiers — all plans unlock full access.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
        {tiers.map((tier) => (
          <Card key={tier.name} className={`flex flex-col shadow-lg relative ${tier.popular ? 'border-primary ring-2 ring-primary' : ''}`}>
            {tier.popular && (
              <div className="absolute top-0 right-4 -mt-3">
                <div className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                  <Star className="h-4 w-4" />
                  Most Popular
                </div>
              </div>
            )}
            <CardHeader>
              <CardTitle className="font-headline">{tier.name}</CardTitle>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-muted-foreground">{tier.period}</span>
              </div>
              <CardDescription className="min-h-[40px]">{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={tier.popular ? 'default' : 'outline'} asChild>
                <Link href={tier.href}>{tier.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
