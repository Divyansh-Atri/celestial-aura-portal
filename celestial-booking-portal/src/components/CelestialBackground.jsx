
import React from 'react';

const CelestialBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Sun */}
      <div className="absolute w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full animate-spin-slow top-20 right-20 shadow-lg shadow-yellow-300/30" 
           style={{ animationDuration: '20s' }} />

      {/* Moon */}
      <div className="absolute w-12 h-12 bg-gradient-to-br from-slate-200 to-slate-400 rounded-full animate-bounce top-32 left-20 shadow-lg shadow-slate-300/30"
           style={{ animationDuration: '4s' }} />

      {/* Planets */}
      <div className="absolute w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full animate-pulse top-60 right-40 shadow-lg shadow-red-400/30"
           style={{ animationDuration: '2s' }} />
      
      <div className="absolute w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full animate-bounce bottom-40 left-40 shadow-lg shadow-blue-400/30"
           style={{ animationDuration: '3s' }} />

      <div className="absolute w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full animate-pulse bottom-20 right-60 shadow-lg shadow-purple-400/30"
           style={{ animationDuration: '2.5s' }} />

      {/* Floating orbital paths */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/10 rounded-full animate-spin"
           style={{ animationDuration: '30s' }}>
        <div className="absolute w-4 h-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full -top-2 left-1/2 transform -translate-x-1/2 shadow-lg shadow-green-400/30" />
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/5 rounded-full animate-spin"
           style={{ animationDuration: '25s' }}>
        <div className="absolute w-3 h-3 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full -top-1.5 left-1/2 transform -translate-x-1/2 shadow-lg shadow-pink-400/30" />
      </div>
    </div>
  );
};

export default CelestialBackground;
