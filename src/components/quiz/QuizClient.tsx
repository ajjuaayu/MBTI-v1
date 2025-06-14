
"use client";

import type { Quiz, QuizQuestion, MbtiScores, MbtiDichotomy } from "@/lib/types";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { calculateMbtiType, getDefaultScores } from "@/lib/mbtiCalculator";
import { AlertCircle, CheckCircle2, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface QuizClientProps {
  quiz: Quiz;
}

export default function QuizClient({ quiz }: QuizClientProps) {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, MbtiDichotomy | undefined>>({});
  const [scores, setScores] = useState<MbtiScores>(getDefaultScores());
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentQuestionIndex];

  useEffect(() => {
    // Reset states if quiz changes or on initial load
    setScores(getDefaultScores());
    setAnswers({});
    setCurrentQuestionIndex(0);
    setQuizStarted(false);
    setUserName(""); // Also reset userName if quiz changes
    setError(null);
    setNameError(null);
  }, [quiz]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setNameError("Please enter your name to start the quiz.");
      return;
    }
    setNameError(null);
    setQuizStarted(true);
  };

  const handleAnswer = (questionId: number, value: MbtiDichotomy) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setError(null); // Clear error on new selection
  };

  const handleNext = () => {
    if (answers[currentQuestion.id] === undefined) {
      setError("Please select an answer before proceeding.");
      return;
    }
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setError(null); 
    }
  };

  const handleSubmit = () => {
    if (answers[currentQuestion.id] === undefined && currentQuestionIndex === totalQuestions - 1) {
      setError("Please select an answer for the last question.");
      return;
    }
    
    const finalScores = getDefaultScores();
    quiz.questions.forEach(q => {
      const answer = answers[q.id];
      if (answer) {
        finalScores[answer]++;
      }
    });
    
    const mbtiType = calculateMbtiType(finalScores);
    localStorage.setItem('quizScores', JSON.stringify(finalScores)); 
    localStorage.setItem('userName', userName); 
    router.push(`/quiz/results/${mbtiType}`);
  };

  const progressPercentage = quizStarted ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  if (!quizStarted) {
    return (
      <Card className="w-full max-w-lg mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">{quiz.title}</CardTitle>
          <CardDescription className="text-center text-muted-foreground">{quiz.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleNameSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="userName" className="text-lg font-semibold">What's your name?</Label>
              <Input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name or a nickname"
                className="text-base"
                aria-describedby="nameError"
              />
              {nameError && (
                <p id="nameError" className="text-sm text-destructive flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" /> {nameError}
                </p>
              )}
            </div>
            <Button type="submit" size="lg" className="w-full">
              Start Quiz
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground justify-center">
          <p>Let's get to know your personality!</p>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-primary">{quiz.title}</CardTitle>
        <CardDescription className="text-center text-muted-foreground">Hello, {userName}! {quiz.description}</CardDescription>
        <Progress value={progressPercentage} className="mt-4" />
        <p className="text-sm text-muted-foreground text-center mt-2">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="p-4 border rounded-lg bg-background shadow-sm">
          <p className="text-xl font-semibold mb-6 text-center">{currentQuestion.text}</p>
          <RadioGroup
            key={currentQuestion.id} // Force re-render on question change
            value={answers[currentQuestion.id]}
            onValueChange={(value) => handleAnswer(currentQuestion.id, value as MbtiDichotomy)}
            className="space-y-4"
          >
            {currentQuestion.options.map((option, index) => (
              <Label
                key={`${currentQuestion.id}-option-${index}`} // Ensure option keys are also unique per question
                htmlFor={`option-${currentQuestion.id}-${index}`}
                className={`flex items-center p-4 border rounded-md cursor-pointer transition-all duration-200 ease-in-out hover:border-primary ${answers[currentQuestion.id] === option.value ? 'border-primary bg-accent shadow-md' : 'border-border'}`}
              >
                <RadioGroupItem value={option.value} id={`option-${currentQuestion.id}-${index}`} className="mr-3 h-5 w-5" />
                <span className="text-base">{option.text}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          Category: {currentQuestion.category}
        </span>
        {currentQuestionIndex < totalQuestions - 1 ? (
          <Button onClick={handleNext} size="lg" disabled={answers[currentQuestion.id] === undefined}>
            Next Question
          </Button>
        ) : (
          <Button onClick={handleSubmit} size="lg" disabled={answers[currentQuestion.id] === undefined} className="bg-green-600 hover:bg-green-700 text-white">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Finish & See Results
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
