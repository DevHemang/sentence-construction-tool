export interface Question {
    questionId: string;
    question: string;
    questionType: string;
    answerType: string;
    options: string[];
    correctAnswer: string[];
  }
  
  export interface Answer {
    questionId: string;
    question: string; // Added to store the original question
    userAnswer: string[];
    correctAnswer: string[];
  }