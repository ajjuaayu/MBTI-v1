
import { MBTI_TYPES } from "@/config/site";
import ChatInterface from "@/components/chat/ChatInterface";
import { redirect } from "next/navigation";
import type { Metadata } from 'next'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ChatPageParams {
  params: {
    mbtiType: string;
  };
}

export async function generateMetadata({ params }: ChatPageParams): Promise<Metadata> {
  const mbtiType = params.mbtiType.toUpperCase();
  if (MBTI_TYPES.includes(mbtiType as any)) {
    return {
      title: `Chat with ${mbtiType}`,
      description: `Simulate a conversation with an AI representing the ${mbtiType} personality type.`,
    }
  }
  return {
    title: "Chat Invalid Type",
    description: "The personality type for chat is invalid.",
  }
}

export default function ChatPage({ params }: ChatPageParams) {
  const mbtiType = params.mbtiType.toUpperCase();

  if (!MBTI_TYPES.includes(mbtiType as any)) {
    // redirect("/404"); // Or a more user-friendly error page
    return (
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader className="text-center">
          <CardTitle>Invalid Personality Type for Chat</CardTitle>
          <CardDescription>The personality type '{mbtiType}' is not recognized. Please select a valid type to chat with.</CardDescription>
            <Button asChild className="mt-4">
                <Link href="/">Go to Homepage</Link>
            </Button>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <ChatInterface targetMbtiType={mbtiType as any} />
    </div>
  );
}
