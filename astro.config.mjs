// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import collectionSearch from 'astro-collection-search';

// https://astro.build/config
export default defineConfig({
    site: 'https://trebco.github.io',
    base: 'astro-collection-search',
    integrations: [mdx(), sitemap(), collectionSearch()],
});