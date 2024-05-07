# hexToRgba.js
A hex to RGBA function that uses too many bitwise operations.

## Why
1. Because it's fun.
2. Because of this [tweet][1]

## Install & Usage
```sh
npm install @voxelprismatic/hextorgba
```
```js
const hexToRgba = require("@voxelprismatic/hextorgba");
// Automatically converts to 8bit wide channels
[R, G, B, A] = hexToRgba("#0ff");

// Still 8bit wide channels
[R, G, B, A] = hexToRgba("#00FFFF88");

// Even supports 12bit wide channels!
[R, G, B, A] = hexToRgba("#000FFF888");

// If no alpha channel exists, like in examples 1 and 3, alpha will be
// set to 100%. The true value depends on the bit depth, eg 255 or 4095.

// rgb(4095 0 2184 / 66.67%)
css = hexToRgba("#fff000888aaa", "css")

// { R: 4095, G: 0, B: 2184, A: 2730 }
hexToRgba("#fff000888aaa", "object")

// [ 1, 0, 0.5333333333333333, 0.6666666666666666 ]
hexToRgba("#fff000888aaa", "percent")
```

## Performance
I ran this on my galaxy s22 while on a zoom call. You will
absolutely get better performance than this.
```js
console.time("timer");
var count = Math.pow(2, 16);
while(count--)
    hexToRgba("#00ffff");
console.timeEnd("timer");
```
Gets anywhere from 38ms to 50ms, regardless of format.

[1]: https://twitter.com/the_moisrex/status/1787444601571221892?s=19
