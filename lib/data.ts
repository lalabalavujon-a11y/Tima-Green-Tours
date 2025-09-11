import tours from '@/content/tours.json';
import type { Tour } from '@/lib/types/tour';
import { getTourHeroPhoto, getTourGalleryPhotos } from '@/lib/photography';
import { paymentLinks } from '@/lib/paymentLinks';
import fs from 'fs';
import path from 'path';

// Convert the existing tours.json to the new Tour interface format
function toTour(tour: any): Tour {
  return {
    slug: tour.slug,
    name: tour.title,
    tagline: tour.summary,
    shortDescription: tour.description || tour.summary,
    durationHours: extractHours(tour.duration),
    departure: 'Nadi',
    availability: 'Daily',
    groupSizeMax: extractGroupSize(tour.group_size),
    languages: ['English', 'Fijian'],
    cancellationPolicy: 'Free cancellation up to 24 hours before tour',
    priceFromFJD: extractPriceFloat(tour.price),
    childPriceFromFJD: tour.child_price ? extractPriceFloat(tour.child_price) : undefined,
    currency: 'FJD',
    locations: extractLocations(tour.slug),
    highlights: tour.highlights,
    itinerary: generateItinerary(tour),
    includes: tour.includes || [],
    excludes: generateExcludes(tour.slug),
    whatToBring: generateWhatToBring(tour.slug),
    cultureNotes: generateCultureNotes(tour.slug),
    heroImage: generateHeroImage(tour.slug),
    gallery: generateGallery(tour.slug),
    reviews: generateReviews(tour.slug),
    faqs: generateFAQs(tour.slug),
    paymentLinks: paymentLinks[tour.slug] || {}
  };
}

export function getTourBySlug(slug: string): Tour | null {
  const tour = tours.find(t => t.slug === slug);
  if (!tour) return null;
  return toTour(tour);
}

export function getAllTours(): Tour[] {
  return (tours as any[]).map(toTour);
}

export function getRelatedTours(currentSlug: string): Tour[] {
  const currentTour = getTourBySlug(currentSlug);
  if (!currentTour) return [];

  // Get tours with similar locations or themes
  const related = tours
    .filter(t => t.slug !== currentSlug)
    .slice(0, 3)
    .map(t => getTourBySlug(t.slug))
    .filter(Boolean) as Tour[];

  return related;
}

// Helper functions to convert existing data
function extractHours(duration: string): number {
  if (duration.includes('Full Day')) return 8;
  if (duration.includes('Half Day')) return 4;
  if (duration.includes('3 Nights')) return 72;
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[1]) : 4;
}

function extractGroupSize(groupSize: string): number {
  const match = groupSize.match(/(\d+)/);
  return match ? parseInt(match[1]) : 12;
}

function extractPriceFloat(price: string): number {
  if (!price || price === 'Contact for Pricing') return 0;
  const cleaned = price.replace(/[,]/g, '');
  const match = cleaned.match(/(\d+(?:\.\d+)?)/);
  return match ? parseFloat(match[1]) : 0;
}

function extractLocations(slug: string): string[] {
  const locationMap: Record<string, string[]> = {
    'biausevu-waterfall-tour': ['Sigatoka', 'Coral Coast'],
    'sigatoka-valley-lawai-pottery': ['Sigatoka', 'Coral Coast'],
    'lomawai-salt-natadola-horse-riding': ['Natadola', 'Coral Coast'],
    'sabeto-mudpool-nadi-temple': ['Nadi', 'Sabeto'],
    'shark-diving-beqa-lagoon': ['Beqa', 'Pacific Harbour'],
    'malolo-island-getaway': ['Mamanuca Islands', 'Malolo']
  };
  return locationMap[slug] || ['Fiji'];
}

