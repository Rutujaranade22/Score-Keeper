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
  const maxScore = 10;
  const [winner, setWinner] = useState(null);

  const resetScores = () => {
    setScoreA(0);
    setScoreB(0);
    setWinner(null);
  };

  const handleScore = (team, currentScore, setScore) => {
    if (winner) return;

    const newScore = currentScore + 1;
    if (newScore >= maxScore) {
      setScore(newScore);
      setWinner(team);
      toast.success(`${team} wins!`, {
        duration: 3000,
        position: 'top-center',
      });
    } else {
      setScore(newScore);
    }
  };

  const getTeamClass = (teamScore, opponentScore) => {
    return teamScore > opponentScore
      ? 'text-green-600 dark:text-green-400 font-bold'
      : teamScore < opponentScore
      ? 'text-red-600 dark:text-red-400'
      : 'text-gray-800 dark:text-gray-300';
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 p-6 md:p-10'>
      <Toaster />
      <h1 className='text-center text-4xl font-bold py-6 md:py-10 bg-white/50 dark:bg-white/10 backdrop-blur-md rounded-xl shadow-lg text-gray-900 dark:text-white'>
        🏆 Score Keeper
      </h1>

      <div className='flex justify-center my-6'>
        <button
          onClick={resetScores}
          className='flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 dark:from-yellow-500 dark:to-orange-500 hover:scale-105 px-6 py-2 rounded-full font-semibold text-white shadow-md transition'
        >
          <IconReset className="w-5 h-5" />
          Reset Scores
        </button>
      </div>

      <div className='flex flex-col md:flex-row justify-around items-center gap-6'>
        {/* Team A */}
        <div className='w-full md:w-1/3 bg-white/40 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 transition'>
          <h2 className='text-2xl text-center font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2'>
            TEAM A
          </h2>
          <h3 className={`text-6xl text-center mb-4 ${getTeamClass(scoreA, scoreB)}`}>
            {scoreA}
          </h3>
          <div className='flex justify-around mt-6'>
            <IconSquareMinus
              className='w-12 h-12 cursor-pointer hover:text-red-600 dark:hover:text-red-400 transition'
              onClick={() => scoreA > 0 && setScoreA(scoreA - 1)}
            />
            <IconSquarePlus
              className='w-12 h-12 cursor-pointer hover:text-green-600 dark:hover:text-green-400 transition'
              onClick={() => handleScore("Team A", scoreA, setScoreA)}
            />
          </div>
        </div>

        {/* Team B */}
        <div className='w-full md:w-1/3 bg-white/40 dark:bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 transition'>
          <h2 className='text-2xl text-center font-semibold mb-4 text-gray-900 dark:text-white border-b pb-2'>
            TEAM B
          </h2>
          <h3 className={`text-6xl text-center mb-4 ${getTeamClass(scoreB, scoreA)}`}>
            {scoreB}
          </h3>
          <div className='flex justify-around mt-6'>
            <IconSquareMinus
              className='w-12 h-12 cursor-pointer hover:text-red-600 dark:hover:text-red-400 transition'
              onClick={() => scoreB > 0 && setScoreB(scoreB - 1)}
            />
            <IconSquarePlus
              className='w-12 h-12 cursor-pointer hover:text-green-600 dark:hover:text-green-400 transition'
              onClick={() => handleScore("Team B", scoreB, setScoreB)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
