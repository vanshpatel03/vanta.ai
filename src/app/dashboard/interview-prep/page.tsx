"use client";

import { useEffect, useRef, useState } from "react";
import { useActionState } from "react";
import { Lightbulb, MessageSquareQuote } from "lucide-react";
import { generateInterviewQuestionsAction, ActionState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SubmitButton } from "@/components/submit-button";

interface Question {
  question: string;
  suggestion: string;
}

export default function InterviewPrepPage() {
  const { toast } = useToast();
  const initialState: ActionState = { message: "", output: [] };
  const [state, formAction] = useActionState(generateInterviewQuestionsAction, initialState);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === "success" && state.output) {
      setGeneratedQuestions(state.output);
      toast({
        title: "Success!",
        description: "Your interview questions are ready.",
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
                <MessageSquareQuote />
                AI Interview Prep
            </CardTitle>
            <CardDescription>
              Paste a job description and your resume to get tailored questions and personalized advice.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  name="jobDescription"
                  placeholder="Paste the job description here..."
                  className="min-h-[200px]"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="resumeText">Your Resume</Label>
                <Textarea
                  id="resumeText"
                  name="resumeText"
                  placeholder="Paste your resume text here for personalized suggestions..."
                  className="min-h-[200px]"
                  required
                />
              </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <SubmitButton buttonText="Generate Questions" />
          </CardFooter>
        </form>
      </Card>

      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle className="font-headline">Generated Questions</CardTitle>
          <CardDescription>
            Here are some questions you might be asked. Use the personalized suggestions to prepare your answers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {generatedQuestions.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {generatedQuestions.map((q, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{q.question}</AccordionTrigger>
                  <AccordionContent>
                    <Alert>
                      <Lightbulb className="h-4 w-4" />
                      <AlertTitle>Personalized Suggestion</AlertTitle>
                      <AlertDescription>
                        {q.suggestion}
                      </AlertDescription>
                    </Alert>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="flex items-center justify-center h-64 bg-muted/50 rounded-md">
                <p className="text-muted-foreground">Your generated questions will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
