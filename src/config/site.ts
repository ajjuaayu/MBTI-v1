
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
  shareCardGradient: string;
}

export const MBTI_DESCRIPTIONS: Record<MBTIType, MbtiTypeDetails> = {
  ISTJ: {
    title: "The Inspector",
    description: "Practical and fact-minded individuals, whose reliability cannot be doubted. They are orderly, rule-abiding, and appreciate traditions. ISTJs are thorough and responsible, often taking on duties with a serious and dedicated approach. They prefer to work alone or in small, focused groups and value accuracy and efficiency.",
    iconHint: "magnifying glass detective",
    topTraits: ["Responsible", "Organized", "Dependable", "Logical", "Methodical"],
    famousExamples: [
      { name: "George Washington", field: "U.S. President" },
      { name: "Angela Merkel", field: "Former Chancellor of Germany" },
      { name: "Natalie Portman", field: "Actress" },
    ],
    shareCardGradient: "bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700",
  },
  ISFJ: {
    title: "The Protector",
    description: "Very dedicated and warm protectors, always ready to defend their loved ones. ISFJs are conscientious, considerate, and committed to their responsibilities. They have a strong sense of duty and are often found in roles where they can care for others. They value harmony and are deeply loyal.",
    iconHint: "shield knight",
    topTraits: ["Supportive", "Reliable", "Patient", "Loyal", "Caring"],
    famousExamples: [
      { name: "Mother Teresa", field: "Humanitarian" },
      { name: "Beyoncé", field: "Musician" },
      { name: "Kate Middleton", field: "Duchess of Cambridge" },
    ],
    shareCardGradient: "bg-gradient-to-br from-emerald-400 via-teal-500 to-green-600",
  },
  INFJ: {
    title: "The Advocate",
    description: "Quiet and mystical, yet very inspiring and tireless idealists. INFJs are insightful and principled, often driven by a desire to help others and make the world a better place. They are deeply empathetic and can understand complex emotional situations. They value authenticity and meaningful connections.",
    iconHint: "helping hand community",
    topTraits: ["Insightful", "Idealistic", "Principled", "Empathetic", "Creative"],
    famousExamples: [
      { name: "Martin Luther King Jr.", field: "Civil Rights Leader" },
      { name: "Nelson Mandela", field: "Former President of South Africa" },
      { name: "Taylor Swift", field: "Musician" },
    ],
    shareCardGradient: "bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700",
  },
  INTJ: {
    title: "The Architect",
    description: "Imaginative and strategic thinkers, with a plan for everything. INTJs are analytical and independent, often driven by their innovative ideas and a desire for competence. They are logical and can see long-range consequences. They prefer to work on complex problems and value intellectual stimulation.",
    iconHint: "blueprint building",
    topTraits: ["Strategic", "Independent", "Analytical", "Innovative", "Determined"],
    famousExamples: [
      { name: "Elon Musk", field: "Entrepreneur" },
      { name: "Michelle Obama", field: "Former First Lady" }, // Note: Also listed as ESTJ by some
      { name: "Arnold Schwarzenegger", field: "Actor & Politician" },
    ],
    shareCardGradient: "bg-gradient-to-br from-indigo-700 via-blue-800 to-sky-900",
  },
  ISTP: {
    title: "The Virtuoso",
    description: "Bold and practical experimenters, masters of all kinds of tools. ISTPs are observant, resourceful, and enjoy understanding how things work. They are adaptable and action-oriented, often excelling in hands-on activities. They value freedom and are typically calm under pressure.",
    iconHint: "tools gears",
    topTraits: ["Resourceful", "Independent", "Adaptable", "Action-oriented", "Curious"],
    famousExamples: [
      { name: "Clint Eastwood", field: "Actor & Director" },
      { name: "Tom Cruise", field: "Actor" },
      { name: "Bear Grylls", field: "Adventurer" },
    ],
    shareCardGradient: "bg-gradient-to-br from-gray-500 via-cyan-600 to-sky-700",
  },
  ISFP: {
    title: "The Adventurer",
    description: "Flexible and charming artists, always ready to explore and experience something new. ISFPs are sensitive, kind, and have a strong appreciation for aesthetics. They are spontaneous and live in the present moment. They value harmony and personal freedom, often expressing themselves through creative outlets.",
    iconHint: "palette brush",
    topTraits: ["Artistic", "Charming", "Curious", "Adaptable", "Sensitive"],
    famousExamples: [
      { name: "Michael Jackson", field: "Musician" },
      { name: "Frida Kahlo", field: "Artist" },
      { name: "Lana Del Rey", field: "Musician" },
    ],
    shareCardGradient: "bg-gradient-to-br from-purple-400 via-fuchsia-500 to-pink-600",
  },
  INFP: {
    title: "The Mediator",
    description: "Poetic, kind and altruistic people, always eager to help a good cause. INFPs are idealistic and empathetic, driven by their strong values and a desire for authenticity. They are creative and often have a rich inner world. They value deep connections and strive to understand others.",
    iconHint: "dove peace",
    topTraits: ["Idealistic", "Empathetic", "Creative", "Values-driven", "Harmonious"],
    famousExamples: [
      { name: "William Shakespeare", field: "Playwright" },
      { name: "J.R.R. Tolkien", field: "Author" },
      { name: "Johnny Depp", field: "Actor" },
    ],
    shareCardGradient: "bg-gradient-to-br from-sky-400 via-cyan-500 to-teal-500",
  },
  INTP: {
    title: "The Logician",
    description: "Inventive and curious thinkers who have an unquenchable thirst for knowledge. INTPs are analytical and logical, often absorbed in their thoughts and theories. They are independent and enjoy solving complex problems. They value precision in thought and language.",
    iconHint: "atom science",
    topTraits: ["Analytical", "Inventive", "Logical", "Independent", "Skeptical"],
    famousExamples: [
      { name: "Albert Einstein", field: "Physicist" },
      { name: "Bill Gates", field: "Entrepreneur" },
      { name: "Kristen Stewart", field: "Actress" },
    ],
    shareCardGradient: "bg-gradient-to-br from-cyan-700 via-sky-700 to-blue-700",
  },
  ESTP: {
    title: "The Entrepreneur",
    description: "Smart, energetic and very perceptive people, who truly enjoy living on the edge. ESTPs are action-oriented and resourceful, thriving in dynamic environments. They are pragmatic and adaptable, often quick to find solutions to immediate problems. They value freedom and excitement.",
    iconHint: "rocket launch",
    topTraits: ["Energetic", "Perceptive", "Action-oriented", "Resourceful", "Bold"],
    famousExamples: [
      { name: "Donald Trump", field: "Businessman & Former U.S. President" },
      { name: "Madonna", field: "Musician" },
      { name: "Eddie Murphy", field: "Comedian & Actor" },
    ],
    shareCardGradient: "bg-gradient-to-br from-orange-500 via-red-500 to-rose-600",
  },
  ESFP: {
    title: "The Entertainer",
    description: "Spontaneous, energetic and enthusiastic people – life is never boring around them. ESFPs are outgoing and fun-loving, enjoying being the center of attention. They are practical and adaptable, with a great appreciation for sensory experiences. They value social interaction and bringing joy to others.",
    iconHint: "spotlight stage",
    topTraits: ["Enthusiastic", "Sociable", "Spontaneous", "Fun-loving", "Generous"],
    famousExamples: [
      { name: "Marilyn Monroe", field: "Actress" },
      { name: "Adele", field: "Musician" },
      { name: "Will Smith", field: "Actor" },
    ],
    shareCardGradient: "bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500",
  },
  ENFP: {
    title: "The Campaigner",
    description: "Enthusiastic, creative and sociable free spirits, who can always find a reason to smile. ENFPs are imaginative and independent, often inspiring others with their passion and new ideas. They are curious and value personal growth. They enjoy connecting with people on an emotional level.",
    iconHint: "party confetti",
    topTraits: ["Imaginative", "Enthusiastic", "Sociable", "Curious", "Independent"],
    famousExamples: [
      { name: "Robin Williams", field: "Comedian & Actor" },
      { name: "Robert Downey Jr.", field: "Actor" },
      { name: "Ellen DeGeneres", field: "Comedian & TV Host" },
    ],
    shareCardGradient: "bg-gradient-to-br from-pink-400 via-rose-500 to-fuchsia-500",
  },
  ENTP: {
    title: "The Debater",
    description: "Smart and curious thinkers who cannot resist an intellectual challenge. ENTPs are innovative and quick-witted, enjoying exploring new concepts and arguing for fun. They are resourceful and adaptable, often challenging existing norms. They value competence and intellectual sparring.",
    iconHint: "speech bubble debate",
    topTraits: ["Innovative", "Quick-witted", "Resourceful", "Knowledgeable", "Challenging"],
    famousExamples: [
      { name: "Steve Wozniak", field: "Co-founder of Apple" },
      { name: "Sacha Baron Cohen", field: "Comedian" },
      { name: "Thomas Edison", field: "Inventor" },
    ],
    shareCardGradient: "bg-gradient-to-br from-teal-500 via-cyan-600 to-sky-600",
  },
  ESTJ: {
    title: "The Executive",
    description: "Excellent administrators, unsurpassed at managing things – or people. ESTJs are organized and decisive, taking a logical approach to achieving their goals. They are responsible and value order and efficiency. They are often seen as natural leaders who implement plans effectively.",
    iconHint: "briefcase office",
    topTraits: ["Organized", "Efficient", "Decisive", "Direct", "Logical"],
    famousExamples: [
      { name: "Michelle Obama", field: "Former First Lady" }, // Also listed as INTJ
      { name: "Judge Judy", field: "TV Personality" },
      { name: "Emma Watson", field: "Actress" },
    ],
    shareCardGradient: "bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-700",
  },
  ESFJ: {
    title: "The Consul",
    description: "Extraordinarily caring, social and popular people, always eager to help. ESFJs are conscientious and cooperative, valuing harmony and social connections. They are practical and organized in their efforts to support others. They thrive on positive feedback and enjoy making others happy.",
    iconHint: "handshake group",
    topTraits: ["Sociable", "Caring", "Organized", "Supportive", "Conscientious"],
    famousExamples: [
      { name: "Jennifer Lopez", field: "Musician & Actress" },
      { name: "Joe Biden", field: "U.S. President" },
      { name: "Anne Hathaway", field: "Actress" },
    ],
    shareCardGradient: "bg-gradient-to-br from-rose-400 via-pink-500 to-red-500",
  },
  ENFJ: {
    title: "The Protagonist",
    description: "Charismatic and inspiring leaders, able to mesmerize their listeners. ENFJs are empathetic and diplomatic, often passionate about guiding others towards their potential. They are organized and value cooperation. They are skilled communicators who can motivate and influence groups.",
    iconHint: "leader podium",
    topTraits: ["Charismatic", "Inspiring", "Empathetic", "Diplomatic", "Sociable"],
    famousExamples: [
      { name: "Barack Obama", field: "Former U.S. President" },
      { name: "Oprah Winfrey", field: "TV Host & Entrepreneur" },
      { name: "Jennifer Lawrence", field: "Actress" },
    ],
    shareCardGradient: "bg-gradient-to-br from-lime-400 via-green-500 to-teal-600",
  },
  ENTJ: {
    title: "The Commander",
    description: "Bold, imaginative and strong-willed leaders, always finding a way – or making one. ENTJs are strategic and decisive, often taking charge to implement their vision. They are logical and efficient, with a natural ability for long-range planning. They value competence and are driven to achieve their ambitious goals.",
    iconHint: "chess king strategy",
    topTraits: ["Decisive", "Strategic", "Confident", "Visionary", "Efficient"],
    famousExamples: [
      { name: "Steve Jobs", field: "Co-founder of Apple" },
      { name: "Margaret Thatcher", field: "Former UK Prime Minister" },
      { name: "George Clooney", field: "Actor & Director" },
    ],
    shareCardGradient: "bg-gradient-to-br from-red-600 via-slate-700 to-zinc-800",
  },
};
