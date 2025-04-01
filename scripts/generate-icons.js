const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create a canvas for the icon
const canvas = createCanvas(512, 512);
const ctx = canvas.getContext('2d');

// Draw a simple farming icon
ctx.fillStyle = '#4CAF50'; // Green background
ctx.fillRect(0, 0, 512, 512);

// Draw a plant
ctx.fillStyle = '#2E7D32'; // Darker green for the plant
ctx.beginPath();
ctx.moveTo(256, 100);
ctx.lineTo(256, 400);
ctx.lineTo(200, 400);
ctx.lineTo(256, 300);
ctx.lineTo(312, 400);
ctx.lineTo(256, 400);
ctx.closePath();
ctx.fill();

// Save as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(path.join(__dirname, '../public/icon.png'), buffer);
fs.writeFileSync(path.join(__dirname, '../public/apple-icon.png'), buffer);

// Create a smaller version for favicon
const faviconCanvas = createCanvas(32, 32);
const faviconCtx = faviconCanvas.getContext('2d');

// Draw the same icon but smaller
faviconCtx.fillStyle = '#4CAF50';
faviconCtx.fillRect(0, 0, 32, 32);

faviconCtx.fillStyle = '#2E7D32';
faviconCtx.beginPath();
faviconCtx.moveTo(16, 6);
faviconCtx.lineTo(16, 25);
faviconCtx.lineTo(12, 25);
faviconCtx.lineTo(16, 19);
faviconCtx.lineTo(20, 25);
faviconCtx.lineTo(16, 25);
faviconCtx.closePath();
faviconCtx.fill();

// Save as ICO
const faviconBuffer = faviconCanvas.toBuffer('image/png');
fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), faviconBuffer);

console.log('Icons generated successfully!'); 