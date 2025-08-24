
"use client"

import { Activity, ArrowUpRight, DollarSign, Users } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { month: 'January', applications: 18 },
  { month: 'February', applications: 23 },
  { month: 'March', applications: 29 },
  { month: 'April', applications: 25 },
  { month: 'May', applications: 32 },
  { month: 'June', applications: 37 },
];

const chartConfig = {
  applications: {
    label: 'Applications',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function Analytics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">164</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12.4%</div>
          <p className="text-xs text-muted-foreground">+1.2% from last month</p>
        </CardContent>
      </Card>
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle>Application Overview</CardTitle>
          <CardDescription>You applied to 37 jobs this month.</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartContainer config={chartConfig} className="h-[100px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="applications" fill="var(--color-applications)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
