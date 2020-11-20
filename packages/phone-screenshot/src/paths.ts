import path from 'path';
import sharp from 'sharp';
import { Assets } from './dimensions';

const assetsPath = path.resolve(__dirname, '..', 'assets');

export const getAsset = (asset: Assets, size: '1x' | '2x' | '3x' = '1x') => {
  const filename = `${asset}${size === '1x' ? '' : `@${size}`}.png`;
  return sharp(path.resolve(assetsPath, filename));
};
