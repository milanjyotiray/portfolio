const fs = require('fs');

// Create a valid 16x16 standard ICO file header 
const buffer = Buffer.alloc(318);

buffer.writeUInt16LE(0, 0); // Reserved
buffer.writeUInt16LE(1, 2); // Type 1 = ICO
buffer.writeUInt16LE(1, 4); // Image Count = 1

buffer.writeUInt8(16, 6);   // Width
buffer.writeUInt8(16, 7);   // Height
buffer.writeUInt8(0, 8);    // Color count
buffer.writeUInt8(0, 9);    // Reserved
buffer.writeUInt16LE(1, 10); // Color planes
buffer.writeUInt16LE(32, 12); // Bits per pixel
buffer.writeUInt32LE(40 + (16 * 16 * 4), 14); // Size of image data
buffer.writeUInt32LE(22, 18); // Offset to image data

// BITMAPINFOHEADER
buffer.writeUInt32LE(40, 22); // Header Size
buffer.writeInt32LE(16, 26);  // Width
buffer.writeInt32LE(16 * 2, 30); // Height (includes mask height)
buffer.writeUInt16LE(1, 34);  // Color Planes
buffer.writeUInt16LE(32, 36); // BPP
buffer.writeUInt32LE(0, 38);  // Compression
buffer.writeUInt32LE(16 * 16 * 4, 42); // Image Size
buffer.writeInt32LE(0, 46);   // X PPM
buffer.writeInt32LE(0, 50);   // Y PPM
buffer.writeUInt32LE(0, 54);  // Colors
buffer.writeUInt32LE(0, 58);  // Important Colors

// Image Data (A simple dark pixel to prevent transparency override)
let offset = 62;
for(let y=0; y<16; y++) {
    for(let x=0; x<16; x++) {
        buffer.writeUInt8(10, offset++); // B
        buffer.writeUInt8(10, offset++); // G
        buffer.writeUInt8(10, offset++); // R
        buffer.writeUInt8(255, offset++); // A
    }
}

fs.writeFileSync('favicon.ico', buffer);
