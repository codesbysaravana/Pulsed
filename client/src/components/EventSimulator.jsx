//This component will periodically emit fake user events to your backend.


import { useEffect, useState } from "react";
import { socket } from "../socket"; // Import your socket instance

export default function EventSimulator() {
  const [simulationActive, setSimulationActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const startSimulation = () => {
    if (simulationActive) return;

    const id = setInterval(() => {
      const eventTypes = ["click", "scroll", "timeOnPage", "customEvent"];
      const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];

      const eventData = {
        type: randomType,
        scrollDepth: randomType === "scroll" ? Math.floor(Math.random() * 101) : undefined, // 0-100
        sessionDuration: randomType === "timeOnPage" ? Math.floor(Math.random() * 300) + 10 : undefined, // 10-310 seconds
        userId: `user_${Math.floor(Math.random() * 1000)}`, // Simulate different users
        pageUrl: `/page/${Math.floor(Math.random() * 5) + 1}`,
        elementId: randomType === "click" ? `button_${Math.floor(Math.random() * 3) + 1}` : undefined,
        duration: randomType === "timeOnPage" ? Math.floor(Math.random() * 300) + 10 : undefined,
      };
      console.log("Emitting userEvent:", eventData);
      socket.emit("userEvent", eventData);
      socket.emit('realtimeEvent', { ...eventData, timestamp: new Date().toISOString() });


    }, 1500); // Emit an event every 1.5 seconds

    setIntervalId(id);
    setSimulationActive(true);
  };

  const stopSimulation = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setSimulationActive(false);
    console.log("Simulation stopped.");
  };

  // Auto-start simulation on mount for convenience, but provide controls
  useEffect(() => {
    startSimulation();
    return () => stopSimulation(); // Cleanup on unmount
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
      <h2 style={{ color: '#333' }}>Event Simulation Control</h2>
      <p style={{ color: '#666', marginBottom: '15px' }}>
        {simulationActive ? "Simulation Running..." : "Simulation Stopped."}
      </p>
      <button
        onClick={simulationActive ? stopSimulation : startSimulation}
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          cursor: 'pointer',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: simulationActive ? '#dc3545' : '#28a745',
          color: 'white',
          margin: '0 10px',
          transition: 'background-color 0.3s ease',
        }}
      >
        {simulationActive ? "Stop Simulation" : "Start Simulation"}
      </button>
    </div>
  );
}




/* 
useEffect sets up a setInterval that runs every 1.5 seconds.

Inside the interval, it generates random type, scrollDepth, and sessionDuration data.

socket.emit("userEvent", eventData);: This sends the generated dummy event data to your backend server, simulating a user action.

socket.emit('realtimeEvent', { ...eventData, timestamp: new Date().toISOString() });: This line simulates the backend echoing back individual events that might be used directly for charting. This is a shortcut for testing. In a more robust setup, the backend would specifically emit these individual events after processing/saving them.

Added UI buttons to manually start/stop the simulation for more control during testing */