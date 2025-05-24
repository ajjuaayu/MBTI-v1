
import type { Quiz, QuizQuestion } from "./types";

const speedQuestions: QuizQuestion[] = [
  // EI Questions (2)
  { id: 1, category: "EI", text: "At a social event, you usually:", options: [{ text: "Interact with many, including strangers", value: "E" }, { text: "Interact with a few, known to you", value: "I" }] },
  { id: 2, category: "EI", text: "You feel more energized by:", options: [{ text: "Spending time with a group of people", value: "E" }, { text: "Spending time alone or with one close friend", value: "I" }] },
  // SN Questions (3)
  { id: 3, category: "SN", text: "When learning something new, you prefer:", options: [{ text: "Focusing on the big picture and possibilities", value: "N" }, { text: "Focusing on facts and practical details", value: "S" }] },
  { id: 4, category: "SN", text: "You are more interested in:", options: [{ text: "What is actual and current", value: "S" }, { text: "What is possible and future-oriented", value: "N" }] },
  { id: 5, category: "SN", text: "In your work, you'd rather:", options: [{ text: "Deal with new problems that require ingenuity", value: "N" }, { text: "Deal with routine tasks that require precision", value: "S" }] },
  // TF Questions (2)
  { id: 6, category: "TF", text: "When making decisions, you rely more on:", options: [{ text: "Logical analysis and objective principles", value: "T" }, { text: "Personal values and how others might be affected", value: "F" }] },
  { id: 7, category: "TF", text: "You are more often described as:", options: [{ text: "Warm and empathetic", value: "F" }, { text: "Cool and objective", value: "T" }] },
  // JP Questions (3)
  { id: 8, category: "JP", text: "You prefer your life to be:", options: [{ text: "Planned and orderly", value: "J" }, { text: "Spontaneous and flexible", value: "P" }] },
  { id: 9, category: "JP", text: "When working on a project, you:", options: [{ text: "Prefer to have clear deadlines and structure", value: "J" }, { text: "Enjoy adapting and changing course as you go", value: "P" }] },
  { id: 10, category: "JP", text: "You find it more satisfying to:", options: [{ text: "Finish one task before starting another", value: "J" }, { text: "Work on multiple tasks simultaneously", value: "P" }] },
];

