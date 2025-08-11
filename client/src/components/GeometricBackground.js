import React from 'react';

const GeometricBackground = () => {
  return (
    <div className="geometric-bg">
      {/* Squid Game Symbols scattered across the background */}
      <div className="geometric-shape shape-circle parallax-element" style={{
        top: '10%',
        left: '10%',
        animationDelay: '0s'
      }}></div>
      
      <div className="geometric-shape shape-triangle parallax-element" style={{
        top: '20%',
        right: '15%',
        animationDelay: '2s'
      }}></div>
      
      <div className="geometric-shape shape-square parallax-element" style={{
        top: '40%',
        left: '5%',
        animationDelay: '4s'
      }}></div>
      
      <div className="geometric-shape shape-circle parallax-element" style={{
        top: '60%',
        right: '20%',
        animationDelay: '1s'
      }}></div>
      
      <div className="geometric-shape shape-triangle parallax-element" style={{
        top: '70%',
        left: '80%',
        animationDelay: '3s'
      }}></div>
      
      <div className="geometric-shape shape-square parallax-element" style={{
        top: '85%',
        right: '10%',
        animationDelay: '5s'
      }}></div>
      
      <div className="geometric-shape shape-circle parallax-element" style={{
        top: '30%',
        left: '70%',
        animationDelay: '1.5s'
      }}></div>
      
      <div className="geometric-shape shape-triangle parallax-element" style={{
        top: '50%',
        right: '50%',
        animationDelay: '2.5s'
      }}></div>
      
      <div className="geometric-shape shape-square parallax-element" style={{
        top: '15%',
        left: '50%',
        animationDelay: '3.5s'
      }}></div>
      
      <div className="geometric-shape shape-circle parallax-element" style={{
        top: '80%',
        left: '30%',
        animationDelay: '4.5s'
      }}></div>
    </div>
  );
};

export default GeometricBackground;