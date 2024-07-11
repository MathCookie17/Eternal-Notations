# Eternal Notations Changelog

### v1.0.x

v1.0.9 (July 10, 2024): Made some small changes to account for the fact that there's an NPM package now, like adding a gitignore file

v1.0.8 (June 27, 2024): Fixed a bug (seemingly introduced in v1.0.7) where Omega Layers wasn't formatting 1 correctly, and finally updated this changelog (I've been forgetting to do this since v1.0.1)

v1.0.7 (June 24, 2024): Fixed a mismatched parenthesis in Hypersplit, and updated the library to use break_eternity 2.0.0 instead of 1.4.2 (1.4.2 should still work with the library, but now 2.0.0 is the recommended version).

v1.0.6 (May 9, 2024): Fixed a bug where (thanks to a bug in break_eternity at the time) -Infinity didn't work in many notations.

v1.0.5 (May 9, 2024): Fixed a bug with Standard Notation and made Prestige Layer's getLayer method work properly on layers below 10.

v1.0.4 (April 28, 2024): Fixed a few more random "some notation crashes at a very specific value" bugs, and added a testing script to catch these bugs more efficiently in the future.

v1.0.3 (April 26, 2024): Fixed a bug with Polygonal notation.

v1.0.2 (April 25, 2024): Fixed a bug with Polynomial notation at F9e15.

v1.0.1 (April 23, 2024): Fixed two bugs: ee126 wasn't working in Mixed Scientific (Long Scale), and F9e15 wasn't working in several presets.

v1.0 (April 21, 2024): Initial release. Includes 124 presets and 49 notations.