const deepDiveQuestions: QuizQuestion[] = [
  // EI (10 questions)
  { id: 101, category: "EI", text: "When you are in a group, do you usually:", options: [{ text: "Initiate conversations and activities", value: "E" }, { text: "Wait for others to initiate and then join in", value: "I" }] },
  { id: 102, category: "EI", text: "After a long week, you recharge by:", options: [{ text: "Going out with friends or engaging in social activities", value: "E" }, { text: "Having quiet time alone or with a very small group", value: "I" }] },
  { id: 103, category: "EI", text: "In discussions, you tend to:", options: [{ text: "Speak up readily and think as you talk", value: "E" }, { text: "Listen more and reflect before speaking", value: "I" }] },
  { id: 104, category: "EI", text: "You are more comfortable:", options: [{ text: "Meeting new people and expanding your social circle", value: "E" }, { text: "Deepening relationships with existing friends", value: "I" }] },
  { id: 105, category: "EI", text: "You prefer work environments that are:", options: [{ text: "Full of people and interactions", value: "E" }, { text: "Quiet and allow for concentration", value: "I" }] },
  { id: 106, category: "EI", text: "When solving a problem, you often:", options: [{ text: "Talk it through with others", value: "E" }, { text: "Think it through by yourself", value: "I" }] },
  { id: 107, category: "EI", text: "Your attention is usually directed:", options: [{ text: "Outward, towards people and things", value: "E" }, { text: "Inward, towards your own thoughts and ideas", value: "I" }] },
  { id: 108, category: "EI", text: "You find presentations or public speaking:", options: [{ text: "Energizing, a chance to engage an audience", value: "E" }, { text: "Draining, preferring written communication", value: "I" }] },
  { id: 109, category: "EI", text: "Large parties or gatherings make you feel:", options: [{ text: "Stimulated and lively", value: "E" }, { text: "Overwhelmed or tired after a while", value: "I" }] },
  { id: 110, category: "EI", text: "You prefer to express your ideas:", options: [{ text: "Verbally, in the moment", value: "E" }, { text: "In writing, after careful thought", value: "I" }] },
  
  // SN (10 questions)
  { id: 201, category: "SN", text: "You trust information that is:", options: [{ text: "Concrete, tangible, and directly observable", value: "S" }, { text: "Abstract, conceptual, and based on patterns or insights", value: "N" }] },
  { id: 202, category: "SN", text: "When given instructions, you prefer them to be:", options: [{ text: "Specific and detailed", value: "S" }, { text: "General, allowing for interpretation", value: "N" }] },
  { id: 203, category: "SN", text: "You are more drawn to:", options: [{ text: "Practical applications and real-world use", value: "S" }, { text: "Theoretical possibilities and innovative ideas", value: "N" }] },
  { id: 204, category: "SN", text: "You tend to notice:", options: [{ text: "Specific details and facts in your surroundings", value: "S" }, { text: "The overall pattern and connections between things", value: "N" }] },
  { id: 205, category: "SN", text: "When telling a story, you are more likely to:", options: [{ text: "Recount events in chronological order with details", value: "S" }, { text: "Jump around, focusing on the meaning or impression", value: "N" }] },
  { id: 206, category: "SN", text: "You prefer tasks that involve:", options: [{ text: "Working with known facts and established methods", value: "S" }, { text: "Developing new solutions and exploring possibilities", value: "N" }] },
  { id: 207, category: "SN", text: "Change and novelty are typically:", options: [{ text: "Something you approach cautiously, preferring stability", value: "S" }, { text: "Exciting and inspiring to you", value: "N" }] },
  { id: 208, category: "SN", text: "You would rather be seen as:", options: [{ text: "Practical and down-to-earth", value: "S" }, { text: "Imaginative and innovative", value: "N" }] },
  { id: 209, category: "SN", text: "When reading, you pay more attention to:", options: [{ text: "The literal meaning and factual content", value: "S" }, { text: "The underlying themes and symbolic meanings", value: "N" }] },
  { id: 210, category: "SN", text: "You generally prefer to:", options: [{ text: "Live in the present moment, focusing on current experiences", value: "S" }, { text: "Think about the future and potential outcomes", value: "N" }] },

  // TF (10 questions)
  { id: 301, category: "TF", text: "When offering critique, you prioritize:", options: [{ text: "Truthfulness and directness, even if it's hard to hear", value: "T" }, { text: "Tact and ensuring the other person's feelings are considered", value: "F" }] },
  { id: 302, category: "TF", text: "You make important life choices based more on:", options: [{ text: "Logical reasoning and objective criteria", value: "T" }, { text: "Your values and how the outcome will affect people", value: "F" }] },
  { id: 303, category: "TF", text: "You are more impressed by:", options: [{ text: "Someone's logical consistency and clear thinking", value: "T" }, { text: "Someone's empathy and ability to connect with others", value: "F" }] },
  { id: 304, category: "TF", text: "In a conflict, you are more likely to:", options: [{ text: "Focus on the issues and find a fair solution", value: "T" }, { text: "Focus on maintaining harmony and understanding perspectives", value: "F" }] },
  { id: 305, category: "TF", text: "You find it easier to:", options: [{ text: "Be firm and stand your ground when necessary", value: "T" }, { text: "Be accommodating and supportive of others' needs", value: "F" }] },
  { id: 306, category: "TF", text: "When evaluating a situation, your first instinct is to:", options: [{ text: "Analyze it objectively and identify flaws or inefficiencies", value: "T" }, { text: "Consider the human impact and emotional context", value: "F" }] },
  { id: 307, category: "TF", text: "You are more comfortable discussing:", options: [{ text: "Impersonal topics based on logic and facts", value: "T" }, { text: "Personal topics related to feelings and relationships", value: "F" }] },
  { id: 308, category: "TF", text: "It is more important for you to be seen as:", options: [{ text: "Competent and fair", value: "T" }, { text: "Caring and compassionate", value: "F" }] },
  { id: 309, category: "TF", text: "When a friend is upset, you are more likely to:", options: [{ text: "Offer logical solutions or try to fix the problem", value: "T" }, { text: "Offer emotional support and understanding", value: "F" }] },
  { id: 310, category: "TF", text: "Justice and fairness are:", options: [{ text: "Best achieved through impartial application of rules", value: "T" }, { text: "Best achieved by considering individual circumstances", value: "F" }] },

  // JP (10 questions)
  { id: 401, category: "JP", text: "You prefer to make decisions:", options: [{ text: "Quickly and decisively, to move forward", value: "J" }, { text: "After exploring all options, keeping things open", value: "P" }] },
  { id: 402, category: "JP", text: "Your workspace tends to be:", options: [{ text: "Organized and tidy, with everything in its place", value: "J" }, { text: "More flexible, with ongoing projects visible", value: "P" }] },
  { id: 403, category: "JP", text: "When planning a trip, you are more likely to:", options: [{ text: "Create a detailed itinerary and stick to it", value: "J" }, { text: "Have a general idea and see what happens", value: "P" }] },
  { id: 404, category: "JP", text: "You feel more comfortable when:", options: [{ text: "Things are settled and decided", value: "J" }, { text: "Options are still open and flexible", value: "P" }] },
  { id: 405, category: "JP", text: "Deadlines are usually:", options: [{ text: "Goals to be met, providing structure", value: "J" }, { text: "Flexible guidelines, with pressure motivating you near the end", value: "P" }] },
  { id: 406, category: "JP", text: "You prefer to approach tasks by:", options: [{ text: "Making a plan and following it step-by-step", value: "J" }, { text: "Being spontaneous and adapting as you go", value: "P" }] },
  { id: 407, category: "JP", text: "Unexpected changes to your schedule are typically:", options: [{ text: "Disruptive and something you try to avoid", value: "J" }, { text: "Opportunities for new experiences", value: "P" }] },
  { id: 408, category: "JP", text: "You enjoy having a sense of:", options: [{ text: "Closure and completion on tasks", value: "J" }, { text: "Openness and possibility", value: "P" }] },
  { id: 409, category: "JP", text: "Lists and to-do items are:", options: [{ text: "Essential tools for organization and productivity", value: "J" }, { text: "Reminders, but you often deviate from them", value: "P" }] },
  { id: 410, category: "JP", text: "You prefer a lifestyle that is more:", options: [{ text: "Structured and predictable", value: "J" }, { text: "Varied and adaptable", value: "P" }] },
];


export const quizzes: Record<string, Quiz> = {
  speed: {
    id: "speed",
    title: "SpeedType Quiz",
    description: "A quick 10-question quiz for a fast personality assessment.",
    questions: speedQuestions,
  },
  deepdive: {
    id: "deepdive",
    title: "DeepDive Quiz",
    description: "An in-depth 40-question quiz for a detailed personality profile.",
    questions: deepDiveQuestions,
  },
};

export const getQuiz = (quizId: string): Quiz | undefined => {
  return quizzes[quizId];
};
