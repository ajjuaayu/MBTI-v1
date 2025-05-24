
import type { LucideIcon } from "lucide-react";
import { Home, ListChecks, Users, BarChart3, MessageSquareHeart, BrainCircuit } from "lucide-react";

export const APP_NAME = "TypeCast";
export const APP_DESCRIPTION = "Discover your MBTI type with a flair! Fun quizzes, AI insights, and community stats.";

export interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
}

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "SpeedType Quiz",
    href: "/quiz/speed",
    icon: ListChecks,
  },
  {
    title: "DeepDive Quiz",
    href: "/quiz/deepdive",
    icon: BrainCircuit,
  },
  {
    title: "Community Stats",
    href: "/stats",
    icon: BarChart3,
  },
  // Example for a section that might be added later or for result-specific navigation
  // {
  //   title: "My Results",
  //   href: "/results", // This would need a dynamic part or a summary page
  //   icon: UserCheck, 
  // },
];

export const MBTI_TYPES = [
  "ISTJ", "ISFJ", "INFJ", "INTJ",
  "ISTP", "ISFP", "INFP", "INTP",
  "ESTP", "ESFP", "ENFP", "ENTP",
  "ESTJ", "ESFJ", "ENFJ", "ENTJ",
] as const;

export type MBTIType = typeof MBTI_TYPES[number];

export const MBTI_DESCRIPTIONS: Record<MBTIType, { title: string; description: string, iconHint: string }> = {
  ISTJ: { title: "The Inspector", description: "Practical and fact-minded individuals, whose reliability cannot be doubted.", iconHint: "magnifying glass detective" },
  ISFJ: { title: "The Protector", description: "Very dedicated and warm protectors, always ready to defend their loved ones.", iconHint: "shield knight" },
  INFJ: { title: "The Advocate", description: "Quiet and mystical, yet very inspiring and tireless idealists.", iconHint: "helping hand community" },
  INTJ: { title: "The Architect", description: "Imaginative and strategic thinkers, with a plan for everything.", iconHint: "blueprint building" },
  ISTP: { title: "The Virtuoso", description: "Bold and practical experimenters, masters of all kinds of tools.", iconHint: "tools gears" },
  ISFP: { title: "The Adventurer", description: "Flexible and charming artists, always ready to explore and experience something new.", iconHint: "palette brush" },
  INFP: { title: "The Mediator", description: "Poetic, kind and altruistic people, always eager to help a good cause.", iconHint: "dove peace" },
  INTP: { title: "The Logician", description: "Inventive and curious thinkers who have an unquenchable thirst for knowledge.", iconHint: "atom science" },
  ESTP: { title: "The Entrepreneur", description: "Smart, energetic and very perceptive people, who truly enjoy living on the edge.", iconHint: "rocket launch" },
  ESFP: { title: "The Entertainer", description: "Spontaneous, energetic and enthusiastic people – life is never boring around them.", iconHint: "spotlight stage" },
  ENFP: { title: "The Campaigner", description: "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.", iconHint: "party confetti" },
  ENTP: { title: "The Debater", description: "Smart and curious thinkers who cannot resist an intellectual challenge.", iconHint: "speech bubble debate" },
  ESTJ: { title: "The Executive", description: "Excellent administrators, unsurpassed at managing things – or people.", iconHint: "briefcase office" },
  ESFJ: { title: "The Consul", description: "Extraordinarily caring, social and popular people, always eager to help.", iconHint: "handshake group" },
  ENFJ: { title: "The Protagonist", description: "Charismatic and inspiring leaders, able to mesmerize their listeners.", iconHint: "leader podium" },
  ENTJ: { title: "The Commander", description: "Bold, imaginative and strong-willed leaders, always finding a way – or making one.", iconHint: "chess king strategy" },
};
