const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const WebSocket = require('ws');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// MongoDB Model for active users
const ActiveUser = require('./models/ActiveUser');

// Create HTTP server and WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = new Map(); // Map of rollno -> WebSocket

// WebSocket Connection
wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);

      // 🔹 JOIN logic: save connection + DB entry
      if (data.type === "join") {
        const { rollno, role, name } = data;
        clients.set(rollno, ws);

        await ActiveUser.findOneAndUpdate(
          { rollno },
          { rollno, role, name },
          { upsert: true, new: true }
        );

        console.log(`✅ ${role} ${rollno} ${name} joined`);
        console.log("Current clients:", Array.from(clients.keys()));
      }

   

      if (data.type === "chat") {
        const { from, to, text, senderName } = data;
        const targetSocket = clients.get(to);
        if (targetSocket) {
          targetSocket.send(JSON.stringify({ from, text, senderName }));
        }
      }
    } catch (err) {
      console.error("❌ Error processing message:", err.message);
    }
  });

  // 🔹 DISCONNECT logic
  ws.on("close", async () => {
    for (let [rollno, socket] of clients.entries()) {
      if (socket === ws) {
        await ActiveUser.deleteOne({ rollno });
        clients.delete(rollno);
        console.log(`❌ ${rollno} disconnected`);
        break;
      }
    }
  });
});

// 🔹 API to get active students
app.get('/api/active-students', async (req, res) => {
  try {
    const activeStudents = await ActiveUser.find({ role: 'student' });
    res.json(activeStudents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch active students' });
  }
});

// 🔹 Debug route to view all active users
app.get('/api/debug/active-users', async (req, res) => {
  const users = await ActiveUser.find({});
  res.json(users);
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ MongoDB connected");
  server.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
})
.catch((err) => console.error("❌ MongoDB connection error:", err));
