import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Question as QuestionType } from '../types';

interface QuestionScreenProps {
  question: QuestionType;
  onAnswer: (answer: string[]) => void;
  onNext: () => void;
  onTimeout: () => void;
  timerReset: boolean;
  setTimerReset: Dispatch<SetStateAction<boolean>>;
  currentIndex: number;
  totalQuestions: number;
  onQuit: () => void;
}

const QuestionScreen = ({
  question,
  onAnswer,
  onNext,
  onTimeout,
  timerReset,
  setTimerReset,
  currentIndex,
  totalQuestions,
  onQuit
}: QuestionScreenProps) => {
  const [selectedWords, setSelectedWords] = useState<string[]>(new Array(question.correctAnswer.length).fill(''));
  const [availableOptions, setAvailableOptions] = useState<string[]>([...question.options]);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    setSelectedWords(new Array(question.correctAnswer.length).fill(''));
    setAvailableOptions([...question.options]);
    setTimerReset(false);
  }, [question, setTimerReset]);

  useEffect(() => {
    let mounted = true;
    if (timerReset && mounted) {
      setTimeLeft(30);
      setTimerReset(false);
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (mounted) onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [timerReset, onTimeout, setTimerReset]);

  const handleWordSelect = (word: string) => {
    const firstEmptyIndex = selectedWords.findIndex(w => !w);
    if (firstEmptyIndex === -1) return;

    const newSelectedWords = [...selectedWords];
    newSelectedWords[firstEmptyIndex] = word;
    setSelectedWords(newSelectedWords);

    setAvailableOptions(prev => prev.filter(opt => opt !== word));
  };

  const handleWordRemove = (index: number) => {
    const word = selectedWords[index];
    if (!word) return;

    const newSelectedWords = [...selectedWords];
    newSelectedWords[index] = '';
    setSelectedWords(newSelectedWords);

    setAvailableOptions(prev => [...prev, word].sort());
  };

  const handleNext = () => {
    onAnswer(selectedWords); 
    onNext(); 
  };

  const isNextDisabled = selectedWords.some(word => !word);
  const questionParts = question.question.split('____');

  if (questionParts.length - 1 !== question.correctAnswer.length) {
    return <div className="text-center p-6">Error: Question format mismatch. Expected {question.correctAnswer.length} blanks, but found {questionParts.length - 1}.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" key={question.questionId}>
      <div className="bg-white rounded-lg shadow-lg p-8 w-[80%] max-w-[600px] min-h-[400px] text-center">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
          <button className="px-2 py-1 border border-gray-300 rounded text-gray-600" onClick={onQuit}>Quit</button>
        </div>
        <div className="w-full bg-white-200 h-1 mb-6">
          <div className="flex gap-1">
            {Array.from({ length: totalQuestions }).map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded ${i <= currentIndex ? 'bg-yellow-500' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
        <p className="text-center text-gray-500 mb-4">Select the missing words in the correct order</p>
        <div className="text-center space-y-2 mb-4">
          {questionParts.map((part, index) => (
            <span key={index} className="inline-flex items-center space-x-2">
              {part}
              {index < question.correctAnswer.length && (
                <span
                  className={`inline-block px-2 py-1 border rounded min-w-[80px] text-center ${selectedWords[index] ? 'bg-gray-200' : 'bg-white'}`}
                  onClick={() => selectedWords[index] && handleWordRemove(index)}
                >
                  {selectedWords[index] || '_____'}
                </span>
              )}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {availableOptions.map((option, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              onClick={() => handleWordSelect(option)}
              disabled={selectedWords.every(word => word !== '')}
            >
              {option}
            </button>
          ))}
        </div>
        <button
          className={`px-4 py-2 rounded ${isNextDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          disabled={isNextDisabled}
          onClick={handleNext}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default QuestionScreen;
