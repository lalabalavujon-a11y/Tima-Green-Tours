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
  // Biausevu Waterfall Tour – group at the falls
  'biausevu-waterfall-tour': [
    {
      id: 'bw-001',
      src: '/photos/biausevu/waterfall-group.jpg',
      alt: 'Guests at Biausevu Waterfall natural pool',
      width: 1600,
      height: 900,
      caption: 'Biausevu Waterfall natural pool',
      location: 'Biausevu Village, Sigatoka',
      photographer: 'Tima Green Tours',
      dateTaken: '2024-01-15',
      tags: ['waterfall', 'swimming', 'nature', 'sigatoka'],
      tourSlug: 'biausevu-waterfall-tour'
    }
  ],

  // Sigatoka Valley & Lawai Pottery – valley scenic
  'sigatoka-valley-lawai-pottery': [
    {
      id: 'sv-001',
      src: '/photos/sigatoka/valley-overlook.jpg',
      alt: 'Scenic Sigatoka Valley and river',
      width: 1600,
      height: 900,
      caption: 'The lush Sigatoka Valley',
      location: 'Sigatoka Valley, Coral Coast',
      photographer: 'Tima Green Tours',
      dateTaken: '2024-02-10',
      tags: ['valley', 'scenic', 'agriculture', 'coral-coast'],
      tourSlug: 'sigatoka-valley-lawai-pottery'
    }
  ],

  // Lomawai Salt + Natadola Horse Riding – horse riding image
  'lomawai-salt-natadola-horse-riding': [
    {
      id: 'ls-001',
      src: '/photos/natadola/horse-riding.jpg',
      alt: 'Horseback riding at Natadola Beach',
      width: 1600,
      height: 900,
      caption: 'Horse riding on Natadola Beach',
      location: 'Natadola Beach, Coral Coast',
      photographer: 'Tima Green Tours',
      dateTaken: '2024-01-20',
      tags: ['horse-riding', 'beach', 'natadola', 'adventure'],
      tourSlug: 'lomawai-salt-natadola-horse-riding'
    }
  ],

  // Sabeto Mud Pool – mud pool group
  'sabeto-mudpool-nadi-temple': [
    {
      id: 'sm-001',
      src: '/photos/sabeto/mudpool-group.jpg',
      alt: 'Guests at Sabeto Mud Pool & Hot Spring',
      width: 1600,
      height: 900,
      caption: 'Sabeto Mud Pool & Hot Springs',
      location: 'Sabeto, Nadi',
      photographer: 'Tima Green Tours',
      dateTaken: '2024-03-12',
      tags: ['mudpool', 'hotspring', 'wellness', 'sabeto'],
      tourSlug: 'sabeto-mudpool-nadi-temple'
    }
  ],

  // Shark Diving – shark encounter
  'shark-diving-beqa-lagoon': [
    {
      id: 'sd-001',
      src: '/photos/beqa/shark-diving.jpg',
      alt: 'Shark diving at Beqa Lagoon',
      width: 1600,
      height: 900,
      caption: 'Shark diving at Beqa Lagoon',
      location: 'Beqa Lagoon, Viti Levu',
      photographer: 'Tima Green Tours',
      dateTaken: '2024-04-05',
      tags: ['shark', 'diving', 'adventure', 'beqa'],
      tourSlug: 'shark-diving-beqa-lagoon'
    }
  ],

  // Malolo Island Getaway – island jetty
  'malolo-island-getaway': [
    {
      id: 'mi-001',
      src: '/photos/malolo/island-jetty.jpg',
      alt: 'Island jetty at Malolo Lailai',
      width: 1600,
      height: 900,
      caption: 'Malolo Lailai Island jetty',
      location: 'Malolo Lailai, Mamanuca Islands',
      photographer: 'Tima Green Tours',
      dateTaken: '2024-05-10',
      tags: ['island', 'beach', 'jetty', 'mamanuca'],
      tourSlug: 'malolo-island-getaway'
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
