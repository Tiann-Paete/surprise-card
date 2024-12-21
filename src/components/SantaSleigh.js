import React from 'react';
import Image from 'next/image';

const SantaSleigh = ({ isVisible }) => {
  return (
    <div 
      className={`
        absolute 
        top-20
        md:top-32 
        right-0
        w-40 
        h-20 
        transform
        ${isVisible ? 'animate-santa-flight' : 'opacity-0'}
        pointer-events-none
        z-10
      `}
    >
      {/* Ho Ho Ho Text */}
      {isVisible && (
        <div 
          className={`
            absolute 
            -top-6
            right-0
            text-lg
            md:text-xl
            font-bold
            text-white
            animate-hohoho
            opacity-0
            font-satisfy
          `}
        >
          Ho ho ho!
        </div>
      )}

      {/* Magical Star Trail */}
      <div className="absolute right-0 top-1/2 w-full h-4">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              right: `${i * 12}px`,
              top: `${Math.sin(i * 0.5) * 10}px`,
              transform: 'translate(50%, -50%)'
            }}
          >
            <div
              className={`
                w-1
                md:w-1.5
                h-1
                md:h-1.5
                rounded-full
                bg-yellow-500
                animate-star-trail
                opacity-0
              `}
              style={{
                animationDelay: `${i * 0.05}s`
              }}
            />
          </div>
        ))}
      </div>

      {/* Sparkle Effects */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className={`
              absolute
              w-0.5
              md:w-1
              h-0.5
              md:h-1
              bg-yellow-500
              rounded-full
              animate-sparkle
            `}
            style={{
              top: `${Math.random() * 100}%`,
              right: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 1}s`
            }}
          />
        ))}
      </div>

      {/* Santa Image */}
      <div className="relative w-full h-full">
        <Image
          src="/Santa/santa3.png"
          alt="Santa Sleigh"
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
    </div>
  );
};

export default SantaSleigh;