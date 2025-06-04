import React, { useState } from 'react';
import {
  SquarePlus as IconSquarePlus,
  SquareMinus as IconSquareMinus,
  RefreshCcw as IconReset
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function Home() {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [winner, setWinner] = useState(null);
  const maxScore = 10;

  const resetScores = () => {
    setScoreA(0);
    setScoreB(0);
    setWinner(null);
  };

  const handleScore = (team, score, setScore, otherScore) => {
    if (winner || score >= maxScore) return;

    const newScore = score + 1;
    if (newScore >= maxScore) {
      toast.success(`${team} Wins! 🎉`, { position: 'top-center' });
      setWinner(team);
    }
    setScore(newScore);
  };

  const highlightTeam = (score, otherScore) =>
    score > otherScore
      ? 'shadow-lg shadow-green-400'
      : score < otherScore
      ? 'shadow-lg shadow-red-400'
      : 'shadow-lg shadow-gray-300';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 p-6 md:p-10">
      <Toaster />
      <h1 className="text-center text-5xl font-extrabold text-gray-800 dark:text-white mb-10">
          Score Master 🎮
      </h1>

      {/* Reset Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={resetScores}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 hover:scale-105 text-white font-semibold rounded-full transition-all duration-300 shadow-md"
        >
          <IconReset />
          Reset
        </button>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Team A */}
        <div
          className={`bg-white dark:bg-white/10 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center ${highlightTeam(scoreA, scoreB)} transition duration-300`}
        >
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-300 mb-3">TEAM A</h2>
          <p className="text-7xl font-bold text-gray-800 dark:text-white transition-all duration-300">
            {scoreA}
          </p>
          <div className="flex mt-6 space-x-8">
            <IconSquareMinus
              size={48}
              className="hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
              onClick={() => scoreA > 0 && setScoreA(scoreA - 1)}
            />
            <IconSquarePlus
              size={48}
              className="hover:text-green-600 dark:hover:text-green-400 cursor-pointer"
              onClick={() => handleScore('Team A', scoreA, setScoreA, scoreB)}
            />
          </div>
        </div>

        {/* Team B */}
        <div
          className={`bg-white dark:bg-white/10 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center ${highlightTeam(scoreB, scoreA)} transition duration-300`}
        >
          <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-300 mb-3">TEAM B</h2>
          <p className="text-7xl font-bold text-gray-800 dark:text-white transition-all duration-300">
            {scoreB}
          </p>
          <div className="flex mt-6 space-x-8">
            <IconSquareMinus
              size={48}
              className="hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
              onClick={() => scoreB > 0 && setScoreB(scoreB - 1)}
            />
            <IconSquarePlus
              size={48}
              className="hover:text-green-600 dark:hover:text-green-400 cursor-pointer"
              onClick={() => handleScore('Team B', scoreB, setScoreB, scoreA)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