function generateItinerary(tour: any): Array<{ time?: string; title: string; description: string }> {
  const itineraries: Record<string, Array<{ time?: string; title: string; description: string }>> = {
    'biausevu-waterfall-tour': [
      { time: '08:00', title: 'Hotel Pickup', description: 'Pickup from your hotel in Nadi or Coral Coast area' },
      { time: '08:30', title: 'Scenic Drive', description: 'Journey through the lush Sigatoka Valley to Biausevu Village' },
      { time: '09:00', title: 'Village Welcome', description: 'Traditional welcome ceremony and kava presentation' },
      { time: '09:30', title: 'Waterfall Trek', description: '30-minute guided walk through rainforest to the waterfall' },
      { time: '10:00', title: 'Waterfall Experience', description: 'Swim in the natural pool and enjoy the cascading waters' },
      { time: '12:00', title: 'Light Lunch', description: 'Traditional Fijian lunch with local produce' },
      { time: '14:00', title: 'Return Journey', description: 'Scenic drive back to your hotel' }
    ],
    'sigatoka-valley-lawai-pottery': [
      { time: '08:00', title: 'Hotel Pickup', description: 'Pickup from your hotel in Nadi or Coral Coast area' },
      { time: '08:30', title: 'Sigatoka Valley Drive', description: 'Scenic drive through the "Salad Bowl of Fiji"' },
      { time: '09:30', title: 'Lawai Pottery Village', description: 'Arrive at the traditional pottery village' },
      { time: '10:00', title: 'Pottery Demonstration', description: 'Watch skilled artisans create traditional Fijian pottery' },
      { time: '11:00', title: 'Kava Ceremony', description: 'Participate in a traditional kava ceremony' },
      { time: '12:00', title: 'Local Lunch', description: 'Enjoy fresh local cuisine featuring seasonal ingredients' },
      { time: '14:00', title: 'Return Journey', description: 'Scenic drive back to your hotel' }
    ],
    'lomawai-salt-natadola-horse-riding': [
      { time: '08:00', title: 'Hotel Pickup', description: 'Pickup from your hotel in Nadi or Coral Coast area' },
      { time: '08:30', title: 'Lomawai Village', description: 'Visit the traditional salt-making village' },
      { time: '09:00', title: 'Salt Making Demo', description: 'Learn about ancient salt-making techniques' },
      { time: '10:30', title: 'Natadola Beach', description: 'Arrive at one of the world\'s most beautiful beaches' },
      { time: '11:00', title: 'Horseback Riding', description: 'Guided horseback ride along the pristine shoreline' },
      { time: '12:30', title: 'Beach Lunch', description: 'Light lunch with ocean views' },
      { time: '14:00', title: 'Return Journey', description: 'Scenic drive back to your hotel' }
    ]
  };
  
  return itineraries[tour.slug] || [
    { title: 'Hotel Pickup', description: 'Convenient pickup from your accommodation' },
    { title: 'Tour Experience', description: tour.summary },
    { title: 'Return Journey', description: 'Comfortable return to your hotel' }
  ];
}

function generateExcludes(slug: string): string[] {
  const excludes: Record<string, string[]> = {
    'biausevu-waterfall-tour': ['Personal expenses', 'Gratuities', 'Travel insurance'],
    'sigatoka-valley-lawai-pottery': ['Personal expenses', 'Gratuities', 'Travel insurance'],
    'lomawai-salt-natadola-horse-riding': ['Personal expenses', 'Gratuities', 'Travel insurance'],
    'sabeto-mudpool-nadi-temple': ['Personal expenses', 'Gratuities', 'Travel insurance', 'Shopping purchases'],
    'shark-diving-beqa-lagoon': ['Personal expenses', 'Gratuities', 'Travel insurance', 'Diving equipment'],
    'malolo-island-getaway': ['Personal expenses', 'Gratuities', 'Travel insurance', 'Additional activities']
  };
  return excludes[slug] || ['Personal expenses', 'Gratuities', 'Travel insurance'];
}

function generateWhatToBring(slug: string): string[] {
  const essentials = ['Swimwear', 'Change of clothes', 'Sunscreen', 'Hat', 'Comfortable walking shoes', 'Camera'];
  const specific: Record<string, string[]> = {
    'biausevu-waterfall-tour': ['Water shoes', 'Towel', 'Cash for village crafts'],
    'sigatoka-valley-lawai-pottery': ['Modest clothing for village visit', 'Cash for pottery purchases'],
    'lomawai-salt-natadola-horse-riding': ['Riding clothes', 'Towel', 'Cash for souvenirs'],
    'sabeto-mudpool-nadi-temple': ['Modest clothing for temple', 'Cash for shopping', 'Towel'],
    'shark-diving-beqa-lagoon': ['Diving certification', 'Underwater camera'],
    'malolo-island-getaway': ['Beachwear', 'Resort wear', 'Cash for activities']
  };
  return [...essentials, ...(specific[slug] || [])];
}

function generateCultureNotes(slug: string): string[] {
  const notes: Record<string, string[]> = {
    'biausevu-waterfall-tour': [
      'Remove hats when entering the village as a sign of respect',
      'Bring a small gift (kava root) for the village chief',
      'Ask permission before taking photos of villagers'
    ],
    'sigatoka-valley-lawai-pottery': [
      'Remove hats when entering the village as a sign of respect',
      'Bring a small gift (kava root) for the village chief',
      'Respect the traditional pottery-making process'
    ],
    'lomawai-salt-natadola-horse-riding': [
      'Remove hats when entering the village as a sign of respect',
      'Bring a small gift (kava root) for the village chief',
      'Follow the guide\'s instructions for horseback riding'
    ]
  };
  return notes[slug] || [
    'Remove hats when entering villages as a sign of respect',
    'Bring a small gift (kava root) for village chiefs',
    'Ask permission before taking photos of people'
  ];
}

const useLocalPhotos = process.env.NEXT_PUBLIC_USE_LOCAL_TOUR_PHOTOS === 'true';

