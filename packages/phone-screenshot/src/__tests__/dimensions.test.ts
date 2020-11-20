import {
  Assets,
  Device,
  getDeviceDimensions,
  scale,
  sizeClass,
} from '../dimensions';

function testPhone(device: Device, toBe: Assets) {
  expect(sizeClass(scale(getDeviceDimensions(device), '3x'))).toEqual({
    asset: toBe,
    sizeClass: '3x',
  });

  expect(sizeClass(scale(getDeviceDimensions(device), '2x'))).toEqual({
    asset: toBe,
    sizeClass: '2x',
  });

  expect(sizeClass(getDeviceDimensions(device))).toEqual({
    asset: toBe,
    sizeClass: '1x',
  });
}

test('Size classing works', () => {
  testPhone('iPhone 11', 'iPhoneTall414');
  testPhone('iPhone 11 Pro', 'iPhoneTall375');
  testPhone('iPhone 11 Pro Max', 'iPhoneTall414');

  testPhone('iPhone 8', 'iPhoneShort375');
  testPhone('iPhone 8 Plus', 'iPhoneShort414');
  testPhone('iPhone SE', 'iPhoneShort375');

  testPhone('iPhone 12 Mini', 'iPhoneTall375');
  testPhone('iPhone 12', 'iPhoneTall390');
  testPhone('iPhone 12 Pro', 'iPhoneTall390');
  testPhone('iPhone 12 Pro Max', 'iPhoneTall428');
});
