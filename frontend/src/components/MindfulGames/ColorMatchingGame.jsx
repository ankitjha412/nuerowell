import React, { useState } from "react";
import "./MindfulGames.css";
import "./ColorMatch.css";

const colors = ["red", "blue", "green", "yellow"];
const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const ColorMatchingGame = () => {
  const [targetColor, setTargetColor] = useState(getRandomColor());
  const [score, setScore] = useState(0);

  const checkColor = (color) => {
    if (color === targetColor) {
      setScore(score + 1);
      setTargetColor(getRandomColor());
    }
  };

  return (
    <div className="color-matching-game">
      <h3>🎨 Color Matching Game</h3>
      <p>Find and click the color: <strong>{targetColor}</strong></p>
      <div className="color-buttons">
        {colors.map((color) => (
          <button key={color} style={{ backgroundColor: color }} onClick={() => checkColor(color)}></button>
        ))}
      </div>
      <p>Score: {score}</p>
    </div>
  );
};

export default ColorMatchingGame;
