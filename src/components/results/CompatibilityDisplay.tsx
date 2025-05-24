
"use client";

import { useState } from "react";
import type { MBTIType } from "@/config/site";
import { aiCompatibility, type AICompatibilityOutput } from "@/ai/flows/ai-compatibility";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Users, Swords, Handshake, Brain, AlertCircle } from "lucide-react";

interface CompatibilityDisplayProps {
  mbtiType: MBTIType;
}

export default function CompatibilityDisplay({ mbtiType }: CompatibilityDisplayProps) {
  const [aiCompatibilityData, setAiCompatibilityData] = useState<AICompatibilityOutput | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [showAICompatibility, setShowAICompatibility] = useState(false);

  async function fetchAICompatibility() {
    if (!mbtiType) return;
    setIsLoadingAI(true);
    setAiError(null);
    setAiCompatibilityData(null); // Clear previous data
    try {
      const result = await aiCompatibility({ mbtiType });
      setAiCompatibilityData(result);
      setShowAICompatibility(true);
    } catch (err) {
      console.error("Failed to fetch AI compatibility:", err);
      setAiError("Could not load AI compatibility insights. Please try again later.");
      setShowAICompatibility(false);
    } finally {
      setIsLoadingAI(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center gap-3">
        <Users className="h-7 w-7 text-primary" />
        <div>
          <CardTitle className="text-2xl">Compatibility Insights</CardTitle>
          <CardDescription>Discover how {mbtiType} interacts with other types.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {!showAICompatibility && (
            <p className="text-muted-foreground">
                Unlock AI-powered insights to see which personality types might be your best friends or friendly rivals, based on common compatibility theories.
            </p>
        )}

        {isLoadingAI && (
          <>
            <div>
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div>
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </>
        )}
        
        {aiError && !isLoadingAI && (
            <p className="text-destructive flex items-center"><AlertCircle className="h-4 w-4 mr-2" />{aiError}</p>
        )}

        {showAICompatibility && aiCompatibilityData && !isLoadingAI && !aiError && (
          <>
            <div>
              <h3 className="text-lg font-semibold flex items-center mb-1 text-green-600">
                <Handshake className="h-5 w-5 mr-2" />
                Most Compatible (AI Suggested)
              </h3>
              <p className="text-foreground leading-relaxed">{aiCompatibilityData.mostCompatible}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold flex items-center mb-1 text-red-600">
                <Swords className="h-5 w-5 mr-2" />
                Least Compatible (AI Suggested Rivals)
              </h3>
              <p className="text-foreground leading-relaxed">{aiCompatibilityData.leastCompatible}</p>
            </div>
          </>
        )}
         <div className="pt-2">
          <Button onClick={fetchAICompatibility} disabled={isLoadingAI} variant="outline">
            {isLoadingAI ? (
              <>
                <Brain className="mr-2 h-4 w-4 animate-pulse" /> Analyzing...
              </>
            ) : showAICompatibility && aiCompatibilityData ? (
              <>
                <Brain className="mr-2 h-4 w-4" /> Refresh AI Compatibility
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" /> Show AI Compatibility Analysis
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
