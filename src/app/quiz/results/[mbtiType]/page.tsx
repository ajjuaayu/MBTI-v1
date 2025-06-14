
"use client"; // Required for useEffect, useState, localStorage, and useRef

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { MBTIType } from "@/config/site";
import { MBTI_TYPES, MBTI_DESCRIPTIONS, APP_NAME } from "@/config/site";
import PersonaDisplay from "@/components/results/PersonaDisplay";
import CompatibilityDisplay from "@/components/results/CompatibilityDisplay";
import ShareCard, { ShareCardActions } from "@/components/results/ShareCard";
import MBTIBarChart from "@/components/results/MBTIBarChart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageSquareHeart, Home, Repeat, Sparkles, Award, Info } from "lucide-react";
import type { MbtiScores } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
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

      const nameFromUrl = searchParams.get('name');
      if (nameFromUrl) {
        setUserName(decodeURIComponent(nameFromUrl));
        localStorage.setItem('userName', decodeURIComponent(nameFromUrl));
      } else {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
          setUserName(storedName);
        }
      }

      const storedScores = localStorage.getItem('quizScores');
      if (storedScores) {
        try {
          setScores(JSON.parse(storedScores));
        } catch (e) {
          console.error("Failed to parse scores from localStorage", e);
        }
      }
    } else if (mbtiType) {
      router.replace("/404");
    }
    setIsLoading(false);
  }, [mbtiType, router, searchParams]);

  useEffect(() => {
    // Initialize with the full static description if not already set or if mbtiType changes
    if (isValidType && mbtiType && MBTI_DESCRIPTIONS[mbtiType]) {
        if (typeof personaForShareCard === 'undefined' || !personaForShareCard.startsWith(MBTI_DESCRIPTIONS[mbtiType].description.substring(0,10))) {
             setPersonaForShareCard(MBTI_DESCRIPTIONS[mbtiType]?.description);
        }
    }
  }, [isValidType, mbtiType, personaForShareCard]);

  const handleAIPersonaFetched = (description: string) => {
    setPersonaForShareCard(description);
  };


  if (isLoading) {
    return (
      <div className="space-y-8 max-w-4xl mx-auto py-8">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
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
  if (!typeDetails) {
    return (
         <Card className="max-w-lg mx-auto my-10 text-center">
            <CardHeader>
              <CardTitle>Personality Type Details Not Found</CardTitle>
              <CardDescription>We couldn't load the details for {mbtiType}.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/">Go to Homepage</Link>
              </Button>
            </CardContent>
        </Card>
    );
  }
  const greetingName = userName ? `${userName}, ` : "";

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      <header className="text-center">
        <div
          className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary shadow-lg 
                     shadow-primary/40 hover:shadow-primary/60 transition-shadow duration-300
                     [filter:drop-shadow(0_0_8px_hsl(var(--primary)/0.5))] hover:[filter:drop-shadow(0_0_15px_hsl(var(--primary)/0.7))]"
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <linearGradient id="resultsPageMbtiGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{stopColor: "hsl(var(--primary))"}} />
                <stop offset="100%" style={{stopColor: "hsl(var(--accent))"}} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="50" fill="url(#resultsPageMbtiGradient)" />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="hsl(0 0% 98%)"
              fontSize="38"
              fontFamily="var(--font-geist-sans), Helvetica Neue, sans-serif"
              fontWeight="bold"
            >
              {mbtiType}
            </text>
          </svg>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
          {greetingName}You are {mbtiType}!
        </h1>
        <p className="text-2xl text-foreground/80 mt-2">{typeDetails.title}</p>
        <p className="text-lg text-foreground mt-4 max-w-2xl mx-auto">{typeDetails.description}</p>
      </header>

      <section id="share-section" className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4 text-foreground">Your Shareable Card & Link</h2>
        <ShareCard mbtiType={mbtiType} userName={userName ?? undefined} personaDescription={personaForShareCard} ref={shareCardRef} />
        <ShareCardActions cardRef={shareCardRef} mbtiType={mbtiType} userName={userName ?? undefined} />
      </section>

      {scores && <MBTIBarChart scores={scores} />}
      
      <PersonaDisplay mbtiType={mbtiType} onAIPersonaFetched={handleAIPersonaFetched} />

      {typeDetails.topTraits && typeDetails.topTraits.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-3">
            <Sparkles className="h-7 w-7 text-primary" />
            <div>
              <CardTitle className="text-2xl text-foreground">Key Traits of {mbtiType}</CardTitle>
              <CardDescription className="text-foreground/70">Common characteristics associated with your type.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {typeDetails.topTraits.map((trait) => (
              <Badge key={trait} variant="secondary" className="text-base px-3 py-1">
                {trait}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}

      {typeDetails.famousExamples && typeDetails.famousExamples.length > 0 && (
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center gap-3">
            <Award className="h-7 w-7 text-primary" />
            <div>
              <CardTitle className="text-2xl text-foreground">Notable {mbtiType}s</CardTitle>
              <CardDescription className="text-foreground/70">Famous individuals often associated with this personality type.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {typeDetails.famousExamples.map((example) => (
                <li key={example.name} className="flex items-center justify-between p-2 bg-accent/50 rounded-md">
                  <span className="font-medium">{example.name}</span>
                  <span className="text-sm text-muted-foreground">{example.field}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-4 flex items-center">
              <Info className="h-3 w-3 mr-1.5 shrink-0" />
              Personality typing of public figures is speculative and based on observed traits.
            </p>
          </CardContent>
        </Card>
      )}

      <CompatibilityDisplay mbtiType={mbtiType} />

      <Card className="text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">What's Next?</CardTitle>
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

    
