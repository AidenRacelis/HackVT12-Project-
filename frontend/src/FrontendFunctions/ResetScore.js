import React, { useState } from "react";

const ResetScore = () => {
  const [scores, setScores] = useState([85, 90, 78, 92, 88]); // Initial scores

  // Function to reset the scores array
  const resetScores = () => {
    setScores([]); // Reset array to an empty array
  };

  return (
    <div>
      <h1>Scores Tracker</h1>

      {/* Display the scores */}
      <h2>Scores: {scores.length > 0 ? scores.join(", ") : "No scores available"}</h2>

      {/* Button to reset the scores array */}
      <button onClick={resetScores}>Reset Scores</button>
    </div>
  );
};

export default ResetScore;