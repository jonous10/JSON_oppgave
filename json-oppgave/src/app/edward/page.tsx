"use client";

import { useEffect, useState } from "react";
import Header from "@/components/ui/header";
import list from "@/app/edward/list.json"; // Import JSON-filen med vitsene

export default function Home() {
  const [jokes, setJokes] = useState<{}>([]);

  useEffect(() => {
    // Sett vitsene fra JSON-filen i state
    setJokes(list);
  }, []);

  return (
    <div className="">
      <Header />
      <p>Mine beste jokes</p>
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