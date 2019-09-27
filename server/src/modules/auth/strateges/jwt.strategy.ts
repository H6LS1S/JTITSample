import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { ConfigService } from '../../../config/config.service';

import { AuthService } from '../auth.service';

import { UserRequestDTO } from '../../user/dto/user.dto';
import { UserEntity } from '../../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: UserRequestDTO): Promise<UserEntity> {
    return await this.authService.validateUser(payload);
  }
}
