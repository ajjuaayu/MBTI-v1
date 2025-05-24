
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { MbtiScores } from "@/lib/types";
import { getMbtiPercentages } from "@/lib/mbtiCalculator";
import { Scale } from "lucide-react";

interface MBTIBarChartProps {
  scores: MbtiScores;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-2 border border-border rounded shadow-lg">
        <p className="label font-semibold">{`${label} : ${payload[0].value}%`}</p>
        <p className="desc text-xs text-muted-foreground">{`Preference for ${payload[0].payload.name}`}</p>
      </div>
    );
  }
  return null;
};

export default function MBTIBarChart({ scores }: MBTIBarChartProps) {
  const percentages = getMbtiPercentages(scores);

  const dataEI = [
    { name: "Extraversion (E)", value: percentages.E, fill: "hsl(var(--chart-1))" },
    { name: "Introversion (I)", value: percentages.I, fill: "hsl(var(--chart-2))" },
  ];
  const dataSN = [
    { name: "Sensing (S)", value: percentages.S, fill: "hsl(var(--chart-1))" },
    { name: "Intuition (N)", value: percentages.N, fill: "hsl(var(--chart-2))" },
  ];
  const dataTF = [
    { name: "Thinking (T)", value: percentages.T, fill: "hsl(var(--chart-1))" },
    { name: "Feeling (F)", value: percentages.F, fill: "hsl(var(--chart-2))" },
  ];
  const dataJP = [
    { name: "Judging (J)", value: percentages.J, fill: "hsl(var(--chart-1))" },
    { name: "Perceiving (P)", value: percentages.P, fill: "hsl(var(--chart-2))" },
  ];

  const chartData = [
    { title: "Energy: Extraversion vs Introversion", data: dataEI },
    { title: "Information: Sensing vs Intuition", data: dataSN },
    { title: "Decisions: Thinking vs Feeling", data: dataTF },
    { title: "Lifestyle: Judging vs Perceiving", data: dataJP },
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center gap-3">
        <Scale className="h-7 w-7 text-primary" />
        <div>
          <CardTitle className="text-2xl">Your Preference Scores</CardTitle>
          <CardDescription>How your preferences lean on each dichotomy.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
        {chartData.map((chart, index) => (
          <div key={index}>
            <h3 className="text-center font-medium text-muted-foreground mb-2">{chart.title}</h3>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={chart.data} layout="vertical" margin={{ left: 20, right:30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                <YAxis dataKey="name" type="category" width={100} interval={0} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent))'}} />
                <Bar dataKey="value" barSize={25} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

