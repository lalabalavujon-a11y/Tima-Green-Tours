// Photography management system for Tima Green Tours
// Handles image optimization, metadata, and consent tracking

export interface PhotoMetadata {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  location: string;
  photographer: string;
  dateTaken: string;
  consentRef?: string;
  tags: string[];
  tourSlug?: string;
}

// Sample photography data - replace with real images
export const tourPhotos: Record<string, PhotoMetadata[]> = {
  'biausevu-waterfall-tour': [
    {
      id: 'bw-001',
      src: '/photos/biausevu/waterfall-main.jpg',
      alt: 'Biausevu Waterfall cascading into natural pool',
      width: 2400,
      height: 1350,
      caption: 'The majestic Biausevu Waterfall - a perfect spot for swimming and photography',
      location: 'Biausevu Village, Sigatoka',
      photographer: 'Tima Green Tours',
      dateTaken: '2024-01-15',
      tags: ['waterfall', 'swimming', 'nature', 'sigatoka'],
      tourSlug: 'biausevu-waterfall-tour'
    },
    {
      id: 'bw-002',
      src: '/photos/biausevu/village-welcome.jpg',
      alt: 'Traditional Fijian village welcome ceremony',
      width: 2400,
      height: 1350,
      caption: 'Guests receiving traditional welcome at Biausevu Village',
      location: 'Biausevu Village, Sigatoka',
      photographer: 'Tima Green Tours',
      dateTaken: '2024-01-15',
      consentRef: 'CONSENT-2024-001',
      tags: ['village', 'culture', 'welcome', 'traditional'],
      tourSlug: 'biausevu-waterfall-tour'
    },
    {
      id: 'bw-003',
      src: '/photos/biausevu/kava-ceremony.jpg',
      alt: 'Traditional kava ceremony with village elders',
      width: 2400,
      height: 1350,
      caption: 'Participating in the sacred kava ceremony with village elders',
      location: 'Biausevu Village, Sigatoka',
      photographer: 'Tima Green Tours',
      dateTaken: '2024-01-15',
      consentRef: 'CONSENT-2024-002',
      tags: ['kava', 'ceremony', 'culture', 'elders'],
      tourSlug: 'biausevu-waterfall-tour'
    }
  ],
  'sigatoka-valley-lawai-pottery': [
    {
      id: 'sv-001',
      src: '/photos/sigatoka/valley-scenic.jpg',
      alt: 'Scenic view of Sigatoka Valley known as the Salad Bowl of Fiji',
      width: 2400,
      height: 1350,
      caption: 'The lush Sigatoka Valley - Fiji\'s agricultural heartland',
      location: 'Sigatoka Valley, Coral Coast',
      photographer: 'Tima Green Tours',
      dateTaken: '2024-02-10',
      tags: ['valley', 'scenic', 'agriculture', 'coral-coast'],
      tourSlug: 'sigatoka-valley-lawai-pottery'
    },
    {
      id: 'sv-002',
      src: '/photos/sigatoka/pottery-making.jpg',
      alt: 'Traditional Fijian pottery being crafted by local artisans',
      width: 2400,
      height: 1350,
      caption: 'Skilled artisans demonstrating traditional pottery techniques',
      location: 'Lawai Village, Sigatoka',
      photographer: 'Tima Green Tours',
      dateTaken: '2024-02-10',
      consentRef: 'CONSENT-2024-003',
      tags: ['pottery', 'crafts', 'artisans', 'traditional'],
      tourSlug: 'sigatoka-valley-lawai-pottery'
    }
  ],
  'lomawai-salt-natadola-horse-riding': [
    {
      id: 'ls-001',
      src: '/photos/lomawai/salt-making.jpg',
      alt: 'Traditional salt making process at Lomawai Village',
      width: 2400,
      height: 1350,
      caption: 'Ancient salt-making techniques passed down through generations',
      location: 'Lomawai Village, Coral Coast',
      photographer: 'Tima Green Tours',
      dateTaken: '2024-01-20',
      consentRef: 'CONSENT-2024-004',
      tags: ['salt', 'traditional', 'village', 'culture'],
      tourSlug: 'lomawai-salt-natadola-horse-riding'
    },
    {
      id: 'ls-002',
      src: '/photos/natadola/horse-riding.jpg',
      alt: 'Horseback riding along the pristine shores of Natadola Beach',
      width: 2400,
      height: 1350,
      caption: 'Guided horseback ride on one of the world\'s most beautiful beaches',
      location: 'Natadola Beach, Coral Coast',
      photographer: 'Tima Green Tours',
      dateTaken: '2024-01-20',
      consentRef: 'CONSENT-2024-005',
      tags: ['horse-riding', 'beach', 'natadola', 'adventure'],
      tourSlug: 'lomawai-salt-natadola-horse-riding'
    }
  ]
};

// Get photos for a specific tour
export function getTourPhotos(tourSlug: string): PhotoMetadata[] {
  return tourPhotos[tourSlug] || [];
}

// Get hero image for a tour
export function getTourHeroPhoto(tourSlug: string): PhotoMetadata | null {
  const photos = getTourPhotos(tourSlug);
  return photos.length > 0 ? photos[0] : null;
}

// Get gallery images (excluding hero)
export function getTourGalleryPhotos(tourSlug: string): PhotoMetadata[] {
  const photos = getTourPhotos(tourSlug);
  return photos.slice(1);
}

// Generate optimized image URLs for different sizes
export function getOptimizedImageUrl(src: string, size: 'hero' | 'gallery' | 'thumbnail' = 'gallery'): string {
  // In production, this would integrate with a CDN like Cloudinary
  // For now, return the original src
  return src;
}

// Generate srcset for responsive images
export function getImageSrcSet(src: string): string {
  const sizes = [400, 800, 1200, 1600, 2400];
  return sizes
    .map(size => `${getOptimizedImageUrl(src)}?w=${size} ${size}w`)
    .join(', ');
}

// Check if photo has consent for commercial use
export function hasConsent(photo: PhotoMetadata): boolean {
  return !!photo.consentRef;
}

// Get photos by location
export function getPhotosByLocation(location: string): PhotoMetadata[] {
  return Object.values(tourPhotos)
    .flat()
    .filter(photo => photo.location.toLowerCase().includes(location.toLowerCase()));
}

// Get photos by tag
export function getPhotosByTag(tag: string): PhotoMetadata[] {
  return Object.values(tourPhotos)
    .flat()
    .filter(photo => photo.tags.some(t => t.toLowerCase().includes(tag.toLowerCase())));
}
