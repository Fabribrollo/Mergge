// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

// Páginas que existen pero no tienen que aparecer en Google.
// /form se manda por link a cada cliente; las otras son de prueba o de error.
const PRIVADAS = ['/form', '/turnstile-test', '/404']

// https://astro.build/config
export default defineConfig({
  // La dirección oficial del sitio. Astro la usa para el sitemap,
  // el canonical y las URLs completas de Open Graph.
  site: 'https://mergge.com.ar',
  integrations: [
    react(),
    sitemap({
      filter: (url) => !PRIVADAS.some((ruta) => new URL(url).pathname.startsWith(ruta)),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
