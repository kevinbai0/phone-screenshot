import sharp from "sharp";
import { IAssetDimension, getAssetDimensions, sizeClass } from './dimensions';
import { IPaths } from './path';

export const preprocessImage = (image: sharp.Sharp, assetDims: IAssetDimension) => {
  return image.resize(getAssetDimensions(assetDims).width)
}

export const setDeviceMockup = async (image: sharp.Sharp, paths: IPaths) => {
  const { asset, sizeClass } = await validateImage(image);

  const deviceMockup = paths.asset(asset, sizeClass);

  const imageBuffer = await preprocessImage(image, {asset, sizeClass}).toBuffer();

  return deviceMockup.composite([{
    input: imageBuffer,
    blend: 'dest-over'
  }])
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
