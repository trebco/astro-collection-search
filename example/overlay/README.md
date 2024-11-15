
## Overlay search

This is a more sophisticated search interface, inspired by the Algolia 
search on Astro.com. It's a work in progress. 

Adding it to a website is a little more complicated than the other examples. 
But it's also a lot more flexible and you may be able to use it as-is.

## Adding to a website

There are four steps to adding this to a website: 

### 1. Import the Astro component

This happens in the code-fence part of your 
Astro page or Astro component. A good place for this is in the page header or 
sidebar. But it can be anywhere.

```tsx
---

// import search component
import OverlaySearchComponent from 'astro-collection-search/example/overlay/component.astro';

---
```

### 2. Add the component to the HTML

Again this can be anywhere in HTML, it doesn't really matter.

```tsx

<!-- add the element to the page or component -->
<OverlaySearchComponent />
```

### 3. Add a button or link to launch the dialog

This will be called in client-side script so we need a way to identify it: a 
class name or id will work.

```tsx
<button class="open-search-dialog">Click me</button>
```

### 4. Add client-side script

The script will initialize the search interface, and then set up your button 
or link to open search.

```html

<script>
  
// import search functions.
import { OpenSearch, InitSearch } from 
  'astro-collection-search/example/overlay/overlay-search.ts';
  
// call init to set search options. 
InitSearch({
  max: 12, 
});
  
// add an event listener to the button we added in step (3) to
// open the search dialog 
document.querySelector('.open-search-dialog')?.addEventListener('click', () => OpenSearch());
  
</script>

```

## Issue with page scrolling 

This inteface uses a dialog. There's an issue with most browsers and 
scrolling when a modal dialog is open. You can work around this by setting
up your HTML in a specific way.

To prevent any weird scroll behavior, the dialog should a child of the 
body element, and the body element should not scroll. Your scrolling 
content should be a child of body, so that the dialog is higher in the 
hierarchy than any scrollable page element.

Currently the dialog will move itself to the body element, so that's one part 
taken care of. Just make sure your body doesn't scroll.


