import React from 'react'
import { motion } from "framer-motion";
import MetricsCard from './MetricsCard';
import Charts from './Charts';

const Dashboard = ({ analytics, latestEvents = [] }) => {
    //varaints for framer motion
    const containerVaraints = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1 //slight delay for children
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

      // Dummy data for charts initially, will be replaced with real data
    const chartData = latestEvents.map(event => ({
        timestamp: new Date(event.timestamp).toLocaleTimeString(),
        scrollDepth: event.scrollDepth,
        sessionDuration: event.duration, // Assuming duration from userEvent simulation
        type: event.type
    }));
    

    //COMPONENTS
    return (
    <motion.div
        className='dashboard-container'
        variants={containerVaraints}
        initial="hidden"
        animate="visible"
        style={{
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f0f2f5',
            minHeight: '100vh',
        }}
    >
        <motion.h1
            style={{textAlign: 'center', color: '#333', marginBottom: '30px'}}
            variants={itemVariants}
        >
            Pulsed Live Dashboard
        </motion.h1>

        <div
            className='metrics-grid'
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
            }}
        >
            <MetricsCard title="Total Events" value={analytics.totalEvents} />
            <MetricsCard title="Active Users" value={analytics.activeUsers} />
            <MetricsCard title="Avg. Scroll Depth (%)" value={analytics.avgScrollDepth?.toFixed(2) || 'N/A'}  />
            <MetricsCard  title="Avg. Session Duration (s)" value={analytics.avgSessionDuration?.toFixed(2) || 'N/A'} />
        </div>


        <motion.div
            className="charts-section"
            variants={itemVariants}
            style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '20px',
            backgroundColor: '#fff',
            padding: '25px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}
        >
            <h2 style={{ gridColumn: '1 / -1', marginBottom: '20px', color: '#444' }}>Live Event Trends</h2>
            {/* Pass aggregated chart data to Charts component */}
            <Charts chartData={chartData} />
            {/* Add more charts here for different metrics */}

        </motion.div>


    </motion.div>
  )
}

export default Dashboard