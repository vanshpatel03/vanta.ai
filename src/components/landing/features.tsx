import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, FileSignature, Linkedin, MessageSquareQuote, CalendarCheck, UserSquare } from "lucide-react";

const features = [
  {
    icon: <FileText className="w-10 h-10 text-primary" />,
    title: "AI Resume Builder",
    description: "Generate a professional, ATS-friendly resume from your LinkedIn profile or experience in minutes.",
  },
  {
    icon: <FileSignature className="w-10 h-10 text-primary" />,
    title: "Cover Letter Generator",
    description: "Create tailored cover letters that highlight your strengths for any job description.",
  },
  {
    icon: <UserSquare className="w-10 h-10 text-primary" />,
    title: "LinkedIn Optimizer",
    description: "Craft a professional headline and bio to make your profile stand out to recruiters.",
  },
  {
    icon: <Linkedin className="w-10 h-10 text-primary" />,
    title: "LinkedIn Outreach Assistant",
    description: "Craft personalized, engaging outreach messages to recruiters and hiring managers.",
  },
   {
    icon: <MessageSquareQuote className="w-10 h-10 text-primary" />,
    title: "AI Interview Prep",
    description: "Get AI-generated interview questions based on the job description and practice your answers.",
  },
  {
    icon: <CalendarCheck className="w-10 h-10 text-primary" />,
    title: "30-Day Career Plan",
    description: "Receive a personalized, day-by-day roadmap to help you achieve your career goals.",
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white dark:bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Your AI-Powered Career Toolkit</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stand out in today's competitive job market.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <CardTitle className="font-headline">{feature.title}</CardTitle>
                <CardDescription className="pt-2">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
