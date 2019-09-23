import { internet } from 'faker';
import { UserRequestDTO } from '../../src/modules/user/dto/user.dto';

export class GenerateUser implements UserRequestDTO {
  email: string = internet.email();
  password: string = internet.password();
}

export class GenerateBadUser implements GenerateUser {
  email: any = 111111;
  password: string = internet.password(1);
}
