import React, { useState } from "react";

const AverageScoreTracker = () => {
  const [scores, setScores] = useState([]); // Array to store scores
  const [inputScore, setInputScore] = useState(""); // Input field state

  // Function to add a new score
  const addScore = () => {
    const score = parseFloat(inputScore); // Convert input to number
    if (!isNaN(score)) {
      setScores([...scores, score]); // Add score to the scores array
      setInputScore(""); // Clear input after submission
    } else {
      alert("Please enter a valid number.");
    }
  };

  // Function to calculate the average
  const calculateAverage = () => {
    if (scores.length === 0) return 0;
    const sum = scores.reduce((total, score) => total + score, 0);
    return (sum / scores.length).toFixed(2); // Return average with 2 decimal places
  };

   // Function 3: Erase (reset) the array
   const resetArray = () => {
    setScores([]); // Set the scores array to an empty array
  };

  return (
    <div>
      <h1>Average Score Tracker</h1>

      <input
        type="text"
        value={inputScore}
        placeholder="Enter score"
        onChange={(e) => setInputScore(e.target.value)} // Handle input change
      />
      <button onClick={addScore}>Add Score</button>
      <p>Average Score: {calculateAverage()}</p>

       

        {/* Button to reset the array */}
        <button onClick={resetArray}>Reset Scores</button>

      
    </div>
  );
};

export default AverageScoreTracker;