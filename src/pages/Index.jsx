import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const animals = [
  { name: 'Cow', image: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Cow_female_black_white.jpg' },
  { name: 'Dog', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Labrador_on_Quantock_%282175262184%29.jpg/640px-Labrador_on_Quantock_%282175262184%29.jpg' },
  { name: 'Cat', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/640px-Cat03.jpg' },
  { name: 'Horse', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Nokota_Horses_cropped.jpg/640px-Nokota_Horses_cropped.jpg' },
  { name: 'Pig', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Pink_pig_sus_scrofa_domesticus_2.jpg/640px-Pink_pig_sus_scrofa_domesticus_2.jpg' },
  { name: 'Sheep', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flock_of_sheep.jpg/640px-Flock_of_sheep.jpg' },
  { name: 'Chicken', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/%E0%B0%95%E0%B1%8B%E0%B0%A1%E0%B0%BF_%E0%B0%AA%E0%B0%BF%E0%B0%B2%E0%B1%8D%E0%B0%B2IMG20191207080730-01.jpg/640px-%E0%B0%95%E0%B1%8B%E0%B0%A1%E0%B0%BF_%E0%B0%AA%E0%B0%BF%E0%B0%B2%E0%B1%8D%E0%B0%B2IMG20191207080730-01.jpg' },
  { name: 'Duck', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Bucephala-albeola-010.jpg/640px-Bucephala-albeola-010.jpg' },
];

const colors = [
  { name: 'Red', hex: '#FF0000' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Green', hex: '#00FF00' },
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Orange', hex: '#FFA500' },
  { name: 'Pink', hex: '#FFC0CB' },
  { name: 'Brown', hex: '#A52A2A' },
];

const Index = () => {
  const [gameMode, setGameMode] = useState('animal');
  const [score, setScore] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [correctItem, setCorrectItem] = useState(null);

  const selectRandomItems = () => {
    const items = gameMode === 'animal' ? animals : colors;
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  const startNewRound = () => {
    const newItems = selectRandomItems();
    setCurrentItems(newItems);
    setCorrectItem(newItems[Math.floor(Math.random() * newItems.length)]);
  };

  useEffect(() => {
    startNewRound();
  }, [gameMode]);

  const handleItemClick = (item) => {
    if (item.name === correctItem.name) {
      setScore(score + 1);
    }
    startNewRound();
  };

  const handleGameModeChange = (value) => {
    setGameMode(value);
    setScore(0);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Game World</h1>
      
      <Tabs defaultValue="game" className="mb-8 space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="game">Game</TabsTrigger>
          <TabsTrigger value="info">Info</TabsTrigger>
        </TabsList>
        <TabsContent value="game">
          <div className="py-4 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
              <p className="text-2xl font-semibold">Score: {score}</p>
              <Select onValueChange={handleGameModeChange} defaultValue={gameMode}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select game mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="animal">Animal Game</SelectItem>
                  <SelectItem value="color">Color Game</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-3xl text-center mb-6">Select the {correctItem?.name}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {currentItems.map((item, index) => (
                <Card key={index} className="p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200" onClick={() => handleItemClick(item)}>
                  {gameMode === 'animal' ? (
                    <div className="relative w-full h-48 md:h-60">
                      <img src={item.image} alt={item.name} className="mx-auto object-cover w-full h-full rounded-md" />
                    </div>
                  ) : (
                    <div className="w-full h-48 md:h-60 rounded-md" style={{ backgroundColor: item.hex }}></div>
                  )}
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button onClick={startNewRound} size="lg" className="text-lg px-8 py-2">Next Round</Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="info">
          <Tabs defaultValue="cow" className="space-y-6">
            <TabsList className="mb-4 flex flex-wrap justify-center gap-2">
              {animals.map((animal) => (
                <TabsTrigger key={animal.name} value={animal.name.toLowerCase()} className="px-4 py-2">{animal.name}</TabsTrigger>
              ))}
            </TabsList>
            {animals.map((animal) => (
              <TabsContent key={animal.name} value={animal.name.toLowerCase()}>
                <Card className="p-6 md:p-8">
                  <h2 className="text-3xl font-bold mb-6">{animal.name}</h2>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                      <img src={animal.image} alt={animal.name} className="mx-auto object-cover w-full h-full rounded-md" />
                    </div>
                    <p className="text-gray-700 md:w-1/2 text-lg">
                      {getItemInfo(animal.name)}
                    </p>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const getItemInfo = (itemName) => {
  const animalInfo = {
    Cow: "Cows are domesticated cattle known for producing milk and meat. They are herbivores and have a complex digestive system with four stomachs.",
    Dog: "Dogs are domesticated descendants of wolves and are often referred to as 'man's best friend'. They come in various breeds and are known for their loyalty and companionship.",
    Cat: "Cats are small carnivorous mammals that have been popular household pets for thousands of years. They are known for their independent nature and hunting skills.",
    Horse: "Horses are large domesticated mammals used for transportation, sport, and work. They are herbivores and have been closely associated with human civilization for millennia.",
    Pig: "Pigs are intelligent omnivorous mammals domesticated for meat production. They are known for their problem-solving abilities and social behavior.",
    Sheep: "Sheep are domesticated ruminants raised for their wool, meat, and milk. They are known for their flocking behavior and have been important to human societies for centuries.",
    Chicken: "Chickens are domesticated birds raised for their eggs and meat. They are omnivores and are the most common type of poultry in the world.",
    Duck: "Ducks are waterfowl birds known for their waterproof feathers and webbed feet. They can be found in both fresh and saltwater environments and are popular in many cuisines.",
  };

  const colorInfo = {
    Red: "Red is a primary color associated with energy, passion, and excitement. It's often used to grab attention and create a sense of urgency.",
    Blue: "Blue is a primary color that symbolizes trust, calmness, and stability. It's widely used in corporate designs and is known to have a soothing effect.",
    Green: "Green is a secondary color that represents nature, growth, and harmony. It's often associated with environmental causes and health.",
    Yellow: "Yellow is a primary color that signifies happiness, optimism, and creativity. It's attention-grabbing and is often used in warning signs.",
    Purple: "Purple is a secondary color that symbolizes royalty, luxury, and creativity. It's often associated with wisdom and spirituality.",
    Orange: "Orange is a secondary color that combines the energy of red and the happiness of yellow. It's associated with enthusiasm, adventure, and confidence.",
    Pink: "Pink is a tint of red that is often associated with femininity, love, and compassion. It can have a calming effect and is used to represent caring and nurturing.",
    Brown: "Brown is a composite color that represents earthiness, stability, and reliability. It's often associated with nature and can create a sense of warmth and comfort.",
  };

  return animalInfo[itemName] || colorInfo[itemName] || "Information not available.";
};

export default Index;
