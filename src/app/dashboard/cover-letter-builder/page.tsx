"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Copy, Download, FileSignature, Loader2, Save, Wand2 } from "lucide-react";
import { generateCoverLetterAction, ActionState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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
          Generate Cover Letter
        </>
      )}
    </Button>
  );
}

export default function CoverLetterBuilderPage() {
  const { toast } = useToast();
  const initialState: ActionState = { message: "", output: "" };
  const [state, formAction] = useFormState(generateCoverLetterAction, initialState);
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState("");
  
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === "success" && state.output) {
      setGeneratedCoverLetter(state.output);
      toast({
        title: "Success!",
        description: "Your new cover letter has been generated.",
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
    navigator.clipboard.writeText(generatedCoverLetter);
    toast({ description: "Cover letter copied to clipboard." });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="lg:col-span-3">
        <form action={formAction} ref={formRef}>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <FileSignature />
                AI Cover Letter Builder
            </CardTitle>
            <CardDescription>
              Paste your resume and the job description to get a custom-tailored cover letter.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex flex-col space-y-1.5">
                <Label htmlFor="resumeText">Your Resume</Label>
                <Textarea
                  id="resumeText"
                  name="resumeText"
                  placeholder="Paste your resume text here..."
                  className="min-h-[200px]"
                  required
                />
              </div>
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
          </CardContent>
          <CardFooter className="flex justify-end">
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle className="font-headline">Generated Cover Letter</CardTitle>
          <CardDescription>
            Your AI-generated cover letter will appear here. You can edit it before saving or exporting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Your cover letter..."
            className="min-h-[500px]"
            value={generatedCoverLetter}
            onChange={(e) => setGeneratedCoverLetter(e.target.value)}
          />
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" onClick={handleCopy} disabled={!generatedCoverLetter}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button variant="outline" disabled={!generatedCoverLetter}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
          <Button disabled={!generatedCoverLetter}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
