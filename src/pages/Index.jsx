import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const animals = [
  { name: 'Cow', image: '/placeholder.svg' },
  { name: 'Dog', image: '/placeholder.svg' },
  { name: 'Cat', image: '/placeholder.svg' },
  { name: 'Horse', image: '/placeholder.svg' },
  { name: 'Pig', image: '/placeholder.svg' },
  { name: 'Sheep', image: '/placeholder.svg' },
  { name: 'Chicken', image: '/placeholder.svg' },
  { name: 'Duck', image: '/placeholder.svg' },
];

const Index = () => {
  const [score, setScore] = useState(0);
  const [currentAnimals, setCurrentAnimals] = useState([]);
  const [correctAnimal, setCorrectAnimal] = useState(null);

  const selectRandomAnimals = () => {
    const shuffled = [...animals].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  };

  const startNewRound = () => {
    const newAnimals = selectRandomAnimals();
    setCurrentAnimals(newAnimals);
    setCorrectAnimal(newAnimals[Math.floor(Math.random() * newAnimals.length)]);
  };

  useEffect(() => {
    startNewRound();
  }, []);

  const handleAnimalClick = (animal) => {
    if (animal.name === correctAnimal.name) {
      setScore(score + 1);
    }
    startNewRound();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Animal Selection Game</h1>
      <p className="text-xl text-center mb-8">Score: {score}</p>
      <p className="text-2xl text-center mb-6">Select the {correctAnimal?.name}</p>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {currentAnimals.map((animal, index) => (
          <Card key={index} className="p-4 cursor-pointer hover:bg-gray-100" onClick={() => handleAnimalClick(animal)}>
            <img src={animal.image} alt={animal.name} className="mx-auto object-cover w-full h-40 mb-2" />
            <p className="text-center font-semibold">{animal.name}</p>
          </Card>
        ))}
      </div>
      <div className="text-center">
        <Button onClick={startNewRound}>Next Round</Button>
      </div>
    </div>
  );
};

export default Index;
