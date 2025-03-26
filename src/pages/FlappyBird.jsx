import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRedo, FaTrophy } from 'react-icons/fa';

const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const BIRD_SIZE = 30;
const GRAVITY = 0.5;
const JUMP_FORCE = -10;
const PIPE_WIDTH = 80;
const PIPE_GAP = 150;
const PIPE_SPEED = 3;

const FlappyBird = () => {
  // Game state
  const [birdPosition, setBirdPosition] = useState(GAME_HEIGHT / 2);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const gameAreaRef = useRef(null);
  const requestRef = useRef();
  const lastPipeRef = useRef(0);

  // Generate random pipe height
  const getRandomPipe = useCallback(() => {
    const pipeHeight = Math.floor(Math.random() * (GAME_HEIGHT - PIPE_GAP - 100)) + 50;
    return {
      x: GAME_WIDTH,
      height: pipeHeight,
      passed: false
    };
  }, []);

  // Jump function
  const jump = useCallback(() => {
    if (!gameStarted && !gameOver) {
      setGameStarted(true);
      setPipes([getRandomPipe()]);
    }
    if (!gameOver) {
      setBirdVelocity(JUMP_FORCE);
    }
  }, [gameStarted, gameOver, getRandomPipe]);

  // Reset game
  const resetGame = useCallback(() => {
    setBirdPosition(GAME_HEIGHT / 2);
    setBirdVelocity(0);
    setPipes([]);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
  }, []);

  // Game loop
  const gameLoop = useCallback(() => {
    if (gameOver) return;

    // Update bird position
    setBirdPosition(prev => {
      const newPosition = prev + birdVelocity;
      setBirdVelocity(prevVelocity => prevVelocity + GRAVITY);

      // Check ground collision
      if (newPosition > GAME_HEIGHT - BIRD_SIZE) {
        setGameOver(true);
        return GAME_HEIGHT - BIRD_SIZE;
      }

      // Check ceiling collision
      if (newPosition < 0) {
        setGameOver(true);
        return 0;
      }

      return newPosition;
    });

    // Update pipes
    setPipes(prevPipes => {
      if (!gameStarted) return prevPipes;

      // Move pipes
      const updatedPipes = prevPipes.map(pipe => {
        // Check if bird passed the pipe
        if (!pipe.passed && pipe.x + PIPE_WIDTH < GAME_WIDTH / 2 - BIRD_SIZE / 2) {
          setScore(prev => prev + 1);
          return { ...pipe, x: pipe.x - PIPE_SPEED, passed: true };
        }

        // Check pipe collision
        if (
          (GAME_WIDTH / 2 - BIRD_SIZE / 2 > pipe.x && 
           GAME_WIDTH / 2 - BIRD_SIZE / 2 < pipe.x + PIPE_WIDTH) &&
          (birdPosition < pipe.height || 
           birdPosition + BIRD_SIZE > pipe.height + PIPE_GAP)
        ) {
          setGameOver(true);
        }

        return { ...pipe, x: pipe.x - PIPE_SPEED };
      }).filter(pipe => pipe.x > -PIPE_WIDTH);

      // Add new pipes
      if (prevPipes.length === 0 || prevPipes[prevPipes.length - 1].x < GAME_WIDTH - 200) {
        return [...updatedPipes, getRandomPipe()];
      }

      return updatedPipes;
    });

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [birdPosition, birdVelocity, gameOver, gameStarted, getRandomPipe]);

  // Initialize game
  useEffect(() => {
    // Set high score from localStorage
    const savedHighScore = localStorage.getItem('flappyHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }

    // Handle keyboard controls
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  // Game loop control
  useEffect(() => {
    if (gameStarted && !gameOver) {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameLoop, gameStarted, gameOver]);

  // Update high score
  useEffect(() => {
    if (gameOver && score > highScore) {
      setHighScore(score);
      localStorage.setItem('flappyHighScore', score.toString());
    }
  }, [gameOver, score, highScore]);

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center p-4"
      onClick={jump}
    >
      <div className="relative overflow-hidden rounded-xl shadow-2xl border-4 border-white/20">
        {/* Game Area */}
        <div 
          ref={gameAreaRef}
          className="relative bg-blue-300"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-300 to-blue-400">
            {/* Clouds */}
            {[20, 120, 250, 350].map((x) => (
              <motion.div
                key={x}
                className="absolute bg-white rounded-full"
                style={{
                  width: 60,
                  height: 30,
                  top: 50,
                  left: x,
                }}
                animate={{ x: [0, -GAME_WIDTH] }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'linear'
                }}
              />
            ))}

            {/* Ground */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-green-600 h-20"
              animate={{ x: [0, -100, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear'
              }}
            />
          </div>

          {/* Pipes */}
          {pipes.map((pipe, index) => (
            <div key={index}>
              {/* Top Pipe */}
              <motion.div
                className="absolute bg-green-500 border-r-4 border-l-4 border-green-700"
                style={{
                  width: PIPE_WIDTH,
                  height: pipe.height,
                  left: pipe.x,
                  top: 0,
                }}
                initial={{ x: GAME_WIDTH }}
                animate={{ x: pipe.x }}
                transition={{ type: 'linear' }}
              >
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-green-700" />
              </motion.div>

              {/* Bottom Pipe */}
              <motion.div
                className="absolute bg-green-500 border-r-4 border-l-4 border-green-700"
                style={{
                  width: PIPE_WIDTH,
                  height: GAME_HEIGHT - pipe.height - PIPE_GAP,
                  left: pipe.x,
                  bottom: 0,
                }}
                initial={{ x: GAME_WIDTH }}
                animate={{ x: pipe.x }}
                transition={{ type: 'linear' }}
              >
                <div className="absolute top-0 left-0 right-0 h-4 bg-green-700" />
              </motion.div>
            </div>
          ))}

          {/* Bird */}
          <motion.div
            className="absolute bg-yellow-400 rounded-full shadow-lg"
            style={{
              width: BIRD_SIZE,
              height: BIRD_SIZE,
              left: GAME_WIDTH / 2 - BIRD_SIZE / 2,
              top: birdPosition,
              rotate: birdVelocity * 2
            }}
            animate={{
              y: birdPosition,
              rotate: birdVelocity * 2
            }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            {/* Eye */}
            <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full" />
            <div className="absolute top-1 right-1 w-1 h-1 bg-black rounded-full" />
            {/* Beak */}
            <div className="absolute top-1/2 right-0 w-3 h-2 bg-orange-500 transform translate-x-1 -translate-y-1/2" />
          </motion.div>

          {/* Score */}
          <div className="absolute top-4 left-0 right-0 text-center">
            <motion.div
              className="inline-block bg-black/30 px-4 py-1 rounded-full text-white font-bold text-xl"
              animate={{ scale: score > 0 ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              {score}
            </motion.div>
          </div>

          {/* Start Screen */}
          {!gameStarted && !gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center flex-col"
            >
              <motion.h2
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-4xl font-bold text-white mb-4"
              >
                Flappy Bird
              </motion.h2>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-white mb-6"
              >
                Tap or press Space to start
              </motion.p>
              <p className="text-white/80">High Score: {highScore}</p>
            </motion.div>
          )}

          {/* Game Over Screen */}
          <AnimatePresence>
            {gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-br from-blue-500 to-purple-500 p-8 rounded-xl text-center max-w-xs w-full"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-6"
                  >
                    <FaTrophy className="text-5xl text-yellow-300 mx-auto" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-white mb-2">Game Over!</h2>
                  <p className="text-white mb-1">Score: {score}</p>
                  <p className="text-white mb-6">High Score: {highScore}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetGame}
                    className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold"
                  >
                    Play Again
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls Info */}
        <div className="bg-blue-500 p-2 text-center text-white/80 text-sm">
          {window.innerWidth > 768 ? 'Press SPACE to jump' : 'Tap to jump'}
        </div>
      </div>
    </div>
  );
};

export default FlappyBird;