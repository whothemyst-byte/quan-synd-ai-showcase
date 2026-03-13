import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter = ({ end, duration = 2000, suffix = "", prefix = "" }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const animate = () => {
      const currentTime = Date.now();
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(end * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={counterRef} className="text-4xl md:text-5xl font-bold gradient-text">
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
