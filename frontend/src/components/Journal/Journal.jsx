// import React, { useState, useEffect } from "react";
// import "./Journal.css";

// const moods = ["😃 Happy", "😐 Neutral", "😢 Sad", "😡 Stressed"];

// const Journal = () => {
//   const [mood, setMood] = useState("");
//   const [entry, setEntry] = useState("");
//   const [journalEntries, setJournalEntries] = useState([]);

//   useEffect(() => {
//     const storedEntries = JSON.parse(localStorage.getItem("journal")) || [];
//     setJournalEntries(storedEntries);
//   }, []);

//   const saveEntry = () => {
//     if (!entry) return;
//     const newEntry = { mood, text: entry, date: new Date().toLocaleDateString() };
//     const updatedEntries = [...journalEntries, newEntry];
//     setJournalEntries(updatedEntries);
//     localStorage.setItem("journal", JSON.stringify(updatedEntries));
//     setEntry("");
//   };

//   return (
//     <div className="journal-container">
//       <h2>📝 Journaling & Mood Tracker</h2>
      
//       <p>Select Your Mood:</p>
//       <div className="mood-buttons">
//         {moods.map((m) => (
//           <button key={m} onClick={() => setMood(m)} className={mood === m ? "active" : ""}>{m}</button>
//         ))}
//       </div>

//       <textarea value={entry} onChange={(e) => setEntry(e.target.value)} placeholder="Write your thoughts..."></textarea>
//       <button onClick={saveEntry}>Save Entry</button>

//       <h3>📅 Previous Entries</h3>
//       <ul>
//         {journalEntries.map((entry, index) => (
//           <li key={index}>{entry.date} - {entry.mood} - {entry.text}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Journal;


import React, { useState, useEffect } from "react";
import "./Journal.css";

const moods = ["😃 Happy", "😐 Normal", "😢 Sad", "😡 Stressed"];

const Journal = () => {
  const [mood, setMood] = useState("");
  const [entry, setEntry] = useState("");
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    // Retrieve any stored journal entries from localStorage
    const storedEntries = JSON.parse(localStorage.getItem("journal")) || [];
    setJournalEntries(storedEntries);
  }, []);

  // **Save a new entry** to the journal
  const saveEntry = () => {
    if (!entry) return; // If no text, do nothing
    const newEntry = {
      mood,
      text: entry,
      date: new Date().toLocaleDateString()
    };
    const updatedEntries = [...journalEntries, newEntry];
    setJournalEntries(updatedEntries);
    localStorage.setItem("journal", JSON.stringify(updatedEntries));
    setEntry("");
  };

  // **Delete an entry** by index
  const deleteEntry = (indexToDelete) => {
    const updatedEntries = journalEntries.filter(
      (_, index) => index !== indexToDelete
    );
    setJournalEntries(updatedEntries);
    localStorage.setItem("journal", JSON.stringify(updatedEntries));
  };

  return (
<div className="journal-container" style={{ zIndex: 1000, position: "relative" }}>
<h2>📝 Journaling & Mood Tracker</h2>
      
      <p>Select Your Mood:</p>
      <div className="mood-buttons">
        {moods.map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={mood === m ? "active" : ""}
          >
            {m}
          </button>
        ))}
      </div>

      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write your thoughts..."
      ></textarea>

      <button onClick={saveEntry}>Save Entry</button>

      <h3>📅 Previous Entries</h3>
      <ul>
        {journalEntries.map((entry, index) => (
          <li key={index}>
            {entry.date} - {entry.mood} - {entry.text}{" "}
            <button className="delete" onClick={() => deleteEntry(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Journal;
