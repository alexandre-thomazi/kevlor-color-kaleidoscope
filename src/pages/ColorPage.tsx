
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import ColorScreen from '../components/ColorScreen';

interface LocationState {
  interval: number;
  duration: number;
}

const ColorPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;

  if (!state || typeof state.interval !== 'number' || typeof state.duration !== 'number') {
    return <Navigate to="/" replace />;
  }

  return <ColorScreen interval={state.interval} duration={state.duration} />;
};

export default ColorPage;
