import React from 'react';
import Image from 'next/image';
import { useGifs } from '@/context/GifContext';
import { useRouter } from 'next/router';

const GifCard = ({ isVisible, onClick }) => {
  const router = useRouter();
  const { name } = router.query;
  const { getGifsForName } = useGifs();
  
  if (!isVisible) return null;
  
  const { card: gifSrc } = getGifsForName(name || '');

  return (
    <div 
      className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer animate-card-reveal animate-bounce-slow hover:scale-105 transition-transform"
      onClick={onClick}
    >
      <div className="relative w-full h-full">
        <Image
          src={gifSrc}
          alt="Holiday Gift Card"
          layout="fill"
          objectFit="scale-down"
          priority
          className="w-full h-full"
          sizes="100%"
        />
      </div>
    </div>
  );
};

export default GifCard;