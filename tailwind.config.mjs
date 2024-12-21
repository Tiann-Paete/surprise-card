/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // Existing keyframes from your previous config
        'fade-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'write': {
          '0%': { strokeDashoffset: 1000 },
          '100%': { strokeDashoffset: 0 },
        },
        'writeLetters': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shiftDown': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(2px)' },
          '100%': { transform: 'translateY(0)' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(-50%) rotate(0deg)' },
          '25%': { transform: 'translateX(-50%) rotate(-1deg)' },
          '75%': { transform: 'translateX(-50%) rotate(1deg)' },
        },
        // New keyframes from the last config
        'modal-appear': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'card-reveal': {
          '0%': { transform: 'translate(-50%, 0) scale(0.8)', zIndex: '0' },
          '50%': { transform: 'translate(-50%, -100px) scale(0.95)', zIndex: '5' },
          '100%': { transform: 'translate(-50%, -20px) scale(1)', zIndex: '10' },
        },
        // New keyframes from the added config
        'fadeIn': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'popup': {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        // Existing animations from your previous config
        'fade-in': 'fade-in 1s ease-out',
        'slide-up': 'slide-up 1s ease-out',
        'write': 'write 2s ease-in-out forwards',
        'writeLetters': 'writeLetters 1s ease-out',
        'shiftDown': 'shiftDown 0.5s ease-in-out',
        'shake': 'shake 1s ease-in-out infinite',
        // New animations from the added config
        'modal-appear': 'modal-appear 0.3s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'card-reveal': 'card-reveal 1.2s ease-in-out',
        'reveal': 'fadeIn 0.5s ease-in-out',
        'tree-popup': 'popup 0.5s ease-in-out',
      },
      scale: {
        '60': '0.6',
        '75': '0.75',
      },
      screens: {
        'xs': { 'max': '639px' },
      },
    },
  },
  plugins: [],
};
