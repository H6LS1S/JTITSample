import { internet } from 'faker';
import { CompanyRequestDTO } from '../../src/modules/company/dto/company.dto';

export class GenerateCompany implements CompanyRequestDTO {
  name: string = internet.userName();
  email: string = internet.email();
  website: string = internet.url();
}

export class GenerateBadCompany implements GenerateCompany {
  name: string = internet.userName();
  email: string = internet.email();
  website: string = internet.email();
}
