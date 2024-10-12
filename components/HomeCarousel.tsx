"use client"

import * as React from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const carouselItems = [
  {
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&h=400&fit=crop",
    title: "Delicious Cuisine",
    description: "Explore our wide variety of mouthwatering dishes"
  },
  {
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&h=400&fit=crop",
    title: "Cozy Atmosphere",
    description: "Enjoy your meal in our warm and inviting restaurant"
  },
  {
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&h=400&fit=crop",
    title: "Fresh Ingredients",
    description: "We use only the finest, locally-sourced ingredients"
  }
]

export function HomeCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full p-4"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {carouselItems.map((item, index) => (
          <CarouselItem key={index}>
            <Card className="border-0 rounded-lg overflow-hidden">
              <CardContent className="flex aspect-[4/1] items-center justify-center p-0 relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4">
                  <h2 className="text-4xl font-bold mb-2">{item.title}</h2>
                  <p className="text-xl text-center">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}