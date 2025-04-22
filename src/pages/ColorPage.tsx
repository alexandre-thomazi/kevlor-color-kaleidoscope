
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import ColorScreen from '../components/ColorScreen';

const ColorPage = () => {
  const location = useLocation();
  const state = location.state as { interval: number; duration: number } | null;

  if (!state) {
    return <Navigate to="/" replace />;
  }

  return <ColorScreen interval={state.interval} duration={state.duration} />;
};

export default ColorPage;
