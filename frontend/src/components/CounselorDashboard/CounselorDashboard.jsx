// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import "./CounselerDashboard.css"
// import DownloadChatSummaryButton from "../DownloadChatSummaryButton/DownloadChatSummaryButton";

// const CounselorDashboard = () => {
//   const [students, setStudents] = useState([]);
//   const [selectedRoll, setSelectedRoll] = useState("");
//   const [chatHistory, setChatHistory] = useState({});
//   const [input, setInput] = useState("");
//   const socketRef = useRef(null);
//   const [selectedStudentName, setSelectedStudentName] = useState("");


//   useEffect(() => {
//     axios.get("http://localhost:5000/api/active-students")
//       .then((res) => setStudents(res.data))
//       .catch((err) => console.error("Error fetching students:", err));

//     socketRef.current = new WebSocket("ws://localhost:5000");

//     socketRef.current.onopen = () => {
//       socketRef.current.send(
//         JSON.stringify({ type: "join", rollno: "counselor1", role: "counselor", name: "Counselor" })
//       );
//     };

//     socketRef.current.onmessage = (msg) => {
//       const data = JSON.parse(msg.data);
//       const sender = data.from;
//       const senderName = data.senderName || sender;

//       if (!sender || !data.text) return;

//       setChatHistory((prev) => ({
//         ...prev,
//         [sender]: [...(prev[sender] || []), { from: senderName, text: data.text }]
//       }));
//     };

//     return () => socketRef.current.close();
//   }, []);

//   const handleSelectStudent = (roll) => {
//     setSelectedRoll(roll);
//     const selected = students.find((s) => s.rollno === roll);
//     setSelectedStudentName(selected?.name || "");
//   };
  

//   const sendMessage = () => {
//     if (input.trim() && selectedRoll) {
//       socketRef.current.send(JSON.stringify({
//         type: "chat",
//         from: "counselor1",
//         to: selectedRoll,
//         text: input,
//         senderName: "Counselor"
//       }));

//       setChatHistory((prev) => ({
//         ...prev,
//         [selectedRoll]: [...(prev[selectedRoll] || []), { from: "You", text: input }]
//       }));

//       setInput("");
//     }
//   };

//   const messages = chatHistory[selectedRoll] || [];

//   return (
//     <div className="dashboard-container">
//     <h2 className="dashboard-title">Counselor Dashboard</h2>
//     <div className="dashboard-body">
//       <div className="student-list">
//         <h3>Active Students</h3>
//         <ul>
//           {students.map((s) => (
//             <li
//               key={s.name}
//               onClick={() => handleSelectStudent(s.rollno)}
//               className={`student-item ${selectedRoll === s.rollno ? "active" : ""}`}
//             >
//               {s.name} ({s.rollno})
//             </li>
//           ))}
//         </ul>
//       </div>
          
//       <div className="chat-section">
//         <h3 style={{display:"flex"}}>
//           Chat with:{" "}
//           {selectedStudentName ? `${selectedStudentName} (${selectedRoll})` : "Select a student"}
//           <DownloadChatSummaryButton/>
//         </h3>
//         <div className="chat-box">
//         {messages.map((msg, i) => (
//   <div key={i} className={`chat-message ${msg.from === "You" ? "sent" : "received"}`}>
//     <strong>{msg.from}:</strong> {msg.text}
//   </div>
// ))}

//         </div>
//         <div className="chat-input">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type a message..."
//           />
//           <button onClick={sendMessage}>Send</button>
//         </div>
//       </div>
//     </div>
//   </div>
  
//   );
// };

// export default CounselorDashboard;




import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./CounselerDashboard.css";
import DownloadChatSummaryButton from "../DownloadChatSummaryButton/DownloadChatSummaryButton";

const CounselorDashboard = () => {
  const [students, setStudents] = useState([]);
  const [selectedRoll, setSelectedRoll] = useState("");
  const [chatHistory, setChatHistory] = useState({});
  const [input, setInput] = useState("");
  const [selectedStudentName, setSelectedStudentName] = useState("");

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null); // 👈 for auto-scroll

  useEffect(() => {
    axios
      .get("https://nuerowell.onrender.com/api/active-students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));

    socketRef.current = new WebSocket("ws://localhost:5000");

    socketRef.current.onopen = () => {
      socketRef.current.send(
        JSON.stringify({
          type: "join",
          rollno: "counselor1",
          role: "counselor",
          name: "Counselor"
        })
      );
    };

    socketRef.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      const sender = data.from;
      const senderName = data.senderName || sender;

      if (!sender || !data.text) return;

      setChatHistory((prev) => ({
        ...prev,
        [sender]: [...(prev[sender] || []), { from: senderName, text: data.text }]
      }));
    };

    return () => socketRef.current.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, selectedRoll]);

  const handleSelectStudent = (roll) => {
    setSelectedRoll(roll);
    const selected = students.find((s) => s.rollno === roll);
    setSelectedStudentName(selected?.name || "");
  };

  const sendMessage = () => {
    if (input.trim() && selectedRoll) {
      socketRef.current.send(
        JSON.stringify({
          type: "chat",
          from: "counselor1",
          to: selectedRoll,
          text: input,
          senderName: "Counselor"
        })
      );

      setChatHistory((prev) => ({
        ...prev,
        [selectedRoll]: [...(prev[selectedRoll] || []), { from: "You", text: input }]
      }));

      setInput("");
    }
  };

  const messages = chatHistory[selectedRoll] || [];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Counselor Dashboard</h2>
      <div className="dashboard-body">
        <div className="student-list">
          <h3>Active Students</h3>
          <ul>
            {students.map((s) => (
              <li
                key={s.name}
                onClick={() => handleSelectStudent(s.rollno)}
                className={`student-item ${selectedRoll === s.rollno ? "active" : ""}`}
              >
                {s.name} ({s.rollno})
              </li>
            ))}
          </ul>
        </div>

        <div className="chat-section">
          <h3 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>
              Chat with:{" "}
              {selectedStudentName ? `${selectedStudentName} (${selectedRoll})` : "Select a student"}
            </span>
            <DownloadChatSummaryButton rollno={selectedRoll} />
          </h3>

          <div className="chat-box">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.from === "You" ? "sent" : "received"}`}>
                <strong>{msg.from}:</strong> {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()} // ⏎ to send
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorDashboard;
