
import React, { useEffect, useRef } from "react";

const CelestialBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 3; // Taller than viewport to cover full page
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Create stars
    const stars: {x: number, y: number, size: number, pulseFactor: number}[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        pulseFactor: 0.5 + Math.random() * 0.5
      });
    }
    
    // Create constellation lines
    const constellations = [
      [
        { x: canvas.width * 0.2, y: canvas.height * 0.1 },
        { x: canvas.width * 0.25, y: canvas.height * 0.15 },
        { x: canvas.width * 0.3, y: canvas.height * 0.2 },
        { x: canvas.width * 0.35, y: canvas.height * 0.15 },
      ],
      [
        { x: canvas.width * 0.7, y: canvas.height * 0.3 },
        { x: canvas.width * 0.75, y: canvas.height * 0.35 },
        { x: canvas.width * 0.8, y: canvas.height * 0.3 },
        { x: canvas.width * 0.85, y: canvas.height * 0.25 },
      ],
      [
        { x: canvas.width * 0.4, y: canvas.height * 0.6 },
        { x: canvas.width * 0.45, y: canvas.height * 0.65 },
        { x: canvas.width * 0.5, y: canvas.height * 0.7 },
        { x: canvas.width * 0.55, y: canvas.height * 0.65 },
        { x: canvas.width * 0.5, y: canvas.height * 0.6 },
      ]
    ];
    
    // Create circular orbits
    const orbits = [
      { x: canvas.width * 0.2, y: canvas.height * 0.4, radius: 80 },
      { x: canvas.width * 0.8, y: canvas.height * 0.6, radius: 120 },
      { x: canvas.width * 0.5, y: canvas.height * 0.2, radius: 100 }
    ];
    
    // Animation
    let animationFrame: number;
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0F1729');
      gradient.addColorStop(0.5, '#2C1B47');
      gradient.addColorStop(1, '#171530');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars with pulsating effect
      stars.forEach(star => {
        const pulsate = 0.7 + 0.3 * Math.sin((time / 1000) * star.pulseFactor);
        ctx.fillStyle = 'rgba(255, 255, 255, ' + pulsate + ')';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * pulsate, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw constellations
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 0.5;
      
      constellations.forEach(points => {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        
        // Draw constellation points
        points.forEach(point => {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      });
      
      // Draw orbits with moving celestial bodies
      orbits.forEach((orbit, i) => {
        // Draw orbit circle
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.setLineDash([2, 4]);
        ctx.beginPath();
        ctx.arc(orbit.x, orbit.y, orbit.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Draw moving celestial body on the orbit
        const angle = (time / 2000) + (i * Math.PI / 2);
        const x = orbit.x + Math.cos(angle) * orbit.radius;
        const y = orbit.y + Math.sin(angle) * orbit.radius;
        
        // Glow effect
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 12);
        glow.addColorStop(0, 'rgba(212, 175, 55, 0.8)');
        glow.addColorStop(1, 'rgba(212, 175, 55, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // Planet
        ctx.fillStyle = i === 0 ? '#D4AF37' : i === 1 ? '#CCBCDB' : '#FFBF00';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
      style={{ minHeight: '300vh' }} // Make sure it covers the entire page
    />
  );
};

export default CelestialBackground;
