#!/usr/bin/env node

import sharp from 'sharp';
import yargs from 'yargs';
import { sizeClass } from './dimensions';
import { preprocessImage, setDeviceMockup } from './image';
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
  const filename = argv.filename.split('.');
  const outFilename = [...filename.slice(0, -1), 'out', ...filename.slice(-1)].join('.');
  const output = await setDeviceMockup(image, handler)
  await output.toFile(outFilename)
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
