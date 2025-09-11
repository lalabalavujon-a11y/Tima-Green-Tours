export default function manifest() {
  return {
    name: 'Tima Green Tours',
    short_name: 'Tima Tours',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#6fde15',
    icons: [
      { src: '/logo.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/logo-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/logo-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}

