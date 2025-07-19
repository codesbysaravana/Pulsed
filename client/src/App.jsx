import React, { useEffect, useState } from "react";
import { socket } from "./socket"; // Import your socket instance
import Dashboard from "./components/Dashboard";
import EventSimulator from "./components/EventSimulator"; // Import the simulator

const App = () => {
    // State to hold aggregated analytics data from the server
    const [analytics, setAnalytics] = useState({
      totalEvents: 0,
      activeUsers: 0,
      avgScrollDepth: 0,
      avgSessionDuration: 0,
    });

    // State to hold a stream of recent events for charting
    const [latestEvents, setLatestEvents] = useState([]);

  useEffect(() => {
    socket.connect();

    // Listen for 'analyticsUpdate' events from the server
    socket.on("analyticsUpdate", (data) => {
      console.log("Received analytics update:", data);
      setAnalytics(prev => ({ ...prev, ...data })); // Merge new analytics data
    });

    // Listen for 'activeUsers' updates (this will be emitted separately in backend)
    socket.on("activeUsers", (count) => {
      console.log(`Active users: ${count}`);
      setAnalytics(prev => ({ ...prev, activeUsers: count }));
    });

    socket.on('realtimeEventsForChart', (events) => {
      console.log('Received events for chart:', events.length);
      setLatestEvents(events) //Update the state with the latest events array
    });

    //CleanUp
    return () => {
      socket.disconnect();
      socket.off("analyticsUpdate");
      socket.off("activeUsers");
      socket.off("realtimeEventsForChart");
    };
  }, []);

  return (
    <>
      <EventSimulator />  {/* The EventSimulator component helps in testing by emitting dummy events */}
      <Dashboard analytics={analytics} latestEvents={latestEvents} />
    </>
  )
}

export default App;

//Sockets used in APP here alone from backend collection 