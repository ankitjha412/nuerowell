import React, { useState } from "react";
import BreathingGame from "./BreathingGame";
import ColorMatchingGame from "./ColorMatchingGame";
import MemoryGame from "./MemoryGame";
import "./MindfulGames.css";

const MindfulGames = () => {
  const [game, setGame] = useState(null);

  // **Toggle function** for selecting/hiding a game
  const toggleGame = (selectedGame) => {
    if (game === selectedGame) {
      setGame(null);      // If the same button is clicked again, hide the game
    } else {
      setGame(selectedGame);
    }
  };

  return (
    <div className="mindful-games-container">
      <h2>🎮 Mindful Games</h2>
      <p>Engage your mind and relax with these simple games.</p>

      <div className="game-buttons">
        <button onClick={() => toggleGame("breathing")}>🌬️ Breathing Exercise</button>
        <button onClick={() => toggleGame("color-match")}>🎨 Color Matching</button>
        <button onClick={() => toggleGame("memory")}>🃏 Memory Flip</button>
      </div>

      <div className="game-area">
        {game === "breathing" && <BreathingGame />}
        {game === "color-match" && <ColorMatchingGame />}
        {game === "memory" && <MemoryGame />}
      </div>
    </div>
  );
};

export default MindfulGames;
