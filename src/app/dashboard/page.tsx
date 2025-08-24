import Link from 'next/link';
import {
  FileText,
  FileSignature,
  Linkedin,
  MessageSquareQuote,
  CalendarCheck,
  UserSquare,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const featureCards = [
  {
    href: '/dashboard/resume-builder',
    icon: FileText,
    title: 'Resume Builder',
    description: 'Create a professional resume in minutes.',
  },
  {
    href: '/dashboard/cover-letter-builder',
    icon: FileSignature,
    title: 'Cover Letter Builder',
    description: 'Generate tailored cover letters for any job.',
  },
  {
    href: '/dashboard/linkedin-optimizer',
    icon: UserSquare,
    title: 'LinkedIn Optimizer',
    description: 'Optimize your profile to attract recruiters.',
  },
  {
    href: '/dashboard/linkedin-outreach',
    icon: Linkedin,
    title: 'LinkedIn Outreach',
    description: 'Craft perfect messages to hiring managers.',
  },
  {
    href: '/dashboard/interview-prep',
    icon: MessageSquareQuote,
    title: 'Interview Prep',
    description: 'Practice with AI-generated questions.',
  },
  {
    href: '/dashboard/career-plan',
    icon: CalendarCheck,
    title: 'Career Plan',
    description: 'Get a 30-day roadmap to your dream job.',
  },
   {
    href: '/dashboard/community',
    icon: Trophy,
    title: 'Community Leaderboard',
    description: 'See how you rank against other job seekers.',
  },
];

export default function DashboardPage() {
  const userName = "Alex"; // This would be dynamic in a real app

  return (
    <div className="flex flex-col gap-8">
       <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Welcome back, {userName}!</h1>
        <p className="text-muted-foreground">Here are your tools to land your dream job. Let's get started.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {featureCards.map((card) => (
          <Card key={card.href} className="hover:border-primary/80 hover:shadow-lg transition-all flex flex-col group">
            <Link href={card.href} className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">{card.title}</CardTitle>
                <card.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                  <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </div>
              </div>
            </Link>
          </Card>
        ))}
         <Card className="md:col-span-2 lg:col-span-1 xl:col-span-1 bg-primary/10 border-primary/30 flex flex-col items-center justify-center text-center p-6">
            <h3 className="text-lg font-semibold mb-2">Explore More Tools</h3>
            <p className="text-sm text-muted-foreground mb-4">Have an idea for a new feature? Let us know!</p>
            <Button variant="outline">Request a Feature</Button>
        </Card>
      </div>
    </div>
  );
}
