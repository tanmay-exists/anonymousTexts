'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, ArrowRight } from 'lucide-react'; // Import ArrowRight icon
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import messages from '../../messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Home() {
  return (
    <>
      {/* Main content */}
      <main className="min-h-screen flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-12 text-black bg-neutral-100">
        <section className="text-center mb-8 md:mb-12 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold">
            Dive into the World of Anonymous Messages
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-600">
            Where your identity remains a secret.
          </p>

          {/* CTA Button Section */}
          <div className="mt-8 flex justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="font-semibold px-8 py-6 text-lg shadow-md transition-transform hover:scale-105">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          {/* End CTA Section */}

        </section>

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card className="shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0 text-gray-500" />
                    <div>
                      <p className="text-sm md:text-base">{message.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>
    </>
  );
}
