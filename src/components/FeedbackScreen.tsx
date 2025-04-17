import { Answer } from '../types';

interface FeedbackScreenProps {
  answers: Answer[];
  onRestart: () => void;
}

const FeedbackScreen = ({ answers, onRestart }: FeedbackScreenProps) => {
  const score = answers.reduce((acc, answer) => {
    return acc + (JSON.stringify(answer.userAnswer) === JSON.stringify(answer.correctAnswer) ? 1 : 0);
  }, 0) * 10; // Scale to 100 for percentage

  // Filter unique answers by questionId to avoid duplication
  const uniqueAnswers = answers.filter((answer, index, self) =>
    index === self.findIndex((a) => a.questionId === answer.questionId)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg shadow-lg p-8 w-[80%] max-w-[600px] h-auto min-h-[400px] text-center mx-auto">
        <h1 className="text-2xl font-bold mb-4">Sentence Construction</h1>
        <div className="border-4 border-blue-200 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center">
          <div className="text-4xl font-bold text-green-600">{score}</div>
        </div>
        <p className="text-gray-600 mb-4">
          While you correctly formed several sentences, there are a couple of areas where improvement is needed. Pay close attention to sentence structure and word placement to ensure clarity and correctness. Review your responses below for more details.
        </p>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={onRestart}>
          Go to Dashboard
        </button>
        <div className="mt-4 space-y-4">
          {uniqueAnswers.map((answer, index) => {
            const isCorrect = JSON.stringify(answer.userAnswer) === JSON.stringify(answer.correctAnswer);
            return (
              <div key={answer.questionId} className="bg-gray-50 p-4 rounded">
                <p className="text-sm text-gray-500">Prompt {index + 1}/{uniqueAnswers.length}</p>
                <p className="mt-2">{answer.question}</p>
                <p className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                  Your response {isCorrect ? 'Correct' : 'Incorrect'}
                </p>
                <p>{answer.userAnswer.join(' ') || 'No answer'}</p>
                {!isCorrect && <p>Correct: {answer.correctAnswer.join(' ')}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeedbackScreen;