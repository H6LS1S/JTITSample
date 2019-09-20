import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'dotenv';

import { EnvConfig } from './interfaces/envConfig.interface';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor() {
    this.envConfig = {
      ...process.env,
      ...parse(readFileSync(`${process.env.NODE_ENV}.env`)),
    };
  }

  get(key: string): any {
    const variable = this.envConfig[key];

    if (variable === undefined) {
      return undefined;
    }

    if (/true|false/.test(variable)) {
      return Boolean(variable);
    }

    if (!Number.isNaN(+variable)) {
      return +variable;
    }

    return this.envConfig[key];
  }
}
