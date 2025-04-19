import React, { useState, useEffect } from "react";
import "./MindfulGames.css";
import "./Breathing.css"

const BreathingGame = () => {
  const [phase, setPhase] = useState("Inhale");

  useEffect(() => {
    const cycle = ["Inhale", "Hold", "Exhale", "Hold"];
    let index = 0;

    const interval = setInterval(() => {
      setPhase(cycle[index]);
      index = (index + 1) % cycle.length;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="breathing-game">
      <h3>🌬️ Breathing Exercise</h3>
      <p>Follow the guided breathing exercise:</p>
      <div className={`breathing-circle ${phase.toLowerCase()}`}>{phase}</div>
    </div>
  );
};

export default BreathingGame;
