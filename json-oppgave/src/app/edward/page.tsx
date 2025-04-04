"use client";

import { useEffect, useState } from "react";
import Header from "@/components/ui/header";
import list from "@/app/edward/list.json"; // Import JSON-filen med vitsene
import { Button } from "@/components/ui/button";
import { AvatarDemo } from "@/components/ui/profile";

export default function Home() {
  const [jokes, setJokes] = useState<{}>([]); // State for å lagre vitsene

  useEffect(() => {
    // Sett vitsene fra JSON-filen i state
    setJokes(list); 
  }, []); 

  return ( 
    <div className=""> 
      <Header />
      <AvatarDemo />
      <p>Mine beste jokes</p>
      <Button>hawk</Button>
      <div>
        {Object.entries(jokes).map(([key, value]: any) => (  
          <div key={key} className="flex flex-col items-center justify-center p-4"> 
            <h2 className="text-2xl font-bold">{key}</h2>  
            <p className="text-lg">{value}</p>  
          </div>  
        ))}  
      </div>
    </div>
  );
}