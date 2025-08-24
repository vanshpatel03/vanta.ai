import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-1 gap-12 items-center text-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold">
              Land Your Dream Job Faster with AI
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Vanta AI provides a suite of powerful tools to build the perfect resume, craft compelling cover letters, and generate personalized outreach messages.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
