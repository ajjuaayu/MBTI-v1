
"use client";

import { useState, useEffect } from "react";
import type { MBTIType } from "@/config/site";
import { generateAIPersona, type AIPersonaGeneratorOutput } from "@/ai/flows/ai-persona-generator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Wand2 } from "lucide-react";

interface PersonaDisplayProps {
  mbtiType: MBTIType;
}

export default function PersonaDisplay({ mbtiType }: PersonaDisplayProps) {
  const [persona, setPersona] = useState<AIPersonaGeneratorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPersona() {
      if (!mbtiType) return;
      setIsLoading(true);
      setError(null);
      try {
        const result = await generateAIPersona({ mbtiType });
        setPersona(result);
      } catch (err) {
        console.error("Failed to generate AI persona:", err);
        setError("Could not load your AI Persona. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchPersona();
  }, [mbtiType]);

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center gap-3">
        <Wand2 className="h-7 w-7 text-primary" />
        <div>
          <CardTitle className="text-2xl">Your AI Persona</CardTitle>
          <CardDescription>A unique interpretation of your type.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        )}
        {error && <p className="text-destructive">{error}</p>}
        {persona && !isLoading && !error && (
          <p className="text-foreground leading-relaxed">{persona.personaDescription}</p>
        )}
      </CardContent>
    </Card>
  );
}
