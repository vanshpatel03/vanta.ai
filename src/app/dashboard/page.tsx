import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  FileText,
  FileSignature,
  Linkedin,
  MessageSquareQuote,
  CalendarCheck,
  UserSquare,
  Trophy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Analytics } from '@/components/analytics';

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
  return (
    <div className="flex flex-col gap-4">
      <Analytics />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {featureCards.map((card) => (
          <Card key={card.href} className="hover:border-primary/80 hover:shadow-md transition-all">
            <Link href={card.href} className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
