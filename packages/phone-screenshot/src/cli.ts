#!/usr/bin/env node

import sharp from 'sharp';
import yargs from 'yargs';
import { ImageProcessing } from '.';

main().catch(console.error).finally(process.exit);

async function main() {
  const argv = yargs(process.argv.slice(2)).options({
    _: { type: 'string' },
  }).argv;

  const filenames = argv._;

  if (!filenames.length) {
    throw 'No filename specified';
  }

  const outputs = filenames.map(async (filename) => {
    const image = sharp(filename);
    const fileSegments = filename.split('.');
    const outFilename = [
      ...fileSegments.slice(0, -1),
      'out',
      ...fileSegments.slice(-1),
    ].join('.');
    const output = await ImageProcessing.setDeviceMockup(image);
    return await output.toFile(outFilename);
  });

  await Promise.all(outputs);
}
