import React from "react";
import { motion } from "framer-motion";

const AnimatedBackground = () => {
  const particles = Array.from({ length: 7 });

  const getRandomValue = (min, max) => Math.random() * (max - min) + min;

  return (
    <div className="animated-bg-pattern">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className={`particle-${i + 1}`}
          style={{
            '--float-x': `${getRandomValue(-30, 30)}px`,
            '--float-y': `${getRandomValue(-30, 30)}px`,
          }}
          initial={{ 
            opacity: 0, 
            scale: getRandomValue(0.3, 0.8),
            x: `${getRandomValue(0, 100)}vw`,
            y: `${getRandomValue(0, 100)}vh`,
          }}
          animate={{ 
            opacity: [0, 0.8, 0.8, 0],
            rotate: [0, 360],
          }}
          transition={{ 
            duration: getRandomValue(15, 30), 
            repeat: Infinity, 
            repeatType: "loop",
            ease: "linear",
            delay: getRandomValue(0,5)
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;