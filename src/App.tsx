import { useState, useEffect } from 'react';
import axios from 'axios';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import FeedbackScreen from './components/FeedbackScreen';
import { Question as QuestionType, Answer } from './types';

const App = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [timerReset, setTimerReset] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('/api')
      .then(response => {
        console.log('Raw Response:', response.data);
        const questionsData = response.data.data?.questions || response.data.questions || [];
        console.log('Extracted Questions:', questionsData);
        if (!questionsData.length) console.warn('No questions found in response');
        setQuestions(questionsData);
      })
      .catch(error => {
        console.error('Error fetching questions:', error.message, error.response?.data || 'No response data');
        setQuestions([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const startGame = () => setGameState('playing');
  const handleAnswer = (answer: string[]) => {
    setUserAnswers([...userAnswers, {
      questionId: questions[currentQuestionIndex].questionId,
      question: questions[currentQuestionIndex].question,
      userAnswer: answer,
      correctAnswer: questions[currentQuestionIndex].correctAnswer
    }]);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimerReset(true);
    } else {
      setGameState('finished');
    }
  };

  const handleTimeout = () => {
    handleAnswer(new Array(questions[currentQuestionIndex].correctAnswer.length).fill(''));
    handleNext();
  };

  const quitGame = () => {
    setGameState('start');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setTimerReset(false);
  };

  const restartGame = () => {
    setGameState('start');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setTimerReset(false);
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (gameState === 'start') return <StartScreen onStart={startGame} />;
  if (gameState === 'finished') return <FeedbackScreen answers={userAnswers} onRestart={restartGame} />;
  if (!questions.length) return <div className="flex items-center justify-center h-screen">Error: No questions loaded. Check the server at http://localhost:3000/data. See console for details.</div>;

  return (
    <QuestionScreen
      question={questions[currentQuestionIndex]}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onTimeout={handleTimeout}
      timerReset={timerReset}
      setTimerReset={setTimerReset}
      currentIndex={currentQuestionIndex}
      totalQuestions={questions.length}
      onQuit={quitGame}
    />
  );
};

export default App;