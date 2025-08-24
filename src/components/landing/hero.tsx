import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold">
              Land Your Dream Job Faster with AI
            </h1>
            <p className="text-lg text-muted-foreground">
              Vanta AI provides a suite of powerful tools to build the perfect resume, craft compelling cover letters, and generate personalized outreach messages.
            </p>
            <div className="flex gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/signup">Get Started for Free</Link>
                </Button>
                 <Button size="lg" variant="outline" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
