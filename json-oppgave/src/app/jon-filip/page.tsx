"use client"

import Header from "@/components/ui/header";
import { JokesScrollArea } from "@/components/ui/jokes-scroll-area";
// Removed unused Image import
import { useState } from "react";
import data from "@/app/jon-filip/jokes.json"
import { Button } from "@/components/ui/button";
import { AvatarDemo } from "@/components/ui/profile";

// If you see this you are GAY

export default function Home() {
  const [randomJoke, setRandomJoke] = useState<{ id: string; joke: string } | null>(null);
  function updateRandomJoke() {
    let newJoke;
    do {
      const randomInt = Math.floor(Math.random() * data.jokes.length);
      newJoke = data.jokes[randomInt];
    } while (newJoke && randomJoke && newJoke.id === randomJoke.id);
    setRandomJoke(newJoke);
  }
  return (
    <div>
      <Header/>
      <AvatarDemo/>
      
      <Button
      onClick={updateRandomJoke}
      >Get Random Joke</Button>
      <div className="justify-center items-center flex p-40">
        <p>Random Joke : {randomJoke ? randomJoke.joke : "No joke selected"}</p>
      </div>
      <div className="justify-center items-center flex p-40">
        <JokesScrollArea jokeData={data}/>
      </div>
    </div>
  );
}
