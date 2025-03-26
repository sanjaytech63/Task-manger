import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpaceShuttle, FaRedo, FaTrophy } from 'react-icons/fa';

const SpaceShooter = () => {
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [enemies, setEnemies] = useState([]);
  const [lasers, setLasers] = useState([]);
  const [playerPosition, setPlayerPosition] = useState(50);
  const gameAreaRef = useRef(null);

  // Game constants
  const ENEMY_SPAWN_RATE = 1000;
  const LASER_SPEED = 10;
  const ENEMY_SPEED = 3;

  // Initialize game
  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setEnemies([]);
    setLasers([]);
  };

  // Player movement
  const handleMouseMove = (e) => {
    if (!gameAreaRef.current || !gameStarted || gameOver) return;
    
    const gameRect = gameAreaRef.current.getBoundingClientRect();
    const relativeX = e.clientX - gameRect.left;
    const percentage = (relativeX / gameRect.width) * 100;
    setPlayerPosition(Math.min(Math.max(percentage, 0), 90));
  };

  // Shoot laser
  const shootLaser = () => {
    if (!gameStarted || gameOver) return;
    setLasers(prev => [...prev, { id: Date.now(), x: playerPosition }]);
  };

  // Spawn enemies
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const enemyInterval = setInterval(() => {
      setEnemies(prev => [...prev, { 
        id: Date.now(), 
        x: Math.random() * 90, 
        y: 0 
      }]);
    }, ENEMY_SPAWN_RATE);

    return () => clearInterval(enemyInterval);
  }, [gameStarted, gameOver]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      // Move lasers
      setLasers(prev => 
        prev.map(laser => ({ ...laser, y: laser.y - LASER_SPEED }))
        .filter(laser => laser.y > -10)
      );

      // Move enemies
      setEnemies(prev => 
        prev.map(enemy => ({ ...enemy, y: enemy.y + ENEMY_SPEED }))
        .filter(enemy => enemy.y < 100)
      );

      // Check collisions
      enemies.forEach(enemy => {
        // Enemy reached bottom
        if (enemy.y > 90) {
          setLives(prev => prev - 1);
          setEnemies(prev => prev.filter(e => e.id !== enemy.id));
        }

        // Laser hit enemy
        lasers.forEach(laser => {
          if (
            Math.abs(laser.x - enemy.x) < 10 && 
            Math.abs(laser.y - enemy.y) < 10
          ) {
            setScore(prev => prev + 10);
            setEnemies(prev => prev.filter(e => e.id !== enemy.id));
            setLasers(prev => prev.filter(l => l.id !== laser.id));
          }
        });
      });

      // Check game over
      if (lives <= 0) {
        setGameOver(true);
      }
    }, 50);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, enemies, lasers, lives]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
          Space Shooter
        </h1>

        {/* Game Stats */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl">
            Score: <span className="font-bold">{score}</span>
          </div>
          <div className="flex gap-2">
            {[...Array(lives)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <FaSpaceShuttle className="text-red-500" />
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
          >
            <FaRedo />
            <span>{gameStarted ? 'Restart' : 'Start Game'}</span>
          </motion.button>
        </div>

        {/* Game Area */}
        <div 
          ref={gameAreaRef}
          onClick={shootLaser}
          onMouseMove={handleMouseMove}
          className="relative w-full h-96 bg-black/30 border-2 border-blue-400/30 rounded-lg overflow-hidden cursor-crosshair"
        >
          {/* Player */}
          <motion.div
            className="absolute bottom-4 w-12 h-12 text-blue-400"
            style={{ left: `${playerPosition}%` }}
            animate={{ 
              x: `${playerPosition}%`,
              y: [0, -5, 0]
            }}
            transition={{ 
              x: { type: 'spring', stiffness: 300 },
              y: { duration: 1, repeat: Infinity }
            }}
          >
            <FaSpaceShuttle className="w-full h-full" />
          </motion.div>

          {/* Lasers */}
          <AnimatePresence>
            {lasers.map(laser => (
              <motion.div
                key={laser.id}
                className="absolute w-1 h-8 bg-red-500 rounded-full"
                style={{ 
                  left: `${laser.x}%`,
                  bottom: `${100 - laser.y}%`
                }}
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
              />
            ))}
          </AnimatePresence>

          {/* Enemies */}
          <AnimatePresence>
            {enemies.map(enemy => (
              <motion.div
                key={enemy.id}
                className="absolute w-8 h-8 text-red-500"
                style={{ 
                  left: `${enemy.x}%`,
                  top: `${enemy.y}%`
                }}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full bg-red-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Game Over Modal */}
          <AnimatePresence>
            {gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-br from-blue-800 to-purple-800 p-8 rounded-xl max-w-md w-full mx-4 text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    className="mx-auto w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full flex items-center justify-center mb-6"
                  >
                    <FaTrophy className="text-4xl text-yellow-700" />
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
                  <p className="text-xl mb-6">Your score: {score}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startGame}
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 rounded-lg font-semibold"
                  >
                    Play Again
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Start Screen */}
          {!gameStarted && !gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center flex-col gap-4"
            >
              <motion.h2
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl font-bold"
              >
                Space Shooter
              </motion.h2>
              <p className="text-lg">Click to shoot</p>
              <p className="text-blue-300">Move mouse to control ship</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={startGame}
                className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 rounded-lg font-bold text-lg"
              >
                Start Game
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Controls Info */}
        <div className="mt-6 text-center text-gray-400">
          <p>Move: Mouse | Shoot: Click</p>
        </div>
      </div>
    </div>
  );
};

export default SpaceShooter;