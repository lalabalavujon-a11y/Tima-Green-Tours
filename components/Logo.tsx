"use client";

import Image from 'next/image';
import { useState } from 'react';

interface LogoProps {
  className?: string;
  alt?: string;
  sizes?: string;
}

export default function Logo({ className, alt = 'Tima Green Tours', sizes = '40px' }: LogoProps) {
  const [src, setSrc] = useState<string>('/logo.png');
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        width={40}
        height={40}
        className="object-contain"
        unoptimized
        onError={() => setSrc('/logo-192.png')}
      />
    </div>
  );
}


