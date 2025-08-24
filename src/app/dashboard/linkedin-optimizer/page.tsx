"use client";

import { useEffect, useRef, useState } from "react";
import { useActionState } from "react";
import { Copy, UserSquare } from "lucide-react";
import { generateLinkedInProfileAction, ActionState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SubmitButton } from "@/components/submit-button";

interface ProfileOutput {
  headline: string;
  bio: string;
}

export default function LinkedInOptimizerPage() {
  const { toast } = useToast();
  const initialState: ActionState = { message: "", output: { headline: "", bio: "" } };
  const [state, formAction] = useActionState(generateLinkedInProfileAction, initialState);
  const [generatedProfile, setGeneratedProfile] = useState<ProfileOutput>({ headline: "", bio: "" });
  
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === "success" && state.output) {
      setGeneratedProfile(state.output);
      toast({
        title: "Success!",
        description: "Your LinkedIn profile has been optimized.",
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

  const handleCopy = (textToCopy: string, fieldName: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({ description: `${fieldName} copied to clipboard.` });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="lg:col-span-3">
        <form action={formAction} ref={formRef}>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <UserSquare />
                LinkedIn Profile Optimizer
            </CardTitle>
            <CardDescription>
              Provide some details and our AI will craft a compelling headline and bio for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="currentRole">Current Role</Label>
                <Input
                  id="currentRole"
                  name="currentRole"
                  placeholder="e.g., Software Engineer"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="field">Field / Industry</Label>
                <Input
                  id="field"
                  name="field"
                  placeholder="e.g., Artificial Intelligence, SaaS"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="keySkills">Key Skills (comma-separated)</Label>
                <Input
                  id="keySkills"
                  name="keySkills"
                  placeholder="e.g., React, Node.js, Python, Machine Learning"
                  required
                />
              </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <SubmitButton buttonText="Optimize Profile" />
          </CardFooter>
        </form>
      </Card>

      <Card className="lg:col-span-4">
        <CardHeader>
          <CardTitle className="font-headline">Optimized Profile</CardTitle>
          <CardDescription>
            Copy and paste these into your LinkedIn profile to make a great first impression.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="generatedHeadline">Generated Headline</Label>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(generatedProfile.headline, 'Headline')} disabled={!generatedProfile.headline}>
                        <Copy className="mr-2 h-4 w-4" /> Copy
                    </Button>
                </div>
                <Textarea
                    id="generatedHeadline"
                    placeholder="Your optimized headline will appear here..."
                    className="min-h-[100px]"
                    value={generatedProfile.headline}
                    onChange={(e) => setGeneratedProfile(p => ({...p, headline: e.target.value}))}
                />
            </div>
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="generatedBio">Generated Bio</Label>
                    <Button variant="ghost" size="sm" onClick={() => handleCopy(generatedProfile.bio, 'Bio')} disabled={!generatedProfile.bio}>
                        <Copy className="mr-2 h-4 w-4" /> Copy
                    </Button>
                </div>
                <Textarea
                    id="generatedBio"
                    placeholder="Your optimized bio will appear here..."
                    className="min-h-[250px]"
                    value={generatedProfile.bio}
                    onChange={(e) => setGeneratedProfile(p => ({...p, bio: e.target.value}))}
                />
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
