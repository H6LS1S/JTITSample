import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

import { ConfigService } from '../../config/config.service';

import { UserRequestDTO } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(payload: UserRequestDTO): Promise<any> {
    return {
      expiresIn: this.configService.get('JWT_EXPIRES_TIME'),
      token: this.jwtService.sign({ ...payload }),
    };
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }

  async validateUser(payload: UserRequestDTO): Promise<UserEntity> {
    return await this.userService.selectOne(payload).catch(() => {
      throw new UnauthorizedException();
    });
  }
}
