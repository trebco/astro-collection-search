
## Overlay search

This is a more sophisticated search interface, inspired by the Algolia 
search on Astro.com. It's a work in progress. Adding it to a website is 
a little more complicated than the other examples.

At the moment we use a custom event to trigger the dialog. This lets us
pass in parameters from the caller (who sends the event). 

## Issue with page scrolling 

This inteface uses a dialog. There's an issue with most browsers and 
scrolling when a modal dialog is visible. 

To prevent any weird scroll behavior, the dialog should be located in the 
<body/> element, and the <body/> element should not scroll. Your scrolling 
content should be a child of <body/>, so that the dialog is higher in the 
hierarchy than any scrollable node.

Currently the dialog will move itself to the body, so that's one part 
taken care of. Just make sure your <body/> doesn't scroll.


