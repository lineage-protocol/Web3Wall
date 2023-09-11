const manifestForPlugIn = {
  name: 'Web3Wall',
  short_name: 'W3wall',
  description: 'Content Created by users from Token2049 events. Developed by Lineage Protocol',
  icons: [
    {
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
      purpose: 'any favicon',
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any favicon',
    },
    {
      src: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
      purpose: 'any apple touch icon',
    },
  ],
  theme_color: '#171717',
  background_color: '#f0e7db',
  display: 'standalone',
  scope: '/',
  start_url: '/login',
}

export default manifestForPlugIn
