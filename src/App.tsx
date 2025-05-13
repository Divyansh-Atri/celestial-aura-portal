
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from "sonner";
import Index from './pages/Index';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-celestial-stardust text-lg">Loading cosmic elements...</div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" richColors />
    </Router>
  );
};

export default App;
