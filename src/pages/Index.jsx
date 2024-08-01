import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
            <div className="relative w-full h-40 mb-2">
              <img src={animal.image} alt={animal.name} className="mx-auto object-cover w-full h-full rounded-md" />
            </div>
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
