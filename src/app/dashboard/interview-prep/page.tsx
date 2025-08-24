"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Lightbulb, Loader2, MessageSquareQuote, Wand2 } from "lucide-react";
import { generateInterviewQuestionsAction, ActionState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Question {
  question: string;
  suggestion: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Questions
        </>
      )}
    </Button>
  );
}

export default function InterviewPrepPage() {
  const { toast } = useToast();
  const initialState: ActionState = { message: "", output: [] };
  const [state, formAction] = useFormState(generateInterviewQuestionsAction, initialState);
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
              Paste a job description to generate tailored interview questions and practice your answers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  name="jobDescription"
                  placeholder="Paste the job description here..."
                  className="min-h-[300px]"
                  required
                />
              </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle className="font-headline">Generated Questions</CardTitle>
          <CardDescription>
            Here are some questions you might be asked. Use the suggestions to prepare your answers.
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
                      <AlertTitle>Suggestion</AlertTitle>
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
