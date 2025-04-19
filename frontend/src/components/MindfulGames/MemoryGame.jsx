import React, { useState } from "react";
import "./MindfulGames.css";
import "./memorygame.css"

const cards = ["🍎", "🍌", "🍉", "🍓", "🍎", "🍌", "🍉", "🍓"].sort(() => Math.random() - 0.5);

const MemoryGame = () => {
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);

  const handleCardClick = (index) => {
    if (selected.length === 1) {
      const firstIndex = selected[0];
      if (cards[firstIndex] === cards[index]) {
        setMatched([...matched, firstIndex, index]);
      }
      setTimeout(() => setSelected([]), 500);
    } else {
      setSelected([index]);
    }
  };

  return (
    <div className="memory-game">
      <h3>🃏 Memory Flip Game</h3>
      <p>Find the matching pairs!</p>
      <div className="memory-grid">
        {cards.map((card, index) => (
          <button
            key={index}
            className={`memory-card ${matched.includes(index) ? "matched" : ""}`}
            onClick={() => handleCardClick(index)}
          >
            {selected.includes(index) || matched.includes(index) ? card : "❓"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
