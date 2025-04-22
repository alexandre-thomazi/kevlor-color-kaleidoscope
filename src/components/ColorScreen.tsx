
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ColorScreenProps {
  interval: number;
  duration: number;
}

const ColorScreen = ({ interval, duration }: ColorScreenProps) => {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [startTime] = useState(Date.now());
  const navigate = useNavigate();

  const handleStop = () => {
    if (timer) clearInterval(timer);
    navigate('/');
  };

  useEffect(() => {
    const colors = ['#29AAE2', '#BA141A'];
    let colorIndex = 0;
    let isWhite = false;

    const intervalTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed >= duration * 1000) {
        clearInterval(intervalTimer);
        navigate('/');
        return;
      }

      if (isWhite) {
        setBackgroundColor(colors[colorIndex]);
        colorIndex = (colorIndex + 1) % colors.length;
      } else {
        setBackgroundColor('#FFFFFF');
      }
      isWhite = !isWhite;
    }, interval * 500); // Divide by 2 because we're showing white between colors

    setTimer(intervalTimer);

    return () => {
      if (intervalTimer) clearInterval(intervalTimer);
    };
  }, [interval, duration, navigate, startTime]);

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center transition-colors duration-300"
      style={{ backgroundColor }}
    >
      <button
        onClick={handleStop}
        className="fixed top-4 right-4 bg-white text-gray-900 px-6 py-2 rounded-md shadow-lg hover:bg-gray-100 transition-colors font-semibold"
      >
        STOP
      </button>
    </div>
  );
};

export default ColorScreen;
