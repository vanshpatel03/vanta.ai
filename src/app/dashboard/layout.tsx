"use client"

import { usePathname } from 'next/navigation'
import { DashboardHeader } from "@/components/dashboard-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const showHeader = pathname !== '/dashboard/pricing'

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {showHeader && <DashboardHeader />}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  )
}
