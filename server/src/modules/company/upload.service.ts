import { Injectable, BadRequestException } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { memoryStorage } from 'multer';
import { extname } from 'path';
import { v4 } from 'uuid';

import { ConfigService } from '../../config/config.service';

@Injectable()
export class UploadService implements MulterOptionsFactory {
  path: string;
  constructor(private readonly configService: ConfigService) {
    this.path =
      this.configService.get('PWD') + this.configService.get('FILE_DEST');

    if (!existsSync(this.path)) mkdirSync(this.path);
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      limits: {
        fileSize: this.configService.get('FILE_LIMIT') * 1024 ** 2,
      },
      fileFilter: (_req, file, cb) => {
        const { mimetype } = file;
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

        if (allowedTypes.includes(mimetype)) return cb(null, true);
        return cb(new BadRequestException(`Unsupported ${mimetype}`), false);
      },
      storage: memoryStorage(),
    };
  }

  saveFile(file: any) {
    const fileName = v4() + extname(file.originalname);
    writeFileSync(this.path + fileName, file.buffer);
    return this.configService.get('FILE_DEST') + fileName;
  }
}
