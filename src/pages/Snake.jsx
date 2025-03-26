import React,{ useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRedo, FaTrophy, FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const GAME_SPEED = 100;

const Snake = () => {
  // Game state
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const gameLoopRef = useRef(null);

  // Generate random food position
  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    
    // Make sure food doesn't spawn on snake
    const isOnSnake = snake.some(segment => 
      segment.x === newFood.x && segment.y === newFood.y
    );
    
    if (isOnSnake) return generateFood();
    return newFood;
  }, [snake]);

  // Reset game
  const resetGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    setFood(generateFood());
  }, [generateFood]);

  // Handle keyboard controls
  const handleKeyDown = useCallback((e) => {
    if (!gameStarted) return;
    
    switch (e.key) {
      case 'ArrowUp':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'ArrowDown':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'ArrowLeft':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'ArrowRight':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
      case ' ':
        setIsPaused(prev => !prev);
        break;
      default:
        break;
    }
  }, [direction, gameStarted]);

  // Game loop
  const moveSnake = useCallback(() => {
    if (gameOver || isPaused || !gameStarted) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };

      // Move head based on direction
      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
        default:
          break;
      }

      // Check wall collision
      if (
        head.x < 0 || head.x >= GRID_SIZE ||
        head.y < 0 || head.y >= GRID_SIZE
      ) {
        setGameOver(true);
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop(); // Remove tail if no food eaten
      }

      return newSnake;
    });
  }, [direction, food, gameOver, generateFood, isPaused, gameStarted]);

  // Initialize game
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Game loop control
  useEffect(() => {
    if (gameStarted && !gameOver) {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED);
    }
    return () => clearInterval(gameLoopRef.current);
  }, [moveSnake, gameOver, gameStarted]);

  // Touch controls for mobile
  const handleSwipe = (newDirection) => {
    if (!gameStarted) return;
    
    if (
      (newDirection === 'UP' && direction !== 'DOWN') ||
      (newDirection === 'DOWN' && direction !== 'UP') ||
      (newDirection === 'LEFT' && direction !== 'RIGHT') ||
      (newDirection === 'RIGHT' && direction !== 'LEFT')
    ) {
      setDirection(newDirection);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-sky-700 text-white p-4 flex flex-col items-center justify-center">
      <div className="max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-green-300">
          Snake Game
        </h1>

        {/* Game Stats */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl">
            Score: <span className="font-bold">{score}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
          >
            <FaRedo />
            <span>{gameStarted ? 'Restart' : 'Start Game'}</span>
          </motion.button>
        </div>

        {/* Game Board */}
        <div className="relative bg-black/30 border-2 border-green-400/30 rounded-lg overflow-hidden">
          <div 
            className="grid"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
              width: `${GRID_SIZE * CELL_SIZE}px`,
              height: `${GRID_SIZE * CELL_SIZE}px`,
              margin: '0 auto'
            }}
          >
            {/* Food */}
            <motion.div
              key={`food-${food.x}-${food.y}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-red-500 rounded-full"
              style={{
                gridColumn: food.x + 1,
                gridRow: food.y + 1,
              }}
            />

            {/* Snake */}
            {snake.map((segment, index) => (
              <motion.div
                key={index}
                className={`${index === 0 ? 'bg-green-400' : 'bg-green-500'} rounded-sm`}
                style={{
                  gridColumn: segment.x + 1,
                  gridRow: segment.y + 1,
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500 }}
              />
            ))}
          </div>

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
                  className="bg-gradient-to-br from-green-800 to-blue-800 p-8 rounded-xl max-w-sm w-full mx-4 text-center"
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
                    onClick={resetGame}
                    className="bg-gradient-to-r from-green-400 to-blue-500 px-6 py-3 rounded-lg font-semibold"
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
              className="absolute inset-0 flex items-center justify-center flex-col gap-4 bg-black/70"
            >
              <motion.h2
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl font-bold"
              >
                Snake Game
              </motion.h2>
              <p className="text-lg">Use arrow keys to move</p>
              <p className="text-green-300">Eat the red food to grow</p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={resetGame}
                className="mt-4 bg-gradient-to-r from-green-500 to-blue-500 px-8 py-3 rounded-lg font-bold text-lg"
              >
                Start Game
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="mt-6 grid grid-cols-3 gap-2 max-w-xs mx-auto md:hidden">
          <div></div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('UP')}
            className="bg-white/20 p-4 rounded-lg flex justify-center"
          >
            <FaArrowUp className="text-xl" />
          </motion.button>
          <div></div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('LEFT')}
            className="bg-white/20 p-4 rounded-lg flex justify-center"
          >
            <FaArrowLeft className="text-xl" />
          </motion.button>
          <div className="bg-white/20 p-4 rounded-lg flex justify-center opacity-50">
            <span className="text-xs">PAUSE</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('RIGHT')}
            className="bg-white/20 p-4 rounded-lg flex justify-center"
          >
            <FaArrowRight className="text-xl" />
          </motion.button>
          
          <div></div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('DOWN')}
            className="bg-white/20 p-4 rounded-lg flex justify-center"
          >
            <FaArrowDown className="text-xl" />
          </motion.button>
          <div></div>
        </div>

        {/* Desktop Controls Info */}
        <div className="mt-6 text-center text-gray-300 hidden md:block">
          <p>Controls: Arrow Keys | Pause: Spacebar</p>
        </div>
      </div>
    </div>
  );
};

export default Snake;