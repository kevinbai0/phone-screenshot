#!/usr/bin/env node

import sharp from 'sharp';
import yargs from 'yargs';
import { sizeClass } from './dimensions';
import { preprocessImage } from './image';
import { paths } from './path';

main().catch(console.error).finally(process.exit);

async function main() {
  const argv = yargs(process.argv.slice(2)).options({
    filename: { type: 'string' }
  }).argv;

  if (!argv.filename) {
    throw 'No filename specified';
  }

  const handler = await paths();

  const image = sharp(argv.filename);
  const { asset, sizeClass } = await validateImage(image);

  const iPhoneX = handler.asset(asset, sizeClass);

  const imageBuffer = await preprocessImage(image, {asset, sizeClass}).toBuffer();

  const filename = argv.filename.split('.');
  await iPhoneX.composite([{
    input: imageBuffer,
    blend: 'dest-over'
  }]).toFile([...filename.slice(0, -1), 'out', ...filename.slice(-1)].join('.'))
}

const validateImage = async (image: sharp.Sharp) => {
  const meta = await image.metadata();
  if (!meta.width || !meta.height) {
    throw 'Image has invalid dimensions';
  }

  return sizeClass({
    width: meta.width,
    height: meta.height
  })
}
