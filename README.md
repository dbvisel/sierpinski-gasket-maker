# sierpinski gasketeer

This lets you makes variations on Sierpinski gaskets. It uses React-P5 to draw on canvas; the spine of the app is Create React App. Deployed version is at https://sierpinski.netlify.com. It was developed as part of a branding exercise.

## To do:

 * Settings should be saved in local storage & reloaded from local storage on reload.
 * Way to export image? I think this exists somewhere in P5.
 * Dealing with window size changes. Right now we get window size on initialization & we don't change it after that. The problem is that the P5 setup would need to be run again – can that be done? P5 isn't very React-y in this way.