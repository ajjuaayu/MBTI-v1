
"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp } from "lucide-react";
import { MBTI_TYPES, MBTI_DESCRIPTIONS } from "@/config/site";
import type { MBTIType } from "@/config/site";

// Placeholder data - in a real app, this would come from a database/API
const generatePlaceholderStats = () => {
  const stats = MBTI_TYPES.map(type => ({
    name: type,
    users: Math.floor(Math.random() * 500) + 50, // Random user count between 50 and 550
  }));
  return stats.sort((a, b) => b.users - a.users); // Sort by most users
};

const COLORS = [
  'hsl(var(--chart-1))', 
  'hsl(var(--chart-2))', 
  'hsl(var(--chart-3))', 
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--primary))', // Using theme colors
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
];


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, users }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent * 100 < 5) return null; // Don't render label for very small slices

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-medium">
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};


export default function StatsDisplay() {
  const [statsData, setStatsData] = useState<Array<{name: MBTIType, users: number}>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setIsLoading(true);
    setTimeout(() => {
      setStatsData(generatePlaceholderStats());
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader><CardTitle>Loading Stats...</CardTitle></CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
             <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
          </CardContent>
        </Card>
         <Card className="shadow-lg">
          <CardHeader><CardTitle>Loading Distribution...</CardTitle></CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center">
             <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
          </CardContent>
        </Card>
      </div>
    );
  }

  const top5Data = statsData.slice(0, 8); // Show top 8 for Pie chart for better visibility

  return (
    <div className="space-y-8">
      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="bg-accent/30">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-7 w-7 text-primary" />
            <div>
              <CardTitle className="text-2xl">Community Personality Distribution</CardTitle>
              <CardDescription>Overview of personality types among our users.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold mb-2 text-center text-muted-foreground">User Count by Type</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={statsData} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={70} />
                <YAxis />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}} 
                  formatter={(value, name, props) => [`${value} users`, MBTI_DESCRIPTIONS[props.payload.name as MBTIType]?.title || props.payload.name]}
                />
                <Legend formatter={(value, entry) => MBTI_DESCRIPTIONS[entry.payload?.name as MBTIType]?.title || value } />
                <Bar dataKey="users" name="Users" radius={[4, 4, 0, 0]}>
                    {statsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-2 text-center text-muted-foreground">Top Types Distribution</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={top5Data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  fill="hsl(var(--chart-1))"
                  dataKey="users"
                  nameKey="name"
                >
                  {top5Data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}}
                  formatter={(value, name, props) => [`${value} users (${( (value as number / top5Data.reduce((sum, item) => sum + item.users, 0)) * 100).toFixed(1)}%)`, MBTI_DESCRIPTIONS[props.payload.name as MBTIType]?.title || props.payload.name]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardHeader className="bg-accent/30">
          <div className="flex items-center gap-3">
            <Users className="h-7 w-7 text-primary" />
            <div>
              <CardTitle className="text-2xl">All Types Breakdown</CardTitle>
              <CardDescription>Detailed user counts for each personality type.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {statsData.map(typeStat => (
              <li key={typeStat.name} className="p-4 border rounded-lg bg-background shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg font-semibold text-primary">{typeStat.name}</p>
                        <p className="text-xs text-muted-foreground">{MBTI_DESCRIPTIONS[typeStat.name]?.title}</p>
                    </div>
                    <p className="text-2xl font-bold">{typeStat.users}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
