import React from 'react';
import Image from 'next/image';
import { useGifs } from '@/context/GifContext';

const greetings = [
  "May the magic of Christmas fill your heart with joy and your home with love!",
  "Wishing you a season full of sparkle, smiles, and sweet memories!",
  "Wishing you and your family a joyful Christmas, filled with peace, love, and the company of great friends!",
  "Wishing you warmth and cheer in every moment of this Christmas!",
  "Wishing you a cozy Christmas filled with love, laughter, and warmth!"
];

const giftMessages = [
  "I may not have a physical gift to offer, but here's a little surprise that comes straight from the heart — hope you love it!",
  "Though I don't have a tangible gift, this small surprise is wrapped with love and a whole lot of thought. I hope you like it!",
  "I might not have wrapped up any physical shiny gift, but here's something I have made — this little surprise that comes from the heart. hope you love it!"
];

const GreetingCard = ({ isOpen, onClose, receiverName }) => {
  const { getGifsForName } = useGifs();
  const { greeting: gifSrc, animalName, message } = getGifsForName(receiverName || '');
  
  const randomGreeting = React.useMemo(() => 
    greetings[Math.floor(Math.random() * greetings.length)],
    []);

  const randomGiftMessage = React.useMemo(() => 
    giftMessages[Math.floor(Math.random() * giftMessages.length)],
    [receiverName]);

  const modalRef = React.useRef();
  const [isClosing, setIsClosing] = React.useState(false);
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleClickOutside}
    >
      <div 
        ref={modalRef}
        className={`
          bg-[url('/christmas-tree-bg.png')] bg-opacity-10 bg-cover bg-center 
          rounded-xl shadow-2xl overflow-hidden
          transform-gpu transition-all duration-300 ease-in-out
          ${isClosing ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
          w-[90vw] md:w-[1024px]
          max-h-[90vh] md:h-[500px]
        `}
        style={{
          background: `
            linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath d='M50 10 L30 40 L70 40 Z' fill='%23084c2e' opacity='0.1'/%3E%3C/svg%3E")
          `,
          boxShadow: '0 0 20px rgba(0,0,0,0.1), 0 4px 6px -1px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      >
        {/* Mobile Layout */}
        <div className="block md:hidden p-4 space-y-4 overflow-y-auto">
          <div className="relative w-full h-64 rounded-2xl bg-white overflow-hidden shadow-lg">
            <Image
              src={gifSrc}
              alt="Animation"
              layout="fill"
              objectFit="scale-down"
              priority
              className="w-full h-full"
              sizes="100%"
            />
          </div>
          <div className="space-y-3">
            <h2 
              className="text-2xl font-bold text-red-600 animate-reveal"
              style={{ fontFamily: "'Satisfy', cursive" }}
            >
              Merry Christmas {receiverName}!
              <span className="inline-block animate-tree-popup ml-2">🎄</span>
            </h2>
            <p 
              className="text-base text-gray-700 animate-reveal delay-500"
              style={{ fontFamily: "'Delius', cursive" }}
            >
              I have this small gift for you, a cute {animalName}! {message}. {randomGiftMessage}
            </p>

            <p 
              className="text-xl text-gray-800 animate-reveal delay-1000"
              style={{ fontFamily: "'Satisfy', cursive" }}
            >
              "{randomGreeting}"
            </p>
          </div>
        </div>

        {/* Desktop Layout - Unchanged */}
        <div className="hidden md:flex flex-row h-full">
          <div className="w-1/2 p-6 flex items-center justify-center">
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-white shadow-lg">
              <Image
                src={gifSrc}
                alt="Animation"
                layout="fill"
                objectFit="scale-down"
                priority
                className="w-full h-full"
                sizes="100%"
              />
            </div>
          </div>
          <div className="w-1/2 p-8 mt-14 flex flex-col justify-start space-y-6">
            <div className="space-y-6">
              <h2 
                className="text-4xl font-bold text-red-600 animate-reveal"
                style={{ fontFamily: "'Satisfy', cursive" }}
              >
                Merry Christmas {receiverName}!
                <span className="inline-block animate-tree-popup ml-2">🎄</span>
              </h2>
              <p 
                className="text-xl text-gray-700 animate-reveal delay-500"
                style={{ fontFamily: "'Delius', cursive" }}
              >
                I have this small gift for you, a cute {animalName}! {message}. {randomGiftMessage}
              </p>
              <p 
                className="text-2xl text-gray-800 animate-reveal delay-1000"
                style={{ fontFamily: "'Satisfy', cursive" }}
              >
                "{randomGreeting}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingCard;