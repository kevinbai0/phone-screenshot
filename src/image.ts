import sharp from 'sharp';
import { IAssetDimension, getAssetDimensions, sizeClass } from './dimensions';
import { IPaths } from './path';

export const preprocessImage = (
  image: sharp.Sharp,
  assetDims: IAssetDimension
) => {
  const dimensionsOfIntendedAsset = getAssetDimensions(assetDims);
  const intendedRatio =
    dimensionsOfIntendedAsset.width / dimensionsOfIntendedAsset.height;
  const currentRatio =
    assetDims.originalDimensions.width / assetDims.originalDimensions.height;
  if (intendedRatio < currentRatio) {
    return image.resize({ height: getAssetDimensions(assetDims).height });
  }
  return image.resize({ width: getAssetDimensions(assetDims).width });
};

export const setDeviceMockup = async (image: sharp.Sharp, paths: IPaths) => {
  const { asset, sizeClass, originalDimensions } = await validateImage(image);

  const deviceMockup = paths.asset(asset, sizeClass);

  const imageBuffer = await preprocessImage(image, {
    asset,
    sizeClass,
    originalDimensions,
  }).toBuffer();

  return deviceMockup.composite([
    {
      input: imageBuffer,
      blend: 'dest-over',
    },
  ]);
};

const validateImage = async (image: sharp.Sharp) => {
  const meta = await image.metadata();
  if (!meta.width || !meta.height) {
    throw 'Image has invalid dimensions';
  }

  return sizeClass({
    width: meta.width,
    height: meta.height,
  });
};
