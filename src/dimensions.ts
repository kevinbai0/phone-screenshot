import { Identifier } from "typescript";

const Assets = {
  iPhone8: 'iPhone8',
  iPhoneX: 'iPhoneX',
  iPhone12: 'iPhone12',
  iPhone8Plus: 'iPhone8Plus',
  iPhone11: 'iPhone11',
  iPhone12Max: 'iPhone12Max'
} as const;
export type Assets = keyof typeof Assets;

export interface IDimension {
  width: number;
  height: number;
}

export interface IAssetDimension {
  asset: Assets
  sizeClass: '1x' | '2x' | '3x'
};

export const dimensions: Record<Assets, IDimension> = {
  iPhone8: {
    width: 375,
    height: 667,
  },
  iPhoneX: {
    width: 375,
    height: 812
  },
  iPhone12: {
    width: 390,
    height: 844
  },
  iPhone8Plus: {
    width: 414,
    height: 736
  },
  iPhone11: {
    width: 414,
    height: 896
  },
  iPhone12Max: {
    width: 428,
    height: 926,
  },
} as const;

const matchDimensionClass = (dim: IDimension): Assets => {
  const currDimensions = (dim.width / dim.height).toFixed(5);
  const entry = Object.entries(dimensions).find(([key, dimension]) => {
    return currDimensions === (dimension.width / dimension.height).toFixed(5);
  })

  if (!entry) {
    throw new Error(`Dimensions ${dim} does not match any asset`);
  }

  return entry[0] as Assets
}

export const sizeClass = (dims: IDimension): IAssetDimension => {
  const asset = matchDimensionClass(dims)

  const assetDims = dimensions[asset];
  const ratio = dims.width / assetDims.width;
  if (ratio < 1) {
    throw new Error(`Image is too small for asset ${asset}`);
  }
  if (ratio < 2) {
    return {
      sizeClass: '1x',
      asset
    }
  }
  else if (ratio < 3) {
    return {
      sizeClass: '2x',
      asset
    }
  }
  return {
    sizeClass: '3x',
    asset
  }
}

export const scale = (dimension: IDimension, sizeClass: '1x' | '2x' | '3x'): IDimension => {
  const multipler = parseInt(sizeClass);

  return {
    width: dimension.width * multipler,
    height: dimension.height * multipler
  }
}