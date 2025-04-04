import { useEffect, useState } from "react";

export default function Home() {
  const [jokes, setJokes] = useState<string[]>([]);

  useEffect(() => {
    // Fetch jokes from list.json
    fetch("/path/to/list.json") // Update the path to the correct location of list.json
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>Mine beste jokes</p>
      <ul>
        {jokes.map((joke, index) => (
          <li key={index}>{joke}</li>
        ))}
      </ul>
    </div>
  );
}
