import React, { useState, useEffect } from "react";

const AverageScoreTracker = () => {
  const [scores, setScores] = useState([]); // Array to store scores
  const [inputScore, setInputScore] = useState(""); // Input field state

  // Function to read the scores from localStorage
  useEffect(() => {
    const savedScores = localStorage.getItem("score-save-realestate-x");
    if (savedScores) {
      setScores(savedScores.split(";-;").map(Number)); // Parse stored scores as numbers
    }
  }, []); // Runs once when the component mounts

  // Function to save the scores to localStorage whenever the scores state changes
  useEffect(() => {
    if (scores.length > 0) {
      localStorage.setItem("score-save-realestate-x", scores.join(";-;"));
    } else {
      localStorage.removeItem("score-save-realestate-x"); // Clear localStorage if no scores
    }
  }, [scores]); // Runs every time the scores array changes

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

  // Function to reset the array
  const resetArray = () => {
    setScores([]); // Set the scores array to an empty array
  };

  return (
    <div>
      <h1>Score Tracker</h1>

      <input
        className="input-score-input"
        type="number"
        value={inputScore}
        placeholder="Enter score"
        min="1" max="5"
        step="0.5"
        onChange={(e) => setInputScore(e.target.value)} // Handle input change
      />
      <button className="add-score-button" onClick={addScore}>Add</button>
      <p>Average Score: {calculateAverage()}</p>

      {/* Button to reset the array */}
      <button className="add-score-button" onClick={resetArray}>Reset Scores</button>
    </div>
  );
};

export default AverageScoreTracker;
