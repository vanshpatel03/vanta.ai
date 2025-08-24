import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah J.",
    title: "Software Engineer",
    quote: "Vanta AI's resume builder helped me get past the screening filters and land my dream job at a FAANG company. Cannot recommend it enough!",
    avatar: "https://placehold.co/100x100.png",
  },
  {
    name: "Michael B.",
    title: "Product Manager",
    quote: "The cover letter generator is a lifesaver. I used to spend hours writing them, now it takes me minutes to create something truly compelling.",
    avatar: "https://placehold.co/100x100.png",
  },
  {
    name: "Emily C.",
    title: "UX Designer",
    quote: "The LinkedIn outreach messages are fantastic. They sound professional yet personal, and my response rate has skyrocketed.",
    avatar: "https://placehold.co/100x100.png",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Loved by Job Seekers Worldwide</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear what our users have to say about their success with Vanta AI.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col justify-between shadow-lg">
              <CardContent className="pt-6">
                <p className="italic">"{testimonial.quote}"</p>
              </CardContent>
              <div className="p-6 pt-0 flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person" />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
