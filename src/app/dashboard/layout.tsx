"use client"

import Link from "next/link"
import {
  FileText,
  FileSignature,
  Linkedin,
  Settings,
  MessageSquareQuote,
  CalendarCheck,
  UserSquare,
} from "lucide-react"
import { usePathname } from 'next/navigation'

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { DashboardHeader } from "@/components/dashboard-header"
import { Logo } from "@/components/logo"

const navItems = [
  { href: "/dashboard/resume-builder", icon: FileText, label: "Resume Builder" },
  { href: "/dashboard/cover-letter-builder", icon: FileSignature, label: "Cover Letter Builder" },
  { href: "/dashboard/linkedin-optimizer", icon: UserSquare, label: "LinkedIn Optimizer" },
  { href: "/dashboard/linkedin-outreach", icon: Linkedin, label: "LinkedIn Outreach" },
  { href: "/dashboard/interview-prep", icon: MessageSquareQuote, label: "Interview Prep" },
  { href: "/dashboard/career-plan", icon: CalendarCheck, label: "Career Plan" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="/dashboard"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Logo />
            <span className="sr-only">Vanta AI</span>
          </Link>
          <TooltipProvider>
            {navItems.map(item => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8",
                      pathname.startsWith(item.href) ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/settings"
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8",
                    pathname.startsWith("/dashboard/settings") ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <DashboardHeader breadcrumb={
          navItems.find(item => pathname.startsWith(item.href))?.label || (pathname.startsWith("/dashboard/settings") ? "Settings" : undefined)
        } />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  )
}
