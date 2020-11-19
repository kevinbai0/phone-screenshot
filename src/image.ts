import sharp from "sharp";
import { disposeEmitNodes } from "typescript";
import { IAssetDimension, dimensions, scale } from './dimensions';

export const preprocessImage = (image: sharp.Sharp, assetDims: IAssetDimension) => {
  const deviceDims = scale((() => {
    // temporary until find a proper iPhone 11 size
    if (assetDims.asset === 'iPhone11') {
      return dimensions.iPhoneX;
    }
    return dimensions[assetDims.asset];
  })(), assetDims.sizeClass)

  return image.resize(deviceDims.width)
}