import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ value, duration = 2, className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    
    const increment = value / (duration * 60); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return (
    <motion.span 
      className={className}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true }}
    >
      {count.toLocaleString()}
    </motion.span>
  );
}
