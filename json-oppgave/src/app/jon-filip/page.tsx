import Header from "@/components/ui/header";
import { JokesScrollArea } from "@/components/ui/jokes-scroll-area";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
    const [data, setData] = useState<{metadata: string, jokes: [any]}>()
  return (
    <div className="">
      <Header/>
      <JokesScrollArea jokeData={data}/>
    </div>
  );
}
