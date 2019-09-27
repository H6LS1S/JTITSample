import { Controller, UnauthorizedException, Body, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { JwtStrategy } from './strateges/jwt.strategy';
import { AuthService } from './auth.service';

import { UserRequestDTO } from '../user/dto/user.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  @Post()
  async create(@Body() payload: UserRequestDTO): Promise<any> {
    const user = await this.jwtStrategy.validate(payload);
    if (await this.authService.compareHash(payload.password, user.password)) {
      return await this.authService.createToken(user);
    }
    throw new UnauthorizedException();
  }
}
