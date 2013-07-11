# Image Starfield Effect
**An HTML5/canvas animation that animates along the z-axis to a point on the horizon**

## v0.1.0b

This early prototype is still in proof of concept phase.

Images load from the foreground and approach a horizon point.

Images are hard-coded at this point, but will eventually pull from a CMS or dynamic source.

Will need to integrate with something like [Kinetic.js](http://kineticjs.com) to add event handlers to the images added to the canvas.

## TODOS
* Implement dynamic image source (CMS or server-side script)
* Add event handling for individual images
* Adjust image tracks so they don't all move towards the same point on the horizon
* Would be cool to do some minor perspective skewing based on mouse position
* Improve Z-Index ordering

## Credits
This code base was heavily influenced by Seb Lee-Delisle's [presentation](http://seb.ly/2010/11/javascript-2d-and-3d-particle-effects-at-full-frontal/) at Full Frontal JS 2010.
