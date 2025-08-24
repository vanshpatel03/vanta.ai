import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold">
              Land Your Dream Job Faster with AI
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
              Vanta AI provides a suite of powerful tools to build the perfect resume, craft compelling cover letters, and generate personalized outreach messages.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
                <Button size="lg" asChild>
                  <Link href="/signup">Get Started for Free</Link>
                </Button>
                 <Button size="lg" variant="outline" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
            </div>
          </div>
          <div>
            <Image 
                src="https://placehold.co/600x400.png"
                width={600}
                height={400}
                alt="Vanta AI Dashboard Screenshot"
                className="rounded-lg shadow-2xl"
                data-ai-hint="app dashboard"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
