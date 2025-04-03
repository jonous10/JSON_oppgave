import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface JokesScrollAreaProps {
    jokeData: {"metadata": string, jokes: [any]} | undefined
}

export function JokesScrollArea({jokeData}: JokesScrollAreaProps) {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {jokeData && jokeData.jokes.map((jokeObj: {id: number, joke: string}, index) => (
          <>
            <div key={index} className="text-sm">
              {jokeObj.joke}
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  )
}
