import Head from 'next/head';

interface SEOHeadProps {
  title: string;
  description: string;
  url: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  tourData?: {
    name: string;
    price: number;
    currency: string;
    duration: string;
    location: string;
    rating: number;
    reviewCount: number;
  };
}

export default function SEOHead({ title, description, url, image, tourData }: SEOHeadProps) {
  const baseUrl = 'https://timagreentours.com';
  const fullUrl = `${baseUrl}${url}`;
  const imageUrl = image ? `${baseUrl}${image.src}` : `${baseUrl}/og-default.jpg`;

  // Structured data for tour pages
  const structuredData = tourData ? {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tourData.name,
    description: description,
    image: imageUrl,
    url: fullUrl,
    offers: {
      '@type': 'Offer',
      price: tourData.price,
      priceCurrency: tourData.currency,
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tourData.rating,
      reviewCount: tourData.reviewCount
    },
    location: {
      '@type': 'Place',
      name: tourData.location
    },
    duration: `PT${tourData.duration.replace(' hours', 'H')}`,
    provider: {
      '@type': 'Organization',
      name: 'Tima Green Tours',
      url: baseUrl,
      logo: `${baseUrl}/logo.svg`
    }
  } : {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Tima Green Tours',
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    description: 'Indigenous owned Fijian tour company offering authentic cultural experiences',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sigatoka',
      addressCountry: 'FJ'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@timagreentours.com',
      contactType: 'customer service'
    }
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={tourData ? 'website' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={image?.width?.toString() || '1200'} />
      <meta property="og:image:height" content={image?.height?.toString() || '630'} />
      <meta property="og:image:alt" content={image?.alt || 'Tima Green Tours'} />
      <meta property="og:site_name" content="Tima Green Tours" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={image?.alt || 'Tima Green Tours'} />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Tima Green Tours" />
      <meta name="keywords" content="Fiji tours, cultural experiences, eco-tourism, indigenous tours, Sigatoka, Coral Coast" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="FJ" />
      <meta name="geo.placename" content="Navua, Fiji" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#0EA5E9" />
    </Head>
  );
}
