"use client";

import { useEffect, useState } from "react";
import Header from "@/components/ui/header";
import list from "@/app/edward/list.json"; // Import JSON-filen med vitsene
import { Button } from "@/components/ui/button";
import { AvatarDemo } from "@/components/ui/profile";
import { JokeShow } from "@/components/ui/slideshow";

export default function Home() {

  return ( 
    <div className=""> 
      <Header />
      <p>Mine beste jokes</p>
      <div className="justify-center flex flex-col items-center">
        <JokeShow jokeData={list}  />
      </div>
      <div>
        {list.map((jokeObj: {id: number, joke: string}, index: number) => (  
          <div key={index} className="flex flex-col items-center justify-center p-4"> 
            <h2 className="text-2xl font-bold">{jokeObj.id}</h2>  
            <p className="text-lg">{jokeObj.joke}</p>  
          </div>  
        ))}  
      </div>
    </div>
  );
}