function fileExistsUnderPublic(publicPath: string): boolean {
  try {
    const relative = publicPath.startsWith('/') ? publicPath.slice(1) : publicPath;
    const absolute = path.join(process.cwd(), 'public', relative);
    return fs.existsSync(absolute);
  } catch {
    return false;
  }
}

function generateHeroImage(slug: string): any {
  const heroPhoto = getTourHeroPhoto(slug);
  // Use placeholder until real photos are available locally/CDN
  const placeholderSrc = '/tours/placeholder.jpg';
  if (heroPhoto) {
    // Prefer local photo when enabled and present; otherwise fall back to placeholder
    let src = heroPhoto.src;
    if (heroPhoto.src.startsWith('/photos/')) {
      const hasLocalFile = fileExistsUnderPublic(heroPhoto.src);
      if (!useLocalPhotos || !hasLocalFile) {
        src = placeholderSrc;
      }
    }
    return {
      src,
      alt: heroPhoto.alt,
      width: heroPhoto.width || 1600,
      height: heroPhoto.height || 900
    };
  }

  // Fallback to placeholder
  return {
    src: placeholderSrc,
    alt: `Hero image for ${slug}`,
    width: 1600,
    height: 900
  };
}

function generateGallery(slug: string): any[] {
  const galleryPhotos = getTourGalleryPhotos(slug);
  if (galleryPhotos.length > 0) {
    const placeholderSrc = '/tours/placeholder.jpg';
    return galleryPhotos.map(photo => {
      let src = photo.src;
      if (photo.src.startsWith('/photos/')) {
        const hasLocalFile = fileExistsUnderPublic(photo.src);
        if (!useLocalPhotos || !hasLocalFile) {
          src = placeholderSrc;
        }
      }
      return {
        src,
        alt: photo.alt,
        width: photo.width || 1200,
        height: photo.height || 800,
        caption: photo.caption
      };
    });
  }
  // No gallery photos yet → hide gallery section
  return [];
}

function generateReviews(slug: string): Array<{ name: string; rating: number; quote: string; date?: string }> {
  const reviews: Record<string, Array<{ name: string; rating: number; quote: string; date?: string }>> = {
    'biausevu-waterfall-tour': [
      {
        name: 'Sarah & James',
        rating: 5,
        quote: 'The waterfall experience was incredible. We felt like family, not tourists. The kava ceremony was deeply meaningful.',
        date: '2024-01-15'
      },
      {
        name: 'Emma',
        rating: 5,
        quote: 'Our guide knew every plant and story. The waterfall swim was magical. We learned so much about Fijian culture.',
        date: '2024-02-20'
      }
    ],
    'sigatoka-valley-lawai-pottery': [
      {
        name: 'David Thompson',
        rating: 5,
        quote: 'If you want to see the real Fiji, look no further. The pottery demonstration was fascinating and the valley views were breathtaking.',
        date: '2024-01-30'
      }
    ]
  };
  return reviews[slug] || [
    {
      name: 'Happy Guest',
      rating: 5,
      quote: 'Absolutely incredible experience with Timaima Green Tours!',
      date: '2024-01-01'
    }
  ];
}

function generateFAQs(slug: string): Array<{ q: string; a: string }> {
  const faqs: Record<string, Array<{ q: string; a: string }>> = {
    'biausevu-waterfall-tour': [
      {
        q: 'How difficult is the walk to the waterfall?',
        a: 'The walk is moderate - about 30 minutes on a well-maintained trail. It\'s suitable for most fitness levels, but there are some uphill sections.'
      },
      {
        q: 'Can children participate in this tour?',
        a: 'Yes! Children aged 4-13 are welcome and pay half price. The tour is family-friendly and children love swimming in the waterfall pool.'
      },
      {
        q: 'What should I wear for the waterfall tour?',
        a: 'Wear comfortable walking shoes, swimwear under your clothes, and bring a change of clothes. The trail can be muddy after rain.'
      }
    ],
    'sigatoka-valley-lawai-pottery': [
      {
        q: 'Can I purchase pottery from the village?',
        a: 'Yes! The village artisans sell their beautiful handcrafted pottery. Bring cash for purchases and remember to bargain respectfully.'
      },
      {
        q: 'Is the kava ceremony mandatory?',
        a: 'No, but it\'s a wonderful cultural experience. You can politely decline if you prefer not to participate.'
      }
    ]
  };
  
  return faqs[slug] || [
    {
      q: 'What is your cancellation policy?',
      a: 'Free cancellation up to 24 hours before the tour. Cancellations within 24 hours may incur charges.'
    },
    {
      q: 'Do you provide hotel pickup?',
      a: 'Yes, we provide convenient pickup from hotels in Nadi, Denarau, and Coral Coast areas.'
    },
    {
      q: 'What if it rains on the day of the tour?',
      a: 'Tours operate rain or shine unless conditions are unsafe. We\'ll contact you if we need to reschedule.'
    }
  ];
}
