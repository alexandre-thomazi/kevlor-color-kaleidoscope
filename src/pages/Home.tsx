
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [interval, setInterval] = useState('2');
  const [duration, setDuration] = useState('60');
  const [error, setError] = useState('');
  const [titleColors, setTitleColors] = useState({ kev: '#29AAE2', lor: '#BA141A' });
  const navigate = useNavigate();

  useEffect(() => {
    const titleTimer = setInterval(() => {
      setTitleColors(prev => ({
        kev: prev.kev === '#29AAE2' ? '#BA141A' : '#29AAE2',
        lor: prev.lor === '#29AAE2' ? '#BA141A' : '#29AAE2'
      }));
    }, 1500);

    return () => clearInterval(titleTimer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const intervalNum = Number(interval);
    const durationNum = Number(duration);

    if (!interval || !duration) {
      setError('Please fill in both fields');
      return;
    }

    if (intervalNum <= 0 || durationNum <= 0) {
      setError('Values must be greater than 0');
      return;
    }

    navigate('/color-screen', { state: { interval: intervalNum, duration: durationNum } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">
          <span style={{ color: titleColors.kev }}>Kev</span>
          <span style={{ color: titleColors.lor }}>lor®</span>
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="interval" className="block text-sm font-medium text-gray-700 mb-1">
              Interval (seconds)
            </label>
            <input
              id="interval"
              type="number"
              min="0.1"
              step="0.1"
              value={interval}
              onChange={(e) => setInterval(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter interval time"
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Duration (seconds)
            </label>
            <input
              id="duration"
              type="number"
              min="1"
              step="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter duration time"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors font-semibold"
          >
            START
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
