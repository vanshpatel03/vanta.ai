"use client";

import { useEffect, useRef, useState, useActionState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizonal, Sparkles, User } from "lucide-react";
import { ActionState, generateMentorChatAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function AiMentorPage() {
  const { toast } = useToast();
  const initialState: ActionState = { message: "" };
  const [state, formAction] = useActionState(generateMentorChatAction, initialState);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsPending(false);
    if (state.message === "success" && state.output) {
      setChatHistory(prev => [...prev, { role: 'model', content: state.output }]);
      formRef.current?.reset();
      setUserMessage("");
    } else if (state.message && state.message !== "success") {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector('div');
        if(scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
    }
  }, [chatHistory]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userMessage.trim()) return;

    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsPending(true);
    
    const formData = new FormData(event.currentTarget);
    formData.set('chatHistory', JSON.stringify(chatHistory));
    formAction(formData);
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-4rem)]">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Sparkles />
          1-on-1 AI Mentor
        </CardTitle>
        <CardDescription>
          Ask your AI career mentor anything. Get personalized advice on resumes, interviews, career strategy, and more.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {chatHistory.map((message, index) => (
              <div key={index} className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                {message.role === 'model' && (
                  <Avatar className="w-8 h-8 border-2 border-primary">
                    <AvatarFallback><Sparkles className="w-4 h-4" /></AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-xl p-4 rounded-xl ${message.role === 'model' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isPending && (
                <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border-2 border-primary">
                        <AvatarFallback><Sparkles className="w-4 h-4 animate-pulse" /></AvatarFallback>
                    </Avatar>
                    <div className="max-w-xl p-4 rounded-xl bg-muted">
                        <p>Thinking...</p>
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="pt-6">
        <form ref={formRef} onSubmit={handleSubmit} className="flex w-full items-center gap-2">
          <Input
            name="userMessage"
            placeholder="Ask your mentor a question..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            disabled={isPending}
            autoComplete="off"
          />
          <Button type="submit" size="icon" disabled={isPending || !userMessage.trim()}>
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
