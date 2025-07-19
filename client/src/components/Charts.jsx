import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

export default function Charts({ chartData }) {
  const chartVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  //filter data to show only latest 20 data
  const latestChartData = chartData.slice(-20);

  return (
    <motion.div
      variants={chartVariants}
      initial="hidden"
      animate="visible"
      style={{ width: '100%', height: '350px', backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
    >
      <h4 style={{ textAlign: 'center', marginBottom: '15px', color: '#666' }}>Scroll Depth Over Time</h4>
      <ResponsiveContainer width="100%" height="90%">

        <LineChart //displays the slliced data
          data={latestChartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="timestamp" stroke="#888" interval="preserveStartEnd" />
          <YAxis stroke="#888" label={{ value: 'Scroll Depth (%)', angle: -90, position: 'insideLeft', fill: '#666' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}
            labelStyle={{ color: '#333' }}
            itemStyle={{ color: '#555' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="scrollDepth"
            stroke="#82ca9d"
            activeDot={{ r: 8 }}
            strokeWidth={2}
            animationDuration={300} // Recharts animation
          />
        </LineChart>

      </ResponsiveContainer>
    </motion.div>
  );
}


/* 
chartData prop: This prop will receive an array of objects, where each object represents a point in time with relevant metrics (e.g., { timestamp: '10:00:00 AM', scrollDepth: 75 }).

ResponsiveContainer: Ensures the chart resizes with its parent container.

dataKey="timestamp" for XAxis: Plots the timestamp on the horizontal axis.

dataKey="scrollDepth" for Line: Plots the scroll depth on the vertical axis.

Tooltip: Provides interactive details when hovering over data points.

Animation: Recharts includes basic animations by default, like animationDuration on the Line component.

Integrating latestEvents into Dashboard.jsx and passing it to Charts.jsx:
In App.jsx, you are already maintaining latestEvents state from realtimeEvent emitted by the simulator (or potentially the backend later).
You need to pass this latestEvents array to your Dashboard component, and then from Dashboard to Charts. */