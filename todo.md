# Todo

- [ ] add leader board

- [x] fixed vertical overflow

- [x] What if for #backdrop you deleted the JS code related to hue-rotate? You are not changing backgroundHueRotateSpeed, and even if you were, using a CSS variable would be cleaner. So, I suggest to refactor it, and just use a CSS animation that runs infinitely.

- [x] I think using event listeners would be cleaner than using onClick. Either way, for a project like this, I think it doesn't matter that much. 😅 But from now on you'll pretty much have to always use addEventListener mostly in Vanilla JS.

- [x] You created draw and drawAi. I haven't checked out them thoroughly, though, they look really similar. Maybe, they can be simplified into one, and the differences could be handled by CSS variables that could change depending on a class or attribute value. Not a big deal here, but more important when you have lots of animations that are basically just the same, though only have subtle differences.
- [x] clear interval in renderFx
