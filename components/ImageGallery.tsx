'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
    caption?: string;
  }>;
  title?: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-slate-900 mb-6">{title || 'Gallery'}</h2>
      
      {/* Main Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl mb-4">
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
          className="object-cover"
          priority={currentIndex === 0}
          unoptimized
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full shadow-lg transition-colors"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full shadow-lg transition-colors"
              aria-label="Next image"
            >
              →
            </button>
          </>
        )}
        
        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={image.src}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-lg transition-opacity ${
                index === currentIndex ? 'ring-2 ring-brand-emerald' : 'hover:opacity-80'
              }`}
            >
              <Image 
                src={image.src} 
                alt={image.alt} 
                fill 
                sizes="(max-width: 768px) 25vw, 16vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Caption */}
      {images[currentIndex].caption && (
        <p className="text-sm text-slate-600 mt-2 text-center">
          {images[currentIndex].caption}
        </p>
      )}
    </section>
  );
}
