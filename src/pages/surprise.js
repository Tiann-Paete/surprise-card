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
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128] via-[#1c2951] to-[#2a4177]">
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
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-emerald-900/5 to-transparent" />
      </div>

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
      
      <div className="absolute inset-0 bg-blue-100/5" />

      <div className="absolute bottom-0 w-full">
        <div className="relative w-full">
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-white to-white/90 md:h-[20rem] h-[18rem] md:rounded-[30%] transform scale-110 md:translate-y-40 translate-y-20" />
          
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-white to-white/95 md:h-[20rem] h-[16rem] md:rounded-[20%]  transform scale-105 md:translate-y-32 translate-y-16" />
          
          <div className="absolute bottom-0 w-full md:h-96 h-48 bg-white md:rounded-[70%] md:translate-y-24 translate-y-12" />
          
          <div className="absolute bottom-0 w-full md:h-96 h-48 bg-gradient-to-b from-transparent to-blue-100/20 md:translate-y-24 translate-y-12" />
        </div>
      </div>
      
      <div 
        className="relative w-72 h-72 cursor-pointer md:-mb-40 -mb-20"
        onClick={handleBoxClick}
      >
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

        <GifCard 
          isVisible={isOpen} 
          onClick={handleGifCardClick}
        />
      </div>

      <GreetingCard
        isOpen={showGreetingModal}
        onClose={() => setShowGreetingModal(false)}
        receiverName={name}
      />

      <SantaSleigh isVisible={showSanta} />
    </div>
  );
};

export default Surprise;