import { useState } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  const [coins] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[80%] max-w-[600px] h-auto min-h-[400px] text-center mx-auto">
      
        <h1 className="text-2xl font-bold mb-4 mt-4">Sentence Construction</h1>
        <div className="text-gray-500 mb-6 mt-9">
          <p>Select the correct words to complete the sentence by arranging the provided options in the right order.</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6 text-gray-600">
          <div>Time Per Question<br />30 sec </div>
          <div>Total Questions<br />10</div>
          <div>Coins<br /><span className="text-yellow-500">0{coins}</span></div>
        </div>
        <div className="flex-end justify-between mt-12">
          <button className=" px-4 py-2 bg-blue-500 text-white rounded" onClick={onStart}>Start</button>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;