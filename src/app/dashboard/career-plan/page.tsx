"use client";

import { useEffect, useRef, useState } from "react";
import { useActionState } from "react";
import { CalendarCheck, Rocket } from "lucide-react";
import { generateCareerPlanAction, ActionState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { SubmitButton } from "@/components/submit-button";

interface DailyPlan {
  day: number;
  task: string;
  details: string;
}

export default function CareerPlanPage() {
  const { toast } = useToast();
  const initialState: ActionState = { message: "", output: [] };
  const [state, formAction] = useActionState(generateCareerPlanAction, initialState);
  const [generatedPlan, setGeneratedPlan] = useState<DailyPlan[]>([]);
  
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === "success" && state.output) {
      setGeneratedPlan(state.output);
      toast({
        title: "Success!",
        description: "Your 30-day career plan is ready.",
      });
      formRef.current?.reset();
    } else if (state.message && state.message !== "success") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="lg:col-span-3">
        <form action={formAction} ref={formRef}>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <CalendarCheck />
                One-Click Career Plan
            </CardTitle>
            <CardDescription>
              Tell us your current role and your goal, and we'll generate a 30-day roadmap to get you there.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="currentRole">Current Role</Label>
                <Input
                  id="currentRole"
                  name="currentRole"
                  placeholder="e.g., Junior Developer"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="careerGoal">Career Goal</Label>
                <Input
                  id="careerGoal"
                  name="careerGoal"
                  placeholder="e.g., Senior Software Engineer at a FAANG company"
                  required
                />
              </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <SubmitButton buttonText="Generate Career Plan" />
          </CardFooter>
        </form>
      </Card>

      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle className="font-headline">Your 30-Day Roadmap</CardTitle>
          <CardDescription>
            Follow these daily tasks to accelerate your journey towards your career goal.
          </CardDescription>
        </CardHeader>
        <CardContent className="max-h-[60vh] overflow-y-auto pr-4">
          {generatedPlan.length > 0 ? (
            <div className="relative pl-6">
                <div className="absolute left-0 top-0 h-full w-px bg-primary/20"></div>
                 {generatedPlan.map((item, index) => (
                    <div key={index} className="relative mb-6">
                        <div className="absolute -left-9 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                           <span className="text-xs font-bold">{item.day}</span>
                        </div>
                        <div className="ml-4">
                            <h4 className="font-semibold">{item.task}</h4>
                            <p className="text-sm text-muted-foreground">{item.details}</p>
                        </div>
                    </div>
                ))}
                 <div className="relative">
                    <div className="absolute -left-9 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white">
                        <Rocket className="h-4 w-4" />
                    </div>
                    <div className="ml-4">
                        <h4 className="font-semibold text-green-500">Goal Achieved!</h4>
                        <p className="text-sm text-muted-foreground">You've completed your 30-day plan. Keep up the momentum!</p>
                    </div>
                </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-muted/50 rounded-md">
                <p className="text-muted-foreground text-center">Your personalized career plan will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
