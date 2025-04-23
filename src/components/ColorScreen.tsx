
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface ColorScreenProps {
  interval: number;
  duration: number;
}

const ColorScreen: React.FC<ColorScreenProps> = ({ interval, duration }) => {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [startTime] = useState(Date.now());
  const navigate = useNavigate();

  const handleStop = useCallback(() => {
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const colors = ['#29AAE2', '#BA141A'];
    let colorIndex = 0;
    let isWhite = false;
    
    // Create an interval for color changing
    const intervalTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      // Check if duration has elapsed
      if (elapsed >= duration * 1000) {
        clearInterval(intervalTimer);
        navigate('/');
        return;
      }

      // Toggle between white and colors
      if (isWhite) {
        setBackgroundColor(colors[colorIndex]);
        colorIndex = (colorIndex + 1) % colors.length;
      } else {
        setBackgroundColor('#FFFFFF');
      }
      isWhite = !isWhite;
    }, interval * 500); // Divide by 2 because we're showing white between colors

    // Cleanup function
    return () => {
      clearInterval(intervalTimer);
    };
  }, [interval, duration, navigate, startTime]);

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center transition-colors duration-300"
      style={{ backgroundColor }}
    >
      <button
        onClick={handleStop}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-900 px-8 py-4 text-lg rounded-md shadow-lg hover:bg-gray-100 transition-colors font-semibold"
      >
        STOP
      </button>
    </div>
  );
};

export default ColorScreen;
