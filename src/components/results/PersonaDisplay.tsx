
"use client";

import { useState } from "react";
import type { MBTIType } from "@/config/site";
import { MBTI_DESCRIPTIONS } from "@/config/site";
import { generateAIPersona, type AIPersonaGeneratorOutput } from "@/ai/flows/ai-persona-generator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Wand2, Sparkles, AlertCircle, Loader2 } from "lucide-react";

interface PersonaDisplayProps {
  mbtiType: MBTIType;
}

export default function PersonaDisplay({ mbtiType }: PersonaDisplayProps) {
  const staticPersona = MBTI_DESCRIPTIONS[mbtiType];
  const [aiPersona, setAiPersona] = useState<AIPersonaGeneratorOutput | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [showAIPersona, setShowAIPersona] = useState(false);

  async function fetchAIPersona() {
    if (!mbtiType) return;
    setIsLoadingAI(true);
    setAiError(null);
    setAiPersona(null); // Clear previous AI persona if any
    try {
      const result = await generateAIPersona({ mbtiType });
      setAiPersona(result);
      setShowAIPersona(true);
    } catch (err) {
      console.error("Failed to generate AI persona:", err);
      setAiError("Could not load your AI Persona. Please try again later.");
      setShowAIPersona(false);
    } finally {
      setIsLoadingAI(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center gap-3">
        <Wand2 className="h-7 w-7 text-primary" />
        <div>
          <CardTitle className="text-2xl">Your Persona</CardTitle>
          <CardDescription>Insights into the {mbtiType} ({staticPersona.title}) type.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showAIPersona && staticPersona && (
          <div>
            <h3 className="text-lg font-semibold mb-1">{staticPersona.title}</h3>
            <p className="text-foreground leading-relaxed">{staticPersona.description}</p>
          </div>
        )}

        {showAIPersona && aiPersona && (
           <div>
            <h3 className="text-lg font-semibold mb-1 flex items-center text-primary">
                <Sparkles className="h-5 w-5 mr-2" /> AI-Generated Persona
            </h3>
            <p className="text-foreground leading-relaxed">{aiPersona.personaDescription}</p>
          </div>
        )}

        {isLoadingAI && (
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
          </div>
        )}

        {aiError && (
          <p className="text-destructive flex items-center"><AlertCircle className="h-4 w-4 mr-2" />{aiError}</p>
        )}

        <div className="pt-2">
          <Button onClick={fetchAIPersona} disabled={isLoadingAI} variant="outline">
            {isLoadingAI ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
              </>
            ) : showAIPersona && aiPersona ? (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> Regenerate AI Persona
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> Generate Unique AI Persona
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
