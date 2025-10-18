// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://suzzastitches.com",
  integrations: [mdx()],

  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    fonts: [
      {
        provider: "local",
        name: "Solider",
        cssVariable: "--font-solider",
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/solider/Solide_Mirage-Mono_web.woff2"],
          },
        ],
      },
      {
        provider: "local",
        name: "Abordage",
        cssVariable: "--font-abordage",
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/abordage/Abordage-Regular.woff2"],
          },
        ],
      },
    ],
  },
});
