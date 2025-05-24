
"use client"; // Required for useEffect, useState, localStorage, and useRef

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { MBTIType } from "@/config/site";
import { MBTI_TYPES, MBTI_DESCRIPTIONS, APP_NAME } from "@/config/site";
import PersonaDisplay from "@/components/results/PersonaDisplay";
import CompatibilityDisplay from "@/components/results/CompatibilityDisplay";
import ShareCard, { ShareCardActions } from "@/components/results/ShareCard";
import MBTIBarChart from "@/components/results/MBTIBarChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquareHeart, Share, Home, Repeat, User } from "lucide-react";
import type { MbtiScores } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const mbtiType = params.mbtiType as MBTIType;
  
  const [isValidType, setIsValidType] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scores, setScores] = useState<MbtiScores | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [personaForShareCard, setPersonaForShareCard] = useState<string | undefined>(undefined);

  const shareCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mbtiType && MBTI_TYPES.includes(mbtiType)) {
      setIsValidType(true);
      const storedScores = localStorage.getItem('quizScores');
      if (storedScores) {
        try {
          setScores(JSON.parse(storedScores));
        } catch (e) {
          console.error("Failed to parse scores from localStorage", e);
        }
      }
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
      }
    } else if (mbtiType) { 
      router.replace("/404"); 
    }
    setIsLoading(false);
  }, [mbtiType, router]);

  useEffect(() => {
    if (isValidType && typeof personaForShareCard === 'undefined') {
      setPersonaForShareCard(MBTI_DESCRIPTIONS[mbtiType]?.description.split('.')[0] + '.');
    }
  }, [isValidType, mbtiType, personaForShareCard]);


  if (isLoading) {
    return (
      <div className="space-y-8 max-w-4xl mx-auto py-8">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!isValidType) {
    return (
      <Card className="max-w-lg mx-auto my-10 text-center">
        <CardHeader>
          <CardTitle>Invalid Personality Type</CardTitle>
          <CardDescription>The personality type in the URL is not recognized.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const typeDetails = MBTI_DESCRIPTIONS[mbtiType];
  const greetingName = userName ? `${userName}, ` : "";

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <header className="text-center">
        <div className="inline-block p-3 bg-accent rounded-full mb-4 shadow-md">
           <Image 
            src={`https://placehold.co/80x80.png?text=${mbtiType}`}
            alt={`${mbtiType} icon`}
            width={80}
            height={80}
            className="rounded-full"
            data-ai-hint={typeDetails.iconHint}
          />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
          {greetingName}You are {mbtiType}!
        </h1>
        <p className="text-2xl text-muted-foreground mt-2">{typeDetails.title}</p>
        <p className="text-lg text-foreground mt-4 max-w-2xl mx-auto">{typeDetails.description}</p>
      </header>

      <section id="share-section" className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">Your Shareable Card</h2>
        <ShareCard mbtiType={mbtiType} userName={userName ?? undefined} personaDescription={personaForShareCard} ref={shareCardRef} />
        <ShareCardActions cardRef={shareCardRef} />
      </section>

      {scores && <MBTIBarChart scores={scores} />}
      
      <PersonaDisplay mbtiType={mbtiType} />
      <CompatibilityDisplay mbtiType={mbtiType} />

      <Card className="text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">What's Next?</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild variant="outline" size="lg">
            <Link href={`/chat/${mbtiType}`}>
              <MessageSquareHeart className="mr-2 h-5 w-5" /> Chat with Your Type
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" /> Back to Home
            </Link>
          </Button>
           <Button asChild variant="secondary" size="lg">
            <Link href="/quiz/speed">
              <Repeat className="mr-2 h-5 w-5" /> Retake Quiz
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
