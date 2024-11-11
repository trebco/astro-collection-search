
# Collection search

Collection search for Astro collections using the great [minisearch][1].

## What it does

When you rebuild your site, it will build a search index from your collections. 
Then you can call a `Search()` function from client-side script to do full-text 
search.

Searching happens in a worker, so it won't block the main thread.

## Getting started

1. Add with `npm` or `astro add`.

2. If you used npm, update your config file. `astro add` will do this for you.

astro.config.mjs:
```ts

// add import directive
import collection_search from 'astro-collection-search';

export default defineConfig({

  // add integration
  integrations: [ collection_search(), /* ... */ ],

}
```

3. Add our example search component to one of your pages to try it.

```jsx
---

import SearchComponent from 'astro-collection-search/example/vanilla';

---

<html>
  <head>
    <title>Search page</title>
  </head>
  <body>

    <!-- include on page -->
    <SearchComponent />

  </body>
</html>

```  

That component is just an example. You can modify it or write your own
search component.

## Configuration

Add an entry in the `integrations` section in `astro.config.mjs`:

```ts

// import 
import collection_search from 'astro-collection-search';

// ...

// https://astro.build/config
export default defineConfig({

  // ...

  integrations: [
    collection_search({

      // optionally specify which collection or 
      // collections to index. defaults to everything
      // under `src/content`.

      collections: 'blog'

      // optionally specify which frontmatter fields to 
      // index (in addition to the text body). defaults
      // to `title` and `description`.

      fields: ['title', 'description', 'keywords']

    }),

    // ...

  ],

}

```

## Using

`Seach()` is a client-side function that will create the worker, load the 
index, and run the query. 

You can use our example components ([vanilla js][3], [preact][4]) as a 
starting point for integrating search into your site. Or just write script to
call the `Search()` function. Remember that it runs client-side. 

```jsx
---

import SearchComponent from 'astro-collection-search/example/vanilla';

---

<html>
  <head>
    <title>Search page</title>
  </head>
  <body>

    <!-- include on page -->
    <SearchComponent />

  </body>
</html>
```

For the preact version, you need a `client:only` directive to hyrdate and
prevent server-side rendering:

```jsx
---

import SearchComponent from 'astro-collection-search/example/preact';

---

<html>
  <head>
    <title>Search page</title>
  </head>
  <body>

    <!-- include on page -->
    <SearchComponent client:only="preact"/>

  </body>
</html>
```

## TODO

### Multiple indexes

At the moment we just create one index. We could split this, which would
be useful if you have content and documentation on the same site. 

We're also just consuming all md/mdx files in collections, ignoring language.
That should still work ok for i18n, but it will return results in multiple 
languages.

For both of these issues you can filter search results and just show the 
ones appropriate to the current locale/desired collection. But multiple indexes
might make this cleaner and more efficient.

## Note on indexing

Indexing happens on the `config:done` hook, so it won't update to
changes in dev/hot reload mode. You need to rebuild your site to 
trigger a re-index.

## License

MIT

[1]: https://github.com/lucaong/minisearch
[2]: example/search-overlay.astro
[3]: example/vanilla/search-component.astro
[4]: example/preact/search-component.tsx
