import React, { useState } from "react";

const About = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    if (count < 10) {
      setCount((prev) => prev + 1);
    }
  };

  const handleDeIncrement = () => {
    if (count > 0) {
      setCount((prev) => prev - 1);
    }
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
        <h1 className="text-3xl font-semibold mb-4">
          {" "}
          <span className="text-2xl font-bold">{count}</span>
        </h1>
        <div className="flex justify-center items-center space-x-4 mt-5">
          <button
            disabled={count === 0}
            onClick={handleDeIncrement}
            className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition duration-200"
          >
            Decrement
          </button>

          <button
            onClick={handleIncrement}
            className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition duration-200"
          >
            Increment
          </button>
          <button
            onClick={reset}
            className="bg-white  p-3 text-black rounded-full transition duration-200"
          >
            Increment
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
