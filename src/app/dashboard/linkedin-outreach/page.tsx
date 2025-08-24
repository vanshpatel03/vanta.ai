"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Copy, Linkedin, Loader2, Save, Wand2 } from "lucide-react";
import { generateLinkedInOutreachAction, ActionState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Message
        </>
      )}
    </Button>
  );
}

export default function LinkedInOutreachPage() {
  const { toast } = useToast();
  const initialState: ActionState = { message: "", output: "" };
  const [state, formAction] = useFormState(generateLinkedInOutreachAction, initialState);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === "success" && state.output) {
      setGeneratedMessage(state.output);
      toast({
        title: "Success!",
        description: "Your outreach message has been generated.",
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
    navigator.clipboard.writeText(generatedMessage);
    toast({ description: "Message copied to clipboard." });
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <form action={formAction} ref={formRef}>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Linkedin />
              AI LinkedIn Chat Assistant
            </CardTitle>
            <CardDescription>
              Enter the details below and our AI will rewrite your DM to recruiters.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recruiterName">Recruiter Name</Label>
              <Input id="recruiterName" name="recruiterName" placeholder="e.g., Jane Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetCompany">Target Company</Label>
              <Input id="targetCompany" name="targetCompany" placeholder="e.g., Acme Inc." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" name="role" placeholder="e.g., Senior Product Manager" required />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Generated Message</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[250px] bg-muted/50 rounded-md p-4 whitespace-pre-wrap">
          <p className="text-sm">
            {generatedMessage || "Your personalized message will appear here..."}
          </p>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline" onClick={handleCopy} disabled={!generatedMessage}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
           <Button variant="outline" disabled={!generatedMessage}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
