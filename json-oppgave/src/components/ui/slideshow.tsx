import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface CarouselDemoProps {
    jokeData: {id: number, joke: string}[]
}
export function JokeShow({ jokeData }: CarouselDemoProps) {
  return (
    <Carousel className="w-full max-w-1/3">
      <CarouselContent>
        {jokeData.map((jokeObj, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{jokeObj.id}</span>
                  <p>{jokeObj.joke}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
