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

const QuestionScreen = ({ question, onAnswer, onNext, onTimeout, timerReset, setTimerReset, currentIndex, onQuit }: QuestionScreenProps) => {
  const [selectedWords, setSelectedWords] = useState<string[]>(new Array(question.correctAnswer.length).fill(''));
  const [availableOptions, setAvailableOptions] = useState<string[]>([...question.options]);

  useEffect(() => {
    const initialSelectedWords = new Array(question.correctAnswer.length).fill('');
    const initialOptions = [...question.options];
    if (JSON.stringify(selectedWords) !== JSON.stringify(initialSelectedWords) || JSON.stringify(availableOptions) !== JSON.stringify(initialOptions)) {
      setSelectedWords(initialSelectedWords);
      setAvailableOptions(initialOptions);
    }
    setTimerReset(false);
    const parts = question.question.split('____'); // Changed to match your delimiter
    console.log('Question Changed - Question:', question.question, 'Options:', question.options, 'Expected Blanks:', question.correctAnswer.length, 'Actual Parts:', parts.length - 1);
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

  const [timeLeft, setTimeLeft] = useState(30);

  const handleWordSelect = (word: string) => {
    const firstEmptyIndex = selectedWords.findIndex(w => !w);
    if (firstEmptyIndex === -1) return;
    setSelectedWords(prev => {
      const newSelectedWords = [...prev];
      newSelectedWords[firstEmptyIndex] = word;
      onAnswer(newSelectedWords);
      console.log('Selected:', word, 'at Index:', firstEmptyIndex, 'Selected Words:', newSelectedWords);
      return newSelectedWords;
    });
    setAvailableOptions(prev => prev.filter(opt => opt !== word));
  };

  const handleWordRemove = (index: number) => {
    const word = selectedWords[index];
    if (!word) return;
    setSelectedWords(prev => {
      const newSelectedWords = [...prev];
      newSelectedWords[index] = '';
      onAnswer(newSelectedWords);
      console.log('Removed at Index:', index, 'Selected Words:', newSelectedWords);
      return newSelectedWords;
    });
    setAvailableOptions(prev => [...prev, word].sort());
  };

  const isNextDisabled = selectedWords.some(word => !word);

  const questionParts = question.question.split('____'); // Changed to match your delimiter

  if (questionParts.length - 1 !== question.correctAnswer.length) {
    console.error('Question Format Mismatch: Expected', question.correctAnswer.length, 'blanks, but found', questionParts.length - 1, 'in:', question.question);
    return <div className="text-center p-6">Error: Question format mismatch. Expected {question.correctAnswer.length} blanks, but found {questionParts.length - 1}. Check the question string in db.json.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" key={question.questionId}>
      <div className="bg-white rounded-lg shadow-lg p-8 w-[80%] max-w-[600px] h-auto min-h-[400px] text-center mx-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}</span>
          <button className="px-2 py-1 border border-gray-300 rounded text-gray-600" onClick={onQuit}>Quit</button>
        </div>
        <div className="w-full bg-white-200 h-1 mb-6">
          <div className="flex gap-1">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded ${i < currentIndex + 1 ? 'bg-yellow-500' : 'bg-gray-300'}`}
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
                  className={`inline-block px-2 py-1 border rounded min-w-[80px] text-center ${selectedWords[index] ? 'bg-50' : 'bg-200'
                    }`}
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
          className={`px-4 py-2 rounded  w-auto ${isNextDisabled ? 'bg-trasnparent-300 border cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
          disabled={isNextDisabled}
          onClick={onNext}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default QuestionScreen;