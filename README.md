# Image Starfield Effect
**An HTML5/canvas animation that animates along the z-axis to a point on the horizon**

## v0.3.0b

This early prototype is still in proof of concept phase.

Images load from the foreground and approach a horizon point.

Images are hard-coded at this point, but will eventually pull from a CMS or dynamic source.

~~Will need to integrate with something like [Kinetic.js](http://kineticjs.com) to add event handlers to the images added to the canvas.~~

All the animation is currently handled via CSS animations and will likely stay that way.

## TODOS
* Implement dynamic image source (CMS or server-side script)
* ~~Add event handling for individual images~~
* Adjust image tracks so they don't all move towards the same point on the horizon
* Would be cool to do some minor perspective skewing based on mouse position
* ~~Improve Z-Index ordering~~

## Credits
~~This code base was heavily influenced by Seb Lee-Delisle's [presentation](http://seb.ly/2010/11/javascript-2d-and-3d-particle-effects-at-full-frontal/) at Full Frontal JS 2010.~~

## History
The code has been through two iterations since original release.

### v0.1.0b 
...was done using vanilla canvas, based heavily on Seb Lee-Delisle's [particle effect demo](http://seb.ly/2010/11/javascript-2d-and-3d-particle-effects-at-full-frontal/), but proper Z ordering was hard to implement.

### v0.2.0b 
...integrated [Kinetic.js](http://kineticjs.com), but it wasn't very performant, even with just a few images.

### v0.3.0b 
...is a total departure and no longer shares code with the previous versions. I'm using a simple CSS animation of the Z axis for images loaded up via JavaScript (jQuery for now, will likely unwrangle into vanilla at some point).
