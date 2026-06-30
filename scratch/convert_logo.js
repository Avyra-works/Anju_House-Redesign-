import fs from 'fs';
import zlib from 'zlib';

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

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

const bpp = 4;
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

    if (filterType === 0) {
      reconVal = rawVal;
    } else if (filterType === 1) {
      reconVal = (rawVal + left) & 0xff;
    } else if (filterType === 2) {
      reconVal = (rawVal + up) & 0xff;
    } else if (filterType === 3) {
      reconVal = (rawVal + Math.floor((left + up) / 2)) & 0xff;
    } else if (filterType === 4) {
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

// Convert: White background -> Transparent, Black logo -> White (or maintain transparency)
// For each pixel, we set color to White (255,255,255) and alpha to (255 - average_brightness)
const outInflated = Buffer.alloc(height * (rowBytes + 1));
let outPos = 0;

for (let y = 0; y < height; y++) {
  outInflated[outPos++] = 0; // Filter method 0 (None)
  const rowStart = y * rowBytes;
  
  for (let x = 0; x < width; x++) {
    const px = rowStart + x * 4;
    const r = pixelData[px];
    const g = pixelData[px + 1];
    const b = pixelData[px + 2];
    
    // Average brightness
    const brightness = (r + g + b) / 3;
    
    // Transparent threshold: if it's very white (background)
    // Anti-aliased transition: alpha is 255 - brightness
    let alpha = 255 - brightness;
    if (brightness > 240) {
      alpha = 0;
    } else if (brightness < 40) {
      alpha = 255;
    }
    
    // Monochrome light version: lines are White (255, 255, 255)
    outInflated[outPos++] = 255; // R
    outInflated[outPos++] = 255; // G
    outInflated[outPos++] = 255; // B
    outInflated[outPos++] = Math.round(alpha); // A
  }
}

// Deflate the new pixel data
const outIdatData = zlib.deflateSync(outInflated);

// Construct new PNG file
const chunks = [];

// PNG signature
chunks.push(Buffer.from('89504e470d0a1a0a', 'hex'));

// IHDR chunk
const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(width, 0);
ihdrData.writeUInt32BE(height, 4);
ihdrData[8] = 8; // bit depth
ihdrData[9] = 6; // color type (RGBA)
ihdrData[10] = 0; // compression
ihdrData[11] = 0; // filter
ihdrData[12] = 0; // interlace

const ihdrHeader = Buffer.from('IHDR');
const ihdrLength = Buffer.alloc(4);
ihdrLength.writeUInt32BE(ihdrData.length, 0);
const ihdrCRC = Buffer.alloc(4);
ihdrCRC.writeUInt32BE(crc32(Buffer.concat([ihdrHeader, ihdrData])), 0);
chunks.push(ihdrLength, ihdrHeader, ihdrData, ihdrCRC);

// IDAT chunk
const idatHeader = Buffer.from('IDAT');
const idatLength = Buffer.alloc(4);
idatLength.writeUInt32BE(outIdatData.length, 0);
const idatCRC = Buffer.alloc(4);
idatCRC.writeUInt32BE(crc32(Buffer.concat([idatHeader, outIdatData])), 0);
chunks.push(idatLength, idatHeader, outIdatData, idatCRC);

// IEND chunk
const iendHeader = Buffer.from('IEND');
const iendLength = Buffer.alloc(4); // 0 length
const iendCRC = Buffer.alloc(4);
iendCRC.writeUInt32BE(crc32(iendHeader), 0);
chunks.push(iendLength, iendHeader, iendCRC);

const finalPng = Buffer.concat(chunks);
fs.writeFileSync('c:\\Users\\asus\\Desktop\\Anju_house(Redesign)\\src\\assets\\logo-light.png', finalPng);
fs.writeFileSync('c:\\Users\\asus\\Desktop\\Anju_house(Redesign)\\public\\logo-light.png', finalPng);

console.log('Saved converted logo-light.png successfully!');
