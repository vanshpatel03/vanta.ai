import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "/ month",
    description: "Get started with the essentials to boost your job search.",
    features: [
      "1 AI Resume build",
      "1 AI Cover Letter",
      "3 LinkedIn outreach messages",
      "Access to all AI tools (basic)",
    ],
    cta: "Start for Free",
    href: "/signup",
  },
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
    cta: "Go Premium",
    href: "/signup",
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
    cta: "Go Pro",
    href: "/signup",
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
    href: "/signup",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-white dark:bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Find the Perfect Plan</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that best fits your job search needs and career goals.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-stretch">
          {tiers.map((tier) => (
            <Card key={tier.name} className={`flex flex-col shadow-lg ${tier.popular ? 'border-primary ring-2 ring-primary' : ''}`}>
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
    </section>
  );
}
