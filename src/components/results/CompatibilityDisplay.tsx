
"use client";

import { useState, useEffect } from "react";
import type { MBTIType } from "@/config/site";
import { aiCompatibility, type AICompatibilityOutput } from "@/ai/flows/ai-compatibility";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Swords, Handshake } from "lucide-react";

interface CompatibilityDisplayProps {
  mbtiType: MBTIType;
}

export default function CompatibilityDisplay({ mbtiType }: CompatibilityDisplayProps) {
  const [compatibility, setCompatibility] = useState<AICompatibilityOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCompatibility() {
      if (!mbtiType) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await aiCompatibility({ mbtiType });
        setCompatibility(result);
      } catch (err) {
        console.error("Failed to fetch AI compatibility:", err);
        setError("Could not load compatibility insights. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCompatibility();
  }, [mbtiType]);

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center gap-3">
        <Users className="h-7 w-7 text-primary" />
        <div>
          <CardTitle className="text-2xl">AI Compatibility Insights</CardTitle>
          <CardDescription>Discover your ideal friends and rivals.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading && (
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
        {error && <p className="text-destructive">{error}</p>}
        {compatibility && !isLoading && !error && (
          <>
            <div>
              <h3 className="text-lg font-semibold flex items-center mb-1 text-green-600">
                <Handshake className="h-5 w-5 mr-2" />
                Most Compatible
              </h3>
              <p className="text-foreground leading-relaxed">{compatibility.mostCompatible}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold flex items-center mb-1 text-red-600">
                <Swords className="h-5 w-5 mr-2" />
                Least Compatible (Rivals)
              </h3>
              <p className="text-foreground leading-relaxed">{compatibility.leastCompatible}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
