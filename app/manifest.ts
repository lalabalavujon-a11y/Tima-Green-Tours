export default function manifest() {
  return {
    name: 'Tima Green Tours',
    short_name: 'Tima Tours',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#6fde15',
    icons: [
      { src: '/logo.png', sizes: '192x192', type: 'image/png' },
      { src: '/logo.png', sizes: '512x512', type: 'image/png' },
      { src: '/logo.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}

