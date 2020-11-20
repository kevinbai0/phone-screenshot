#!/usr/bin/env node

import sharp from 'sharp';
import yargs from 'yargs';
import { setDeviceMockup } from './image';
import { paths } from './path';

main().catch(console.error).finally(process.exit);

async function main() {
  const argv = yargs(process.argv.slice(2)).options({
    _: { type: 'string' }
  }).argv;


  const filenames = argv._;

  if (!filenames.length) {
    throw 'No filename specified';
  }
  
  const handler = await paths();

  const outputs = filenames.map(async filename => {
    const image = sharp(filename);
    const outFilename = [...filename.slice(0, -1), 'out', ...filename.slice(-1)].join('.');
    const output = await setDeviceMockup(image, handler)
    return await output.toFile(outFilename)
  })

  await Promise.all(outputs);
}
