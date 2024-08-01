import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <h1 className="text-3xl font-bold text-center mb-6">Animal World</h1>
      
      <Tabs defaultValue="game" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="game">Animal Game</TabsTrigger>
          <TabsTrigger value="info">Animal Info</TabsTrigger>
        </TabsList>
        <TabsContent value="game">
          <div className="py-4">
            <p className="text-xl text-center mb-4">Score: {score}</p>
            <p className="text-2xl text-center mb-6">Select the {correctAnimal?.name}</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {currentAnimals.map((animal, index) => (
                <Card key={index} className="p-4 cursor-pointer hover:bg-gray-100" onClick={() => handleAnimalClick(animal)}>
                  <div className="relative w-full h-40">
                    <img src={animal.image} alt={animal.name} className="mx-auto object-cover w-full h-full rounded-md" />
                  </div>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button onClick={startNewRound}>Next Round</Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="info">
          <Tabs defaultValue="cow">
            <TabsList className="mb-4">
              {animals.map((animal) => (
                <TabsTrigger key={animal.name} value={animal.name.toLowerCase()}>{animal.name}</TabsTrigger>
              ))}
            </TabsList>
            {animals.map((animal) => (
              <TabsContent key={animal.name} value={animal.name.toLowerCase()}>
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-4">{animal.name}</h2>
                  <div className="relative w-full h-64 mb-4">
                    <img src={animal.image} alt={animal.name} className="mx-auto object-cover w-full h-full rounded-md" />
                  </div>
                  <p className="text-gray-700">
                    {getAnimalInfo(animal.name)}
                  </p>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const getAnimalInfo = (animalName) => {
  const info = {
    Cow: "Cows are domesticated cattle known for producing milk and meat. They are herbivores and have a complex digestive system with four stomachs.",
    Dog: "Dogs are domesticated descendants of wolves and are often referred to as 'man's best friend'. They come in various breeds and are known for their loyalty and companionship.",
    Cat: "Cats are small carnivorous mammals that have been popular household pets for thousands of years. They are known for their independent nature and hunting skills.",
    Horse: "Horses are large domesticated mammals used for transportation, sport, and work. They are herbivores and have been closely associated with human civilization for millennia.",
    Pig: "Pigs are intelligent omnivorous mammals domesticated for meat production. They are known for their problem-solving abilities and social behavior.",
    Sheep: "Sheep are domesticated ruminants raised for their wool, meat, and milk. They are known for their flocking behavior and have been important to human societies for centuries.",
    Chicken: "Chickens are domesticated birds raised for their eggs and meat. They are omnivores and are the most common type of poultry in the world.",
    Duck: "Ducks are waterfowl birds known for their waterproof feathers and webbed feet. They can be found in both fresh and saltwater environments and are popular in many cuisines.",
  };
  return info[animalName] || "Information not available.";
};

export default Index;
