import { createContext, useContext, useState } from 'react';

const GifContext = createContext();

const animalMessages = {
  Sheep: [
    "This adorable sheep reminds me of your gentle and kind nature",
    "Just like this fluffy sheep, you bring warmth and comfort to those around you",
    "This sweet sheep matches your peaceful and caring spirit"
  ],
  Seal: [
    "This playful seal captures your cheerful and bright personality",
    "Like this charming seal, you have a way of making everyone smile",
    "This delightful seal mirrors your fun-loving nature"
  ],
  Otter: [
    "This clever otter reflects your quick wit and bright mind",
    "Just like this joyful otter, you bring happiness wherever you go",
    "This sweet otter matches your playful and caring spirit"
  ],
  Bee: [
    "This busy bee reminds me of your incredible energy and dedication",
    "Like this hardworking bee, you make the world a sweeter place",
    "This little bee represents your productive and helpful nature"
  ],
  Dog: [
    "This loyal dog reflects your faithful and caring heart",
    "Just like this friendly dog, you bring joy to everyone you meet",
    "This loving dog matches your warm and protective nature"
  ],
  Chick: [
    "This tiny chick represents your bright and cheerful spirit",
    "Like this sweet chick, you bring new energy and joy to life",
    "This adorable chick matches your pure and innocent heart"
  ],
  Panda: [
    "This gentle panda reflects your peaceful and sweet nature",
    "Just like this cuddly panda, you have a way of bringing calm to others",
    "This lovely panda represents your unique and special character"
  ],
  Bear: [
    "This strong bear reminds me of your brave and protective spirit",
    "Like this powerful bear, you have both strength and gentleness",
    "This mighty bear matches your courageous and caring nature"
  ],
  Bunny: [
    "This hop-happy bunny reflects your lively and sweet personality",
    "Just like this cute bunny, you bring springtime joy wherever you go",
    "This adorable bunny matches your gentle and kind spirit"
  ],
  Cat: [
    "This graceful cat reminds me of your elegant and independent spirit",
    "Like this charming cat, you have a way of brightening up any room",
    "This lovely cat matches your mysterious and fascinating nature"
  ],
  Penguin: [
    "This charming penguin reflects your playful and social nature",
    "Just like this adorable penguin, you bring joy and laughter to others",
    "This wonderful penguin matches your warm heart and cool personality"
  ]
};

// Custom messages for specific names
const customMessages = {
  'aizel': ["This lovely cat reminds me of your curiosity and cuteness"],
  'janna': ["Like this adorable bunny, you have that active and sweet personality"],
  'mica': ["This fluffy sheep matches your calm and peaceful spirit"],
  'riya': ["This cute sweet bee mirrors your energetic and helpful nature"],
  'loren': ["Like this sweet seal, you have that fun-loving and bright nature"],
  'glenndely': ["This small and adorable penguin mirrors your warm heart and cool caring personality"],
  'askia': ["Like this sweet otter, you combine joy with determination"],
  'keshier': ["Like this awesome dog, you're always there for your bros"],
  'rj': ["This cute awesome bear I see that you have a courageous and caring personality"],
  'francis': ["Like this cool panda, you bring peace and unique fun to your bros"],
  'jeff': ["Like this cool little chick, you have that pure and cheerful personality and bring positive vibes to your bros"]
};

const gifPairs = [
  { card: '/GifCard/sheep.gif', greeting: '/GreetingGif/sheep1.gif', animalName: 'Sheep' },
  { card: '/GifCard/seal.gif', greeting: '/GreetingGif/seal1.gif', animalName: 'Seal' },
  { card: '/GifCard/otter.gif', greeting: '/GreetingGif/otter1.gif', animalName: 'Otter' },
  { card: '/GifCard/bee.gif', greeting: '/GreetingGif/bee1.gif', animalName: 'Bee' },
  { card: '/GifCard/dog.gif', greeting: '/GreetingGif/dog1.gif', animalName: 'Dog' },
  { card: '/GifCard/chick.gif', greeting: '/GreetingGif/chick1.gif', animalName: 'Chick' },
  { card: '/GifCard/panda.gif', greeting: '/GreetingGif/panda1.gif', animalName: 'Panda' },
  { card: '/GifCard/bear.gif', greeting: '/GreetingGif/bear1.gif', animalName: 'Bear' },
  { card: '/GifCard/bunny.gif', greeting: '/GreetingGif/bunny1.gif', animalName: 'Bunny' },
  { card: '/GifCard/cat.gif', greeting: '/GreetingGif/cat1.gif', animalName: 'Cat' },
  { card: '/GifCard/penguin.gif', greeting: '/GreetingGif/penguin1.gif', animalName: 'Penguin' }
];

// Name to animal mapping
const nameToAnimal = {
  'aizel': 'Cat',
  'janna': 'Bunny',
  'mica': 'Sheep',
  'riya': 'Bee',
  'loren': 'Seal',
  'glenndely': 'Penguin',
  'askia': 'Otter',
  'keshier': 'Dog',
  'rj': 'Bear',
  'francis': 'Panda',
  'jeff': 'Chick'
};

export function GifProvider({ children }) {
  const [selectedGifs, setSelectedGifs] = useState(new Map());

  const getGifsForName = (name) => {
    if (selectedGifs.has(name)) {
      return selectedGifs.get(name);
    }

    // Check if there's a specific animal mapping for this name
    const lowercaseName = name.toLowerCase();
    let gifPair;
    let message;

    if (nameToAnimal[lowercaseName]) {
      // Find the gif pair for the mapped animal
      gifPair = gifPairs.find(pair => pair.animalName === nameToAnimal[lowercaseName]);
      
      // Get custom message if it exists, otherwise use default animal messages
      if (customMessages[lowercaseName]) {
        const messages = customMessages[lowercaseName];
        message = messages[Math.floor(Math.random() * messages.length)];
      } else {
        const messages = animalMessages[gifPair.animalName];
        message = messages[Math.floor(Math.random() * messages.length)];
      }
    } else {
      // Use the original random selection for names without specific mapping
      const nameSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
      const randomIndex = nameSum % gifPairs.length;
      gifPair = gifPairs[randomIndex];
      const messages = animalMessages[gifPair.animalName];
      message = messages[Math.floor(Math.random() * messages.length)];
    }
    
    const gifPairWithMessage = {
      ...gifPair,
      message
    };
    
    setSelectedGifs(prev => new Map(prev).set(name, gifPairWithMessage));
    return gifPairWithMessage;
  };

  return (
    <GifContext.Provider value={{ getGifsForName }}>
      {children}
    </GifContext.Provider>
  );
}

export function useGifs() {
  const context = useContext(GifContext);
  if (!context) {
    throw new Error('useGifs must be used within a GifProvider');
  }
  return context;
}