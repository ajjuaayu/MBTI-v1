
import QuizClient from "@/components/quiz/QuizClient";
import { getQuiz } from "@/lib/quizData";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata = {
  title: "DeepDive Quiz",
  description: "Take an in-depth 40-question personality profile.",
};

export default function DeepDiveQuizPage() {
  const quiz = getQuiz("deepdive");

  if (!quiz) {
     return (
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>Quiz Not Found</CardTitle>
          <CardDescription>The DeepDive quiz could not be loaded. Please try again later.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return <QuizClient quiz={quiz} />;
}
