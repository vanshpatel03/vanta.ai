"use client";

import { useEffect, useRef, useState } from "react";
import { useActionState } from "react";
import { Copy, Download, FileText, Save } from "lucide-react";
import { generateResumeAction, ActionState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SubmitButton } from "@/components/submit-button";

export default function ResumeBuilderPage() {
  const { toast } = useToast();
  const initialState: ActionState = { message: "", output: "" };
  const [state, formAction] = useActionState(generateResumeAction, initialState);
  const [generatedResume, setGeneratedResume] = useState("");

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === "success" && state.output) {
      setGeneratedResume(state.output);
      toast({
        title: "Success!",
        description: "Your new tailored resume has been generated.",
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

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedResume);
    toast({ description: "Resume copied to clipboard." });
  };
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="lg:col-span-3">
        <form action={formAction} ref={formRef}>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <FileText />
              AI Resume Builder
            </CardTitle>
            <CardDescription>
              Paste your experience and a job description. Our AI will craft a resume tailored specifically for that role.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="workExperience">Your Work Experience</Label>
              <Textarea
                id="workExperience"
                name="workExperience"
                placeholder="Paste your experience or LinkedIn profile text here..."
                className="min-h-[200px]"
                required
              />
            </div>
             <div className="flex flex-col space-y-1.5">
              <Label htmlFor="jobDescription">Target Job Description</Label>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                placeholder="Paste the job description here to tailor your resume..."
                className="min-h-[200px]"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <SubmitButton buttonText="Generate Tailored Resume" />
          </CardFooter>
        </form>
      </Card>

      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle className="font-headline">Generated Resume</CardTitle>
          <CardDescription>
            Your AI-generated resume will appear here. It has been tailored for the job you are applying for.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Your resume..."
            className="min-h-[400px]"
            value={generatedResume}
            onChange={(e) => setGeneratedResume(e.target.value)}
          />
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" onClick={handleCopy} disabled={!generatedResume}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button variant="outline" disabled={!generatedResume}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
          <Button disabled={!generatedResume}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}