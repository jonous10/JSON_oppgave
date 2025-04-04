"use client"

import Header from "@/components/ui/header";
import { JokesScrollArea } from "@/components/ui/jokes-scroll-area";
import Image from "next/image";
import { useState } from "react";
import data from "@/app/jon-filip/jokes.json"



export default function Home() {
  return (
    <div>
      <Header/>
      <div className="justify-center items-center flex p-40">
        <JokesScrollArea jokeData={data}/>
      </div>
    </div>
  );
}
