import fs from 'fs';
import zlib from 'zlib';

const buffer = fs.readFileSync('C:\\Users\\asus\\.gemini\\antigravity-ide\\brain\\f05e5a4d-bec5-4727-bd1f-c0c1aaa27512\\media__1782818897507.png');

let pos = 8;
let width = 0;
let height = 0;
let idatBuffers = [];

while (pos < buffer.length) {
  const length = buffer.readUInt32BE(pos);
  const type = buffer.toString('ascii', pos + 4, pos + 8);
  if (type === 'IHDR') {
    width = buffer.readUInt32BE(pos + 8);
    height = buffer.readUInt32BE(pos + 12);
  } else if (type === 'IDAT') {
    idatBuffers.push(buffer.subarray(pos + 8, pos + 8 + length));
  }
  pos += 8 + length + 4;
}

const idatConcat = Buffer.concat(idatBuffers);
const inflated = zlib.inflateSync(idatConcat);

// Defilter PNG scanlines
const bpp = 4; // RGBA
const rowBytes = width * bpp;
const pixelData = Buffer.alloc(width * height * bpp);

let inflatedPos = 0;
for (let y = 0; y < height; y++) {
  const filterType = inflated[inflatedPos++];
  const rowStart = y * rowBytes;
  const prevRowStart = (y - 1) * rowBytes;

  for (let x = 0; x < rowBytes; x++) {
    const rawVal = inflated[inflatedPos++];
    let reconVal = 0;

    const left = x >= bpp ? pixelData[rowStart + x - bpp] : 0;
    const up = y > 0 ? pixelData[prevRowStart + x] : 0;
    const upLeft = (x >= bpp && y > 0) ? pixelData[prevRowStart + x - bpp] : 0;

    if (filterType === 0) { // None
      reconVal = rawVal;
    } else if (filterType === 1) { // Sub
      reconVal = (rawVal + left) & 0xff;
    } else if (filterType === 2) { // Up
      reconVal = (rawVal + up) & 0xff;
    } else if (filterType === 3) { // Average
      reconVal = (rawVal + Math.floor((left + up) / 2)) & 0xff;
    } else if (filterType === 4) { // Paeth
      const p = left + up - upLeft;
      const pa = Math.abs(p - left);
      const pb = Math.abs(p - up);
      const pc = Math.abs(p - upLeft);
      let pEst = 0;
      if (pa <= pb && pa <= pc) {
        pEst = left;
      } else if (pb <= pc) {
        pEst = up;
      } else {
        pEst = upLeft;
      }
      reconVal = (rawVal + pEst) & 0xff;
    }
    pixelData[rowStart + x] = reconVal;
  }
}

// Now analyze correct pixelData
let alphaHistogram = {};
let colorHistogram = {};

for (let i = 0; i < pixelData.length; i += 4) {
  const r = pixelData[i];
  const g = pixelData[i + 1];
  const b = pixelData[i + 2];
  const a = pixelData[i + 3];
  alphaHistogram[a] = (alphaHistogram[a] || 0) + 1;
  const rgbKey = `${r},${g},${b}`;
  colorHistogram[rgbKey] = (colorHistogram[rgbKey] || 0) + 1;
}

console.log('Alpha histogram (defiltered):', alphaHistogram);
console.log('Total pixels:', width * height);
const sortedColors = Object.entries(colorHistogram).sort((a, b) => b[1] - a[1]).slice(0, 10);
console.log('Top 10 colors (defiltered):', sortedColors);
