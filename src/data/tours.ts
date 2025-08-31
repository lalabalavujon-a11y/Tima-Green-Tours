export interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  duration: string;
  maxGroupSize: number;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  includes: string[];
  highlights: string[];
  imageUrl: string;
  category: 'NATURE' | 'CULTURAL' | 'ADVENTURE' | 'LUXURY';
  location: string;
  available: boolean;
}

export const tours: Tour[] = [
  {
    id: '1',
    title: "Biausevu Waterfall Tour",
    slug: "biausevu-waterfall-tour",
    description: "Immerse yourself in the wonder of the Biausevu Waterfall on our exclusive guided tour. For only $90 per adult, and half price for children aged 4-13, you can enjoy an unforgettable experience that includes the entry fee, a traditional kava ceremony, and a delicious light lunch.",
    longDescription: "Let our expert guide lead you on a leisurely 30-minute stroll through the lush landscape to the majestic waterfall, where you can bask in the beauty of the cascading waters and connect with nature in a truly unique way. The journey to the falls takes you through verdant rainforest, across gentle streams, and past traditional Fijian villages where you'll experience the warm hospitality that Fiji is famous for. Once at the falls, you can swim in the refreshing natural pool beneath the cascading water or simply relax and take in the breathtaking scenery.",
    price: 90,
    duration: "Half Day",
    maxGroupSize: 12,
    difficulty: "Easy",
    includes: [
      "Entry fee",
      "Traditional kava ceremony", 
      "Light lunch",
      "Expert guide",
      "Transportation",
      "Swimming opportunity"
    ],
    highlights: [
      "30-minute scenic walk through rainforest",
      "Traditional Fijian village experience",
      "Swimming in natural waterfall pool",
      "Cultural kava ceremony",
      "Breathtaking scenery"
    ],
    imageUrl: "/images/biausevu-waterfall.jpg",
    category: "NATURE",
    location: "Biausevu, Fiji",
    available: true
  },
  {
    id: '2',
    title: "Sigatoka Valley Drive & Lawai Pottery Village",
    slug: "sigatoka-valley-pottery-village",
    description: "Experience the lush beauty and rich cultural heritage of Fiji with a visit to Sigatoka Valley Drive and Lawai Pottery Village. Embark on a picturesque journey through the thriving greenery of the 'Salad Bowl of Fiji,' and immerse yourself in the artistry of traditional Fijian pottery at the charming village.",
    longDescription: "Journey through one of Fiji's most picturesque regions, known as the 'Salad Bowl of Fiji' for its lush agricultural landscapes. The winding road offers breathtaking views of the Sigatoka River and the verdant hills dotted with traditional villages. Witness the ancient art of Fijian pottery making, passed down through generations. Watch skilled artisans transform simple clay into beautiful, functional pieces using traditional techniques that have remained unchanged for centuries. Participate in a traditional kava ceremony, a significant ritual in Fijian culture that welcomes visitors and fosters community bonds. Learn about local customs and way of life from villagers eager to share their heritage. Enjoy a delicious light lunch featuring fresh, locally-sourced ingredients that showcase the flavours of Fiji.",
    price: 75,
    duration: "Full Day",
    maxGroupSize: 15,
    difficulty: "Easy",
    includes: [
      "Scenic valley drive",
      "Pottery demonstration",
      "Traditional kava ceremony",
      "Light lunch with local ingredients",
      "Cultural immersion experience",
      "Transportation"
    ],
    highlights: [
      "Scenic drive through 'Salad Bowl of Fiji'",
      "Traditional pottery making demonstration",
      "Cultural kava ceremony",
      "Local cuisine experience",
      "Village life immersion"
    ],
    imageUrl: "/images/sigatoka-valley.jpg",
    category: "CULTURAL",
    location: "Sigatoka Valley, Fiji",
    available: true
  },
  {
    id: '3',
    title: "Lomawai Salt Making Village & Horse Riding at Natadola Beach",
    slug: "lomawai-salt-horse-riding",
    description: "Experience the ancient art of salt making at the picturesque Lomawai Salt Making Village, where you'll witness traditional methods passed down through generations. This rare cultural practice offers insight into sustainable resource use and traditional Fijian craftsmanship.",
    longDescription: "Experience the ancient art of salt making at the picturesque Lomawai Salt Making Village, where you'll witness traditional methods passed down through generations. This rare cultural practice offers insight into sustainable resource use and traditional Fijian craftsmanship. Embark on a thrilling horseback ride along the stunning shores of Natadola Beach, named one of the most beautiful beaches in the world. Feel the gentle sea breeze as you trot along white sands with panoramic views of the Pacific Ocean. At just $86 per person (with kids half price), this unforgettable adventure combines cultural heritage with natural beauty for a truly authentic Fijian experience. Our knowledgeable guides provide fascinating insights into both the salt-making tradition and the coastal ecosystem during this full-day excursion.",
    price: 86,
    duration: "Full Day",
    maxGroupSize: 10,
    difficulty: "Moderate",
    includes: [
      "Salt making demonstration",
      "Horseback riding on Natadola Beach",
      "Cultural insights",
      "Refreshments",
      "All necessary equipment",
      "Transportation"
    ],
    highlights: [
      "Ancient salt making tradition",
      "Horseback riding on world-famous beach",
      "Cultural heritage experience",
      "Panoramic ocean views",
      "Traditional craftsmanship"
    ],
    imageUrl: "/images/lomawai-salt-horse.jpg",
    category: "ADVENTURE",
    location: "Lomawai & Natadola Beach, Fiji",
    available: true
  },
  {
    id: '4',
    title: "Sabeto Mudpool and Nadi Temple/Shopping Tour",
    slug: "sabeto-mudpool-nadi-temple",
    description: "Experience the ultimate adventure in Fiji with our Sabeto Mudpool and Nadi Temple/Shopping tour! Step into a world of wonder as we take you on a journey to explore the awe-inspiring Nadi Temple, relax in the rejuvenating Sabeto Mudpool, and partake in a shopping extravaganza.",
    longDescription: "Delve into the vibrant culture and history of Fiji as you visit the Nadi Temple, a place of serenity and beauty where you can admire the intricate architecture and spiritual significance. This colourful Hindu temple is the largest in the Southern Hemisphere and offers a fascinating glimpse into Fiji's diverse cultural heritage. Treat yourself to a one-of-a-kind pampering session at the Sabeto Mudpool, where the natural mineral-rich waters will leave you feeling refreshed and revitalised. The therapeutic properties of the mud are said to draw impurities from the skin and provide relief for various ailments, offering both relaxation and health benefits. Cap off your day with a shopping spree at the local markets, where you can discover unique handicrafts, souvenirs, and authentic Fijian goods to treasure forever.",
    price: 100,
    duration: "Full Day",
    maxGroupSize: 12,
    difficulty: "Easy",
    includes: [
      "Nadi Temple visit",
      "Sabeto Mudpool experience",
      "Local market shopping",
      "Transportation",
      "Cultural insights",
      "Shopping time"
    ],
    highlights: [
      "Largest Hindu temple in Southern Hemisphere",
      "Therapeutic mud pool experience",
      "Local market shopping",
      "Cultural heritage exploration",
      "Relaxation and wellness"
    ],
    imageUrl: "/images/sabeto-mudpool-temple.jpg",
    category: "CULTURAL",
    location: "Nadi & Sabeto, Fiji",
    available: true
  },
  {
    id: '5',
    title: "Shark Diving in Beqa Lagoon",
    slug: "shark-diving-beqa-lagoon",
    description: "Embark on the ultimate adrenaline-pumping adventure of shark diving in the crystal-clear waters of Beqa Lagoon, Fiji Islands. Dare to come face-to-face with the majestic tiger sharks, reef sharks, and a variety of other shark species in their natural habitat.",
    longDescription: "Guided by experienced professionals, you will witness these incredible creatures up close and personal, gaining a newfound appreciation for the beauty and power of the ocean's top predators. Our expert dive operators ensure both your safety and the protection of these magnificent animals throughout this unforgettable encounter. Dive into the thrill of shark diving and feel the rush of coming face-to-face with magnificent sharks in their natural habitat, an experience that will get your heart racing. Feel safe with knowledgeable professionals who ensure a secure and exciting experience during your shark diving expedition, with comprehensive briefings and constant supervision. Check off a thrilling experience from your bucket list by embarking on a shark diving excursion in the pristine waters of Beqa Lagoon, known worldwide for its exceptional shark encounters.",
    price: 350,
    duration: "Full Day",
    maxGroupSize: 8,
    difficulty: "Advanced",
    includes: [
      "Professional dive equipment",
      "Expert dive guides",
      "Safety briefing",
      "Shark encounter experience",
      "Underwater photography",
      "Transportation"
    ],
    highlights: [
      "Face-to-face with tiger sharks",
      "Professional dive guidance",
      "Bucket-list experience",
      "Crystal-clear waters",
      "Marine conservation focus"
    ],
    imageUrl: "/images/shark-diving-beqa.jpg",
    category: "ADVENTURE",
    location: "Beqa Lagoon, Fiji",
    available: true
  },
  {
    id: '6',
    title: "Malolo Island 3 Nights Get-Away",
    slug: "malolo-island-getaway",
    description: "Experience paradise like never before on the breathtaking shores of Malolo Lailai Island in Fiji. Nestled in the heart of the Mamanuca Islands, this tropical oasis offers peace and tranquility for those looking to unwind and rejuvenate.",
    longDescription: "With pristine white sandy beaches, crystal clear turquoise waters, and lush greenery surrounding you, Malolo Lailai Island is the perfect destination for a relaxing getaway. Escape the hustle and bustle of everyday life and unwind in a serene and tranquil environment. Lounge on pristine beaches, swing in hammocks beneath swaying palms, or indulge in spa treatments that incorporate traditional Fijian healing techniques. Experience exhilarating water sports activities and explore the island's natural wonders. From snorkelling vibrant coral reefs to kayaking crystal waters, paddleboarding at sunrise, or hiking to panoramic viewpoints, adventure awaits at every turn. Immerse yourself in the rich Fijian culture and traditions, and learn about the local way of life. Participate in traditional ceremonies, learn to weave palm fronds, try your hand at Fijian cooking, or simply chat with friendly locals about island life.",
    price: 899,
    duration: "3 Nights",
    maxGroupSize: 20,
    difficulty: "Easy",
    includes: [
      "3 nights accommodation",
      "All meals",
      "Water sports activities",
      "Cultural experiences",
      "Spa treatments",
      "Island transfers"
    ],
    highlights: [
      "Pristine white sandy beaches",
      "Water sports and activities",
      "Cultural immersion",
      "Spa and wellness treatments",
      "Tropical island paradise"
    ],
    imageUrl: "/images/malolo-island.jpg",
    category: "LUXURY",
    location: "Malolo Lailai Island, Mamanuca Islands",
    available: true
  }
];

export const getTourBySlug = (slug: string): Tour | undefined => {
  return tours.find(tour => tour.slug === slug);
};

export const getToursByCategory = (category: Tour['category']): Tour[] => {
  return tours.filter(tour => tour.category === category);
};

