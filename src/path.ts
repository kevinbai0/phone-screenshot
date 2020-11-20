import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { Assets } from './dimensions';

const assetsPath = path.resolve(__dirname, '..', 'assets');

export interface IPaths {
  asset: (asset: Assets, size?: '1x' | '2x' | '3x') => sharp.Sharp;
  readonly assets: string[];
}

export const paths = async (): Promise<IPaths> => {
  const getAssets = async () => {
    return await fs.promises.readdir(assetsPath);
  };
  const assets = await getAssets();

  return {
    asset: (asset: Assets, size: '1x' | '2x' | '3x' = '1x') => {
      const filename = assets.find((value) => {
        if (size === '1x') {
          return value.startsWith(asset) && value.search(/@[23]x/g) === -1;
        }
        return value.startsWith(asset) && value.includes(`@${size}`);
      });
      if (!filename) {
        throw new Error(`Asset ${asset} @${size} could not be found`);
      }
      return sharp(path.resolve(assetsPath, filename));
    },
    get assets() {
      return assets;
    },
  };
};
