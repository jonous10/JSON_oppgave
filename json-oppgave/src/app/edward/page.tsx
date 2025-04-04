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
      <div className="justify-center flex flex-col items-center">
        <JokeShow jokeData={list}  />
      </div>
    </div>
  );
}