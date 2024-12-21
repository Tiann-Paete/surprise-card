import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import GifCard from '../components/GifCard';
import GreetingCard from '../components/GreetingCard';
import SantaSleigh from '../components/SantaSleigh';

const Surprise = () => {
  const router = useRouter();
  const { name } = router.query;
  
  const [isOpen, setIsOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showGreetingModal, setShowGreetingModal] = useState(false);
  const [showSanta, setShowSanta] = useState(false);

  
  const handleBoxClick = () => {
    if (!isOpen) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setTimeout(() => {
          setIsOpen(true);
          // Add small delay before Santa appears
          setTimeout(() => {
            setShowSanta(true);
          }, 50);
        }, 300);
      }, 600);
    }
  };

  const handleGifCardClick = () => {
    setShowGreetingModal(true);
  };

  // Memoize stars and snowflakes so they don't re-render
  const stars = useMemo(() => 
    Array.from({ length: 100 }).map((_, index) => ({
      id: `star-${index}`,
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 70}%`,
      opacity: Math.random() * 0.8 + 0.2,
      delay: `${Math.random() * 3}s`
    })), []
  );

  const snowflakes = useMemo(() => 
    Array.from({ length: 50 }).map((_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * -100}%`,
      delay: `${Math.random() * 0.5}s`,
      opacity: Math.random() * 0.8 + 0.2,
      type: index % 3
    })), []
  );
  
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Night sky background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128] via-[#1c2951] to-[#2a4177]">
        {/* Stars container */}
        <div className="absolute inset-0">
          {stars.map(star => (
            <div
              key={star.id}
              className="absolute rounded-full animate-twinkle"
              style={{
                width: `${star.width}px`,
                height: `${star.height}px`,
                backgroundColor: 'white',
                left: star.left,
                top: star.top,
                opacity: star.opacity,
                animationDelay: star.delay,
              }}
            />
          ))}
        </div>
        
        {/* Northern lights effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-emerald-900/5 to-transparent" />
      </div>

      {/* Snow container */}
      <div className="absolute inset-0 pointer-events-none">
        {snowflakes.map(snowflake => (
          <div
            key={snowflake.id}
            className={`absolute w-2 h-2 bg-white rounded-full animate-snowfall-${snowflake.type}`}
            style={{
              left: snowflake.left,
              top: snowflake.top,
              animationDelay: snowflake.delay,
              opacity: snowflake.opacity
            }}
          />
        ))}
      </div>
      
      {/* Moonlight glow overlay */}
      <div className="absolute inset-0 bg-blue-100/5" />

      {/* Snow landscape with increased height */}
      <div className="absolute bottom-0 w-full">
        {/* Snow hills with increased height */}
        <div className="relative w-full">
          {/* Back hill - tallest */}
          <div className="absolute bottom-0 w-max h-[15rem] bg-gradient-to-t from-white to-white/90  transform scale-110 translate-y-40" />
          
          {/* Middle hill */}
          <div className="absolute bottom-0 w-max h-[15rem] bg-gradient-to-t from-white to-white/95  transform scale-105 translate-y-32" />
          
          {/* Front hill - main snow ground */}
          <div className="absolute bottom-0 w-full h-80 bg-white translate-y-24" />
          
          {/* Snow texture overlay */}
          <div className="absolute bottom-0 w-full h-72 bg-white translate-y-24" />
        </div>
      </div>
      
        {/* Gift box container */}
        <div 
        className="relative w-72 h-72 cursor-pointer -mb-40"
        onClick={handleBoxClick}
      >
        {/* Gift Box Container */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-56 drop-shadow-2xl">
          <Image
            src="/BoxImage/giftbox.png"
            alt="Gift Box"
            layout="fill"
            objectFit="contain"
            priority
            className="object-bottom"
          />
        </div>

        {/* Gift Box Lid */}
        <div 
          className={`absolute bottom-32 left-1/2 w-64 h-24 transform ${
            isOpen 
              ? 'rotating'
              : '-translate-x-1/2'
          } ${isShaking ? 'animate-shake' : ''} ${
            isOpen && !isShaking ? 'rotated' : ''
          }`}
        >
          <Image
            src="/BoxImage/giftboxlid.png"
            alt="Gift Box Lid"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>

        {/* GifCard Component */}
        <GifCard 
          isVisible={isOpen} 
          onClick={handleGifCardClick}
        />
      </div>

      {/* GreetingCard Modal */}
      <GreetingCard
        isOpen={showGreetingModal}
        onClose={() => setShowGreetingModal(false)}
        receiverName={name}
      />
      {/* Santa Sleigh */}
<SantaSleigh isVisible={showSanta} />
    </div>
  );
};

export default Surprise;