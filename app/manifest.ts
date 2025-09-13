export default function manifest() {
  return {
    name: 'Tima Green Tours',
    short_name: 'Tima Tours',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#22c55e',
    icons: [
      { src: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { src: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { src: '/logo.png', sizes: 'any', type: 'image/png' },
      { src: '/logo-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/logo-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}

