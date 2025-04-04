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
        jokeData: {joke: string}[]
}

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function JokeShow({ jokeData }: CarouselDemoProps) {
    const shuffledJokes = shuffleArray(jokeData);

    return (
        <Carousel className="w-full max-w-1/2">
            <CarouselContent>
                {shuffledJokes.map((jokeObj, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                                    <p className="text-5xl">{jokeObj.joke}</p>
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
