import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = String.raw`C:\Users\Manish Bisai\.gemini\antigravity-ide\scratch\eye-visualization\original_frames`;
const outputDir = String.raw`C:\Users\Manish Bisai\.gemini\antigravity-ide\scratch\eye-visualization\app\public\eye-frames-clean`;

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png')).sort();

async function processFrames() {
  console.log(`Starting to process ${files.length} frames...`);
  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const frameNumber = i + 1;
    const inputPath = path.join(inputDir, filename);
    const outputFilename = `frame_${String(frameNumber).padStart(4, '0')}.webp`;
    const outputPath = path.join(outputDir, outputFilename);
    
    await sharp(inputPath)
      .webp({ quality: 90 })
      .toFile(outputPath);
      
    if (frameNumber % 20 === 0 || frameNumber === files.length) {
      console.log(`Processed ${frameNumber}/${files.length} frames`);
    }
  }
  console.log('All done!');
}

processFrames().catch(console.error);
