
"use client";

import { useState, useEffect, useRef } from "react";
import type { MBTIType } from "@/config/site";
import { simulateChat } from "@/ai/flows/simulated-chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"; // Removed AvatarImage
import { Send, Bot, User, AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChatMessage } from "@/lib/types";
import { MBTI_DESCRIPTIONS } from "@/config/site";

interface ChatInterfaceProps {
  targetMbtiType: MBTIType;
}

export default function ChatInterface({ targetMbtiType }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const targetTypeDetails = MBTI_DESCRIPTIONS[targetMbtiType];
  const aiAvatarInitials = targetMbtiType.substring(0, 2).toUpperCase();

  useEffect(() => {
    setMessages([
      {
        id: "system-initial",
        sender: "system",
        text: `You are now chatting with an AI emulating ${targetMbtiType} (${targetTypeDetails?.title || ''}). Say hello!`,
        timestamp: Date.now(),
      },
    ]);
  }, [targetMbtiType, targetTypeDetails?.title]);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: input,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await simulateChat({ mbtiType: targetMbtiType, message: input });
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: aiResponse.response,
        mbtiType: targetMbtiType,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error("Error in simulated chat:", err);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: "system",
        text: "Sorry, I couldn't get a response. Please try again.",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setError("Failed to get AI response.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl h-[70vh] flex flex-col">
      <CardHeader className="flex flex-row items-center space-x-4 p-4 border-b">
        <Avatar className="h-10 w-10">
           <div 
            className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold"
            data-ai-hint={targetTypeDetails?.iconHint || "abstract character"}
            aria-label={targetMbtiType}
          >
            {aiAvatarInitials}
          </div>
        </Avatar>
        <div>
          <CardTitle className="text-xl">Chat with {targetMbtiType}</CardTitle>
          <p className="text-sm text-muted-foreground">{targetTypeDetails?.title || "The Unique Thinker"}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-0 overflow-hidden">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <Avatar className="h-8 w-8">
                     <div 
                        className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold"
                        data-ai-hint={targetTypeDetails?.iconHint || "abstract character"}
                        aria-label={targetMbtiType}
                      >
                       {aiAvatarInitials}
                     </div>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] rounded-xl px-4 py-2 shadow ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : msg.sender === "ai"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground text-xs italic text-center w-full" 
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
                {msg.sender === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-center gap-2">
                <Avatar className="h-8 w-8">
                  <div 
                    className="flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold"
                  >
                    {aiAvatarInitials}
                  </div>
                </Avatar>
                <div className="bg-accent text-accent-foreground rounded-xl px-4 py-2 shadow">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder={`Message ${targetMbtiType}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
            disabled={isLoading}
            aria-label="Chat message input"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()} aria-label="Send message">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </CardFooter>
       {error && (
          <div className="p-2 text-xs text-destructive-foreground bg-destructive text-center">
            <AlertCircle className="inline h-3 w-3 mr-1" />{error}
          </div>
        )}
    </Card>
  );
}
