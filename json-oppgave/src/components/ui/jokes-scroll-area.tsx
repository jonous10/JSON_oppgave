import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface JokesScrollAreaProps {
    jokeData: { metadata: string; jokes: { id: string; joke: string; }[]; } | undefined
}

// Get this general structure from Shadcn ui "ScrollAreaDemo()"

export function JokesScrollArea({jokeData}: JokesScrollAreaProps) {
  // Her er mr.scroll area for å displaye jokes. (Jeg vil bruke Engelsk)
  return (
    <ScrollArea className="h-180 w-220 rounded-md border">
      <div className="p-4 ">
        <h4 className="mb-4 text-sm font-medium leading-none">Jokes</h4>
        {jokeData && jokeData.jokes.map((jokeObj, index) => (
          <div key={index} >
            <div className="text-sm p-3">
              {jokeObj.joke}
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
