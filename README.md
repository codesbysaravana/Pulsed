# ⚡️ Pulsed – Real-Time User Engagement Dashboard

**Pulsed** is a real-time analytics dashboard built to track live user interactions such as clicks, scroll depth, and session duration. It leverages **React**, **Framer Motion**, **Socket.IO**, **Node.js**, **Express**, and **MongoDB** to deliver live updates and smooth animated UI experiences — perfect for learning and mastering **WebSockets**, real-time streaming, and modern frontend motion design.

![Pulsed Demo](./demo.gif) <!-- Replace with actual screen capture later -->

---

## 🚀 Features

### 📊 Real-Time Analytics
- Live user interaction tracking: clicks, scroll depth, session duration
- Active user count
- Real-time graph and counter updates

### 🎨 Modern UI/UX
- Clean, animated dashboard using **Framer Motion**
- Responsive layout with live metric cards and charts
- Smooth real-time transitions and metric updates

### 🧠 Backend Architecture
- Real-time event handling with **Socket.IO**
- Persistent storage of events in **MongoDB**
- Aggregated analytics emitted every few seconds to clients

### 🔁 Simulation
- Built-in event simulator to mimic frontend user behavior for testing purposes

---

## 📂 Folder Structure

pulsed/
├── client/ # React + Framer Motion frontend
│ ├── components/ # Dashboard UI components
│ ├── hooks/ # Reusable logic (e.g., useSocket)
│ ├── App.jsx # Main app with WebSocket connection
│ └── socket.js # Socket.IO client setup
├── server/ # Express + Socket.IO backend
│ ├── models/ # MongoDB Mongoose schema
│ ├── index.js # Main server entry point
│ └── socket.js # WebSocket connection logic
└── README.md


---

## ⚙️ Tech Stack

### Frontend
- ⚛️ React (Hooks)
- 💫 Framer Motion
- 📈 Recharts or Chart.js
- 🔌 Socket.IO Client

### Backend
- 🟩 Node.js + Express
- 🧪 Socket.IO Server
- 🗃️ MongoDB + Mongoose
- 🔐 dotenv for environment configuration

---

## 🧪 Event Simulation

Simulate click, scroll, and session events using a dummy `EventSimulator` component for testing real-time flows without real users.

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/pulsed.git
cd pulsed

2. Setup Backend
cd server
npm install

Create a .env file in server/ with:

MONGO_URI=your_mongodb_atlas_url
PORT=4000

3. Setup Frontend
cd client
npm install
npm start

🌐 Deployment
Frontend: Vercel or Netlify (npm run build)
Backend: Railway, Render, or Cyclic
Use CORS whitelist and update WebSocket URL accordingly in socket.js
 Skills You'll Master
Real-time WebSocket communication (Socket.IO)

Animated dashboards with Framer Motion
MongoDB event logging and aggregation
Full-stack system design (frontend ↔ backend ↔ DB)
Real-time user analytics architecture (used in SaaS, EdTech, HealthTech)

 Real-World Inspiration
Google Analytics Real-Time View
Hotjar & Mixpanel Dashboards
YouTube Studio Live Viewer Count