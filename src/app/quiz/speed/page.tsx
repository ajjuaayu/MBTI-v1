
import QuizClient from "@/components/quiz/QuizClient";
import { getQuiz } from "@/lib/quizData";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata = {
  title: "SpeedType Quiz",
  description: "Take a quick 10-question personality assessment.",
};

export default function SpeedQuizPage() {
  const quiz = getQuiz("speed");

  if (!quiz) {
    // This should ideally not happen if quizData is correct
    // redirect("/"); 
    // For now, let's show an error message
     return (
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle>Quiz Not Found</CardTitle>
          <CardDescription>The SpeedType quiz could not be loaded. Please try again later.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return <QuizClient quiz={quiz} />;
}
