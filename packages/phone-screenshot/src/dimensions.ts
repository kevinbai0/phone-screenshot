const Assets = {
  iPhoneShort375: 'iPhoneShort375',
  iPhoneTall375: 'iPhoneTall375',
  iPhoneTall390: 'iPhoneTall390',
  iPhoneShort414: 'iPhoneShort414',
  iPhoneTall414: 'iPhoneTall414',
  iPhoneTall428: 'iPhoneTall428',
} as const;
export type Assets = keyof typeof Assets;

export type Device =
  | 'iPhone SE'
  | 'iPhone 8'
  | 'iPhone 8 Plus'
  | 'iPhone 11'
  | 'iPhone 11 Pro'
  | 'iPhone 11 Pro Max'
  | 'iPhone 12 Mini'
  | 'iPhone 12'
  | 'iPhone 12 Pro'
  | 'iPhone 12 Pro Max';

export interface IDimension {
  width: number;
  height: number;
}

export interface IAssetDimension {
  asset: Assets;
  sizeClass: '1x' | '2x' | '3x';
  originalDimensions: IDimension;
}

const dimensions: Record<Assets, IDimension> = {
  // ratio: 0.5622188906
  iPhoneShort375: {
    width: 375,
    height: 667,
  },
  // ratio: 0.4618226601
  iPhoneTall375: {
    width: 375,
    height: 812,
  },
  // ratio: 0.4620853081
  iPhoneTall390: {
    width: 390,
    height: 844,
  },
  // ratio: 0.5625000000
  iPhoneShort414: {
    width: 414,
    height: 736,
  },
  // ratio: 0.4620535714
  iPhoneTall414: {
    width: 414,
    height: 896,
  },
  // ratio: 0.4622030238
  iPhoneTall428: {
    width: 428,
    height: 926,
  },
} as const;

const DeviceDimensions: Record<Device, Assets> = {
  'iPhone 8': 'iPhoneShort375',
  'iPhone 8 Plus': 'iPhoneShort414',
  'iPhone 11': 'iPhoneTall414',
  'iPhone 11 Pro': 'iPhoneTall375',
  'iPhone 11 Pro Max': 'iPhoneTall414',
  'iPhone SE': 'iPhoneShort375',
  'iPhone 12 Mini': 'iPhoneTall375',
  'iPhone 12': 'iPhoneTall390',
  'iPhone 12 Pro': 'iPhoneTall390',
  'iPhone 12 Pro Max': 'iPhoneTall428',
};

const matchDimensionClass = (dim: IDimension): Assets => {
  const currDimensions = (dim.width / dim.height).toFixed(6);
  const entry = Object.entries(dimensions).find(([, dimension]) => {
    return currDimensions === (dimension.width / dimension.height).toFixed(6);
  });

  if (!entry) {
    throw new Error(`Dimensions ${dim} does not match any asset`);
  }

  // Temporary hard code since only have iPhone 375x812
  if (entry[0].includes('Tall')) {
    return 'iPhoneTall375';
  }

  return entry[0] as Assets;
};

export const getDeviceDimensions = (device: Device) => {
  return dimensions[DeviceDimensions[device]];
};

export const getAssetDimensions = (assetDims: IAssetDimension) => {
  return scale(dimensions[assetDims.asset], assetDims.sizeClass);
};

export const sizeClass = (dims: IDimension): IAssetDimension => {
  const asset = matchDimensionClass(dims);

  const assetDims = dimensions[asset];
  const ratio = dims.width / assetDims.width;
  if (ratio < 1) {
    throw new Error(`Image is too small for asset ${asset}`);
  }
  if (ratio < 2) {
    return {
      sizeClass: '1x',
      asset,
      originalDimensions: dims,
    };
  } else if (ratio < 3) {
    return {
      sizeClass: '2x',
      asset,
      originalDimensions: dims,
    };
  }
  return {
    sizeClass: '3x',
    asset,
    originalDimensions: dims,
  };
};

export const scale = (
  dimension: IDimension,
  sizeClass: '1x' | '2x' | '3x'
): IDimension => {
  const multipler = parseInt(sizeClass);

  return {
    width: dimension.width * multipler,
    height: dimension.height * multipler,
  };
};
