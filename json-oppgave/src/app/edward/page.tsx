import { useEffect, useState } from "react";
import Header from "@/components/ui/header";

export default function Home() {
  const [jokes, setJokes] = useState<string[]>([]);

  useEffect(() => {
    // Fetch jokes from list.json
    fetch("/path/to/list.json") // Replace with the correct path to your list.json file
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch jokes");
        }
        return response.json();
      })
      .then((data) => setJokes(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="">
      <Header />
      <p>Mine beste jokes</p>
      <ul>
        {jokes.map((joke, index) => (
          <li key={index}>{joke}</li>
        ))}
      </ul>
    </div>
  );
}