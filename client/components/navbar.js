import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-background/80 backdrop-blur-md text-text p-4 flex justify-between items-center shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Review Pulse
          </span>
        </div>
        <div className="flex space-x-8 items-center">
          <a 
            href="/" 
            className="relative group transition-all duration-300 ease-in-out"
          >
            <span className="text-text group-hover:text-primary">Home</span>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-primary"></span>
          </a>
          <a 
            href="/analyzer" 
            className="relative group transition-all duration-300 ease-in-out"
          >
            <span className="text-text group-hover:text-primary">Analyzer</span>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-primary"></span>
          </a>
          <a 
            href="/info" 
            className="relative group transition-all duration-300 ease-in-out"
          >
            <span className="text-text group-hover:text-primary">Information</span>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-primary"></span>
          </a>
        </div>
      </div>
    </nav>
  );
}