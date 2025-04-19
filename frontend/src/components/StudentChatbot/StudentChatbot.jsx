import React, { useEffect, useState, useRef } from "react";
import "./StudentChatbot.css";

const StudentChatbot = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const rollno = user?.user_id;
  const name = user?.name;

  const [chatbotMessages, setChatbotMessages] = useState([]);
  const [counselorMessages, setCounselorMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatTo, setChatTo] = useState("chatbot");
  const [showChat, setShowChat] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [typing, setTyping] = useState(false); // 👈 Add this near other useStates


  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:5000");
    socketRef.current.onopen = () => {
      socketRef.current.send(JSON.stringify({ type: "join", rollno, role: "student", name }));
    };
    socketRef.current.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.from === rollno && data.to === rollno) return;
      if (data.from === "counselor1") {
        setCounselorMessages((prev) => [...prev, { from: data.senderName || "Counselor", text: data.text }]);
      }
    };
    return () => socketRef.current.close();
  }, [rollno]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatbotMessages, counselorMessages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const userMessage = { from: "You", text: input };
  
    if (chatTo === "chatbot") {
      setChatbotMessages((prev) => [...prev, userMessage]);
      setTyping(true); // 👈 Start typing animation
  
      try {
        const res = await fetch("http://10.1.73.168:8020/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: rollno,
            message: input
          })
        });
  
        const data = await res.json();
        const reply = data?.response || "I'm here to help you. Can you tell me more?";
  
        setChatbotMessages((prev) => [
          ...prev,
          { from: "Nuerowell", text: reply }
        ]);
      } catch (error) {
        setChatbotMessages((prev) => [
          ...prev,
          { from: "Nuerowell", text: "⚠️ I'm having trouble reaching the server." }
        ]);
      } finally {
        setTyping(false); // 👈 Stop typing
      }
  
    } else {
      // Counselor logic
      socketRef.current.send(JSON.stringify({
        type: "chat",
        from: rollno,
        to: "counselor1",
        text: input,
        senderName: name
      }));
  
      setCounselorMessages((prev) => [...prev, userMessage]);
    }
  
    setInput("");
  };
  

  // const switchToCounselor = () => {
  //   setChatTo("counselor");
  //   const message = "Hi, I'd like to talk to a counselor.";
  //   socketRef.current.send(JSON.stringify({
  //     type: "chat",
  //     from: rollno,
  //     to: "counselor1",
  //     text: message,
  //     senderName: name
  //   }));
  //   setCounselorMessages((prev) => [...prev, { from: "You", text: message }]);
  // };



  const switchToCounselor = async () => {
    const userMsg = "connect me to counselor";
  
    // Step 1: Switch to chatbot, show user's message
    setChatTo("chatbot");
    setChatbotMessages((prev) => [...prev, { from: "You", text: userMsg }]);
    setTyping(true);
  
    try {
      // Step 2: Send message to chatbot server
      const res = await fetch("http://10.1.73.168:8020/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: rollno,
          message: userMsg
        })
      });
  
      const data = await res.json();
      const reply = data?.response || "Sure, connecting you to a counselor.";
  
      // Step 3: Show chatbot's reply
      setChatbotMessages((prev) => [...prev, { from: "Nuerowell", text: reply }]);
      setTyping(false);
  
      // Step 4: Wait for user to read chatbot's message, then switch
      setTimeout(() => {
        setChatTo("counselor");
        const greeting = "Hi, I'd like to talk to a counselor.";
        socketRef.current.send(JSON.stringify({
          type: "chat",
          from: rollno,
          to: "counselor1",
          text: greeting,
          senderName: name
        }));
        setCounselorMessages((prev) => [...prev, { from: "You", text: greeting }]);
      }, 2500); // Wait 2.5 seconds before switching
  
    } catch (error) {
      setTyping(false);
      setChatbotMessages((prev) => [...prev, {
        from: "Nuerowell",
        text: "⚠️ Failed to connect to server. Try again later."
      }]);
    }
  };
  

  const switchToBot = () => {
    setChatTo("chatbot");
    setChatbotMessages((prev) => [...prev, { from: "You", text: "I'd like to chat with the AI again." }]);
    setTimeout(() => {
      setChatbotMessages((prev) => [...prev, { from: "Nuerowell", text: `How can I help you?` }]);
    }, 1000);
  };

  const currentMessages = chatTo === "chatbot" ? chatbotMessages : counselorMessages;

  return (
    <>
      {!showChat && (
        <button className="chatbot-float-button" onClick={() => setShowChat(true)}>
          🧠
        </button>
      )}
      {showChat && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <span><strong>{name}</strong> ({rollno})</span>
            <button className="chatbot-close" onClick={() => setShowChat(false)}>×</button>
          </div>

         
          <div className="chatbot-messages">
  {currentMessages.map((msg, i) => (
    <div key={i} className={`chatbot-message ${msg.from === "You" ? "user" : "bot"}`}>
      {msg.from !== "You" && (
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712104.png"
          alt="AI"
          className="chatbot-avatar"
        />
      )}
      <div><strong>{msg.from}:</strong> {msg.text}</div>
    </div>
  ))}

  {/* ✅ Typing indicator for chatbot */}
  {typing && chatTo === "chatbot" && (
    <div className="chatbot-message bot">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4712/4712104.png"
        alt="AI"
        className="chatbot-avatar"
      />
      <div><strong>Nuerowell:</strong> <em>Thinking...</em></div>
    </div>
  )}

  <div ref={messagesEndRef} />
</div>


          <div className="chatbot-input-area">
            <div className="chatbot-input-row">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="chatbot-input"
              />
              <button className="send-button" onClick={sendMessage}>Send</button>
            </div>
            <div className="chatbot-buttons-bottom">
              <button className="ai-button" onClick={switchToBot}>Talk to Chatbot</button>
              <button className="talk-button" onClick={switchToCounselor}>Talk to Counselor</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentChatbot;







