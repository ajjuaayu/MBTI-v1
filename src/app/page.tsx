
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Brain, Users, Sparkles } from "lucide-react";
import { APP_NAME, APP_DESCRIPTION } from "@/config/site";
import React from "react";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16">
        <div className="inline-block p-2 bg-accent rounded-lg mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-primary">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20z"></path>
            <path d="M12 12a4 4 0 100-8 4 4 0 000 8z"></path>
            <path d="M12 12a4 4 0 100 8 4 4 0 000-8z" opacity="0.5"></path>
          </svg>
        </div>
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Welcome to {APP_NAME}!
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {APP_DESCRIPTION} Uncover your personality, explore compatibility, and chat with AI personas.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
            <Link href="/quiz/speed">
              SpeedType Quiz <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="shadow-lg hover:shadow-accent/50 transition-shadow">
            <Link href="/quiz/deepdive">
              DeepDive Quiz <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          icon={<Brain className="h-8 w-8 text-primary" />}
          title="Discover Yourself"
          description="Take our insightful quizzes to find your MBTI type and learn what makes you unique."
          aiHint="brain network"
        />
        <FeatureCard
          icon={<Users className="h-8 w-8 text-primary" />}
          title="Connect & Compare"
          description="See how you stack up against friends and the community. Explore compatibility with other types."
          aiHint="people connection"
        />
        <FeatureCard
          icon={<Sparkles className="h-8 w-8 text-primary" />}
          title="AI-Powered Insights"
          description="Get unique AI-generated persona descriptions and chat with an AI version of any MBTI type."
          aiHint="ai future"
        />
      </section>

      <section className="text-center py-12 bg-card rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          It's fast, free, and fun. Let's find out: Which Mind Are You?
        </p>
        <Button asChild size="lg" className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-primary-foreground hover:opacity-90 transition-opacity shadow-lg">
          <Link href="/quiz/speed">
            Start Your First Quiz Now!
          </Link>
        </Button>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactElement; // Expecting a Lucide icon element
  title: string;
  description: string;
  aiHint: string;
}

function FeatureCard({ icon, title, description, aiHint }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4 bg-accent/50 p-4">
        <div className="p-2 bg-background rounded-md">{icon}</div>
        <CardTitle className="text-2xl mt-1">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div 
          className="relative w-full h-40 mb-4 rounded-md overflow-hidden border border-border bg-accent/70 flex items-center justify-center"
          data-ai-hint={aiHint}
          aria-label={description} // For accessibility
        >
          {React.cloneElement(icon, { className: "h-16 w-16 text-primary opacity-60" })}
        </div>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
