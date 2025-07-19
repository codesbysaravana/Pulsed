// client/src/components/MetricsCard.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MetricsCard({ title, value }) {
  // Animation variant for value change (pop effect)
  const valueVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
    exit: { scale: 0.8, opacity: 0 } // For when a component unmounts
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        backgroundColor: '#fff',
        padding: '25px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        textAlign: 'center',
        minHeight: '120px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h3 style={{ color: '#555', fontSize: '1.1rem', marginBottom: '10px' }}>{title}</h3>
      
      <AnimatePresence mode="wait"> {/* Animate presence of the value */}
        <motion.p
          key={value} // Key prop to trigger re-animation on value change
          variants={valueVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#007bff',
            margin: '0',
            lineHeight: '1',
          }}
        >
          {value}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}