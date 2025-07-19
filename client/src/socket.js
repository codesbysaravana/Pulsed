import { io } from 'socket.io-client';

export const socket = io("http://localhost:4000");

socket.on("connect", () => {
    console.log("✅ Connected to WebSocket server!");
});

socket.on("disconnect", () => {
    console.log("❌ Disconnected from WebSocket server!");
});

socket.on("connect_error", (err) => {
    console.log("Socket connection error:", err.message);
})