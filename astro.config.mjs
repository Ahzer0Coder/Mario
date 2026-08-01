import { defineConfig, fontProviders, passthroughImageService } from "astro/config";
import sitemap from "@astrojs/sitemap";
// تم حذف Netlify
import robotsTxt from "astro-robots-txt";
import UnoCSS from "@unocss/astro";
import icon from "astro-icon";
import solidJs from "@astrojs/solid-js";
import { remarkReadingTime } from "./src/lib/remark-reading-time.mjs";
import svelte from "@astrojs/svelte";

const siteUrl = "https://Ahzer0Coder.github.io";

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: '/Mario',
  
  // البلوك ده هو اللي كان ناقص عشان يوقف ضغط الصور ويمنع الإيرور
  image: {
    service: passthroughImageService()
  },
  
  fonts: [
    {
      provider: fontProviders.local(),
      name: "CabinetGrotesk",
      cssVariable: "--font-cabinet-grotesk",
      options: {
        variants: [
          {
            weight: "100 1000",
            style: "normal",
            src: ["./src/assets/fonts/CabinetGrotesk-Variable.ttf"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Satoshi",
      cssVariable: "--font-satoshi",
      options: {
        variants: [
          {
            weight: "100 1000",
            style: "normal",
            src: ["./src/assets/fonts/Satoshi-Variable.ttf"],
          },
          {
            weight: "100 1000",
            style: "italic",
            src: ["./src/assets/fonts/Satoshi-VariableItalic.ttf"],
          },
        ],
      },
    },
  ],
  integrations: [
    sitemap(),
    robotsTxt({
      sitemap: [
        `${siteUrl}/Mario/sitemap-index.xml`,
        `${siteUrl}/Mario/sitemap-0.xml`,
      ],
    }),
    solidJs(),
    UnoCSS({ injectReset: true }),
    icon(),
    svelte(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  // تم تحويل النظام لـ Static تلقائياً بحذف output: server
  vite: {
    assetsInclude: "**/*.riv",
  },
});
