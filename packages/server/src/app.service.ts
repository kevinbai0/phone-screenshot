import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import { ImageProcessing } from 'phone-screenshot';
import { BufferedFile } from './types/File';

@Injectable()
export class AppService {
  getRoot(): string {
    return 'Phone Screenshots API';
  }
  async applyMockup(file: BufferedFile) {
    const image = sharp(file.buffer);

    const finalImage = await ImageProcessing.setDeviceMockup(image);

    return finalImage.png().toBuffer();
  }
}
