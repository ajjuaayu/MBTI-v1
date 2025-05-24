
import type { MBTIType } from "@/config/site";

export type MbtiDichotomy = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface QuizOption {
  text: string;
  value: MbtiDichotomy;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: [QuizOption, QuizOption];
  category: 'EI' | 'SN' | 'TF' | 'JP';
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export type MbtiScores = {
  E: number; I: number;
  S: number; N: number;
  T: number; F: number;
  J: number; P: number;
};

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  mbtiType?: MBTIType; // For AI messages
  timestamp: number;
}
