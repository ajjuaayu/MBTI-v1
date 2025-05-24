
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
];

export const MBTI_TYPES = [
  "ISTJ", "ISFJ", "INFJ", "INTJ",
  "ISTP", "ISFP", "INFP", "INTP",
  "ESTP", "ESFP", "ENFP", "ENTP",
  "ESTJ", "ESFJ", "ENFJ", "ENTJ",
] as const;

export type MBTIType = typeof MBTI_TYPES[number];

interface MbtiTypeDetails {
  title: string;
  description: string;
  iconHint: string;
  topTraits: string[];
  famousExamples: { name: string; field: string }[];
}

export const MBTI_DESCRIPTIONS: Record<MBTIType, MbtiTypeDetails> = {
  ISTJ: {
    title: "The Inspector",
    description: "Practical and fact-minded individuals, whose reliability cannot be doubted.",
    iconHint: "magnifying glass detective",
    topTraits: ["Responsible", "Organized", "Dependable", "Logical", "Methodical"],
    famousExamples: [
      { name: "George Washington", field: "U.S. President" },
      { name: "Angela Merkel", field: "Former Chancellor of Germany" },
      { name: "Natalie Portman", field: "Actress" },
    ],
  },
  ISFJ: {
    title: "The Protector",
    description: "Very dedicated and warm protectors, always ready to defend their loved ones.",
    iconHint: "shield knight",
    topTraits: ["Supportive", "Reliable", "Patient", "Loyal", "Caring"],
    famousExamples: [
      { name: "Mother Teresa", field: "Humanitarian" },
      { name: "Beyoncé", field: "Musician" },
      { name: "Kate Middleton", field: "Duchess of Cambridge" },
    ],
  },
  INFJ: {
    title: "The Advocate",
    description: "Quiet and mystical, yet very inspiring and tireless idealists.",
    iconHint: "helping hand community",
    topTraits: ["Insightful", "Idealistic", "Principled", "Empathetic", "Creative"],
    famousExamples: [
      { name: "Martin Luther King Jr.", field: "Civil Rights Leader" },
      { name: "Nelson Mandela", field: "Former President of South Africa" },
      { name: "Taylor Swift", field: "Musician" },
    ],
  },
  INTJ: {
    title: "The Architect",
    description: "Imaginative and strategic thinkers, with a plan for everything.",
    iconHint: "blueprint building",
    topTraits: ["Strategic", "Independent", "Analytical", "Innovative", "Determined"],
    famousExamples: [
      { name: "Elon Musk", field: "Entrepreneur" },
      { name: "Michelle Obama", field: "Former First Lady" },
      { name: "Arnold Schwarzenegger", field: "Actor & Politician" },
    ],
  },
  ISTP: {
    title: "The Virtuoso",
    description: "Bold and practical experimenters, masters of all kinds of tools.",
    iconHint: "tools gears",
    topTraits: ["Resourceful", "Independent", "Adaptable", "Action-oriented", "Curious"],
    famousExamples: [
      { name: "Clint Eastwood", field: "Actor & Director" },
      { name: "Tom Cruise", field: "Actor" },
      { name: "Bear Grylls", field: "Adventurer" },
    ],
  },
  ISFP: {
    title: "The Adventurer",
    description: "Flexible and charming artists, always ready to explore and experience something new.",
    iconHint: "palette brush",
    topTraits: ["Artistic", "Charming", "Curious", "Adaptable", "Sensitive"],
    famousExamples: [
      { name: "Michael Jackson", field: "Musician" },
      { name: "Frida Kahlo", field: "Artist" },
      { name: "Lana Del Rey", field: "Musician" },
    ],
  },
  INFP: {
    title: "The Mediator",
    description: "Poetic, kind and altruistic people, always eager to help a good cause.",
    iconHint: "dove peace",
    topTraits: ["Idealistic", "Empathetic", "Creative", "Values-driven", "Harmonious"],
    famousExamples: [
      { name: "William Shakespeare", field: "Playwright" },
      { name: "J.R.R. Tolkien", field: "Author" },
      { name: "Johnny Depp", field: "Actor" },
    ],
  },
  INTP: {
    title: "The Logician",
    description: "Inventive and curious thinkers who have an unquenchable thirst for knowledge.",
    iconHint: "atom science",
    topTraits: ["Analytical", "Inventive", "Logical", "Independent", "Skeptical"],
    famousExamples: [
      { name: "Albert Einstein", field: "Physicist" },
      { name: "Bill Gates", field: "Entrepreneur" },
      { name: "Kristen Stewart", field: "Actress" },
    ],
  },
  ESTP: {
    title: "The Entrepreneur",
    description: "Smart, energetic and very perceptive people, who truly enjoy living on the edge.",
    iconHint: "rocket launch",
    topTraits: ["Energetic", "Perceptive", "Action-oriented", "Resourceful", "Bold"],
    famousExamples: [
      { name: "Donald Trump", field: "Businessman & Former U.S. President" },
      { name: "Madonna", field: "Musician" },
      { name: "Eddie Murphy", field: "Comedian & Actor" },
    ],
  },
  ESFP: {
    title: "The Entertainer",
    description: "Spontaneous, energetic and enthusiastic people – life is never boring around them.",
    iconHint: "spotlight stage",
    topTraits: ["Enthusiastic", "Sociable", "Spontaneous", "Fun-loving", "Generous"],
    famousExamples: [
      { name: "Marilyn Monroe", field: "Actress" },
      { name: "Adele", field: "Musician" },
      { name: "Will Smith", field: "Actor" },
    ],
  },
  ENFP: {
    title: "The Campaigner",
    description: "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.",
    iconHint: "party confetti",
    topTraits: ["Imaginative", "Enthusiastic", "Sociable", "Curious", "Independent"],
    famousExamples: [
      { name: "Robin Williams", field: "Comedian & Actor" },
      { name: "Robert Downey Jr.", field: "Actor" },
      { name: "Ellen DeGeneres", field: "Comedian & TV Host" },
    ],
  },
  ENTP: {
    title: "The Debater",
    description: "Smart and curious thinkers who cannot resist an intellectual challenge.",
    iconHint: "speech bubble debate",
    topTraits: ["Innovative", "Quick-witted", "Resourceful", "Knowledgeable", "Challenging"],
    famousExamples: [
      { name: "Steve Wozniak", field: "Co-founder of Apple" },
      { name: "Sacha Baron Cohen", field: "Comedian" },
      { name: "Thomas Edison", field: "Inventor" },
    ],
  },
  ESTJ: {
    title: "The Executive",
    description: "Excellent administrators, unsurpassed at managing things – or people.",
    iconHint: "briefcase office",
    topTraits: ["Organized", "Efficient", "Decisive", "Direct", "Logical"],
    famousExamples: [
      { name: "Michelle Obama", field: "Former First Lady" }, // Note: Also listed as INTJ by some sources, showing subjectivity.
      { name: "Judge Judy", field: "TV Personality" },
      { name: "Emma Watson", field: "Actress" },
    ],
  },
  ESFJ: {
    title: "The Consul",
    description: "Extraordinarily caring, social and popular people, always eager to help.",
    iconHint: "handshake group",
    topTraits: ["Sociable", "Caring", "Organized", "Supportive", "Conscientious"],
    famousExamples: [
      { name: "Jennifer Lopez", field: "Musician & Actress" },
      { name: "Joe Biden", field: "U.S. President" },
      { name: "Anne Hathaway", field: "Actress" },
    ],
  },
  ENFJ: {
    title: "The Protagonist",
    description: "Charismatic and inspiring leaders, able to mesmerize their listeners.",
    iconHint: "leader podium",
    topTraits: ["Charismatic", "Inspiring", "Empathetic", "Diplomatic", "Sociable"],
    famousExamples: [
      { name: "Barack Obama", field: "Former U.S. President" },
      { name: "Oprah Winfrey", field: "TV Host & Entrepreneur" },
      { name: "Jennifer Lawrence", field: "Actress" },
    ],
  },
  ENTJ: {
    title: "The Commander",
    description: "Bold, imaginative and strong-willed leaders, always finding a way – or making one.",
    iconHint: "chess king strategy",
    topTraits: ["Decisive", "Strategic", "Confident", "Visionary", "Efficient"],
    famousExamples: [
      { name: "Steve Jobs", field: "Co-founder of Apple" },
      { name: "Margaret Thatcher", field: "Former UK Prime Minister" },
      { name: "George Clooney", field: "Actor & Director" },
    ],
  },
};

    