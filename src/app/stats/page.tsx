
import StatsDisplay from "@/components/stats/StatsDisplay";
import type { Metadata } from 'next';
import { APP_NAME } from "@/config/site";

export const metadata: Metadata = {
  title: "Community Stats",
  description: `Explore personality type distributions and trends within the ${APP_NAME} community.`,
};

export default function StatsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Community Insights
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the fascinating landscape of personality types among our users. See which types are most common and how they compare.
        </p>
      </header>
      <StatsDisplay />
    </div>
  );
}
