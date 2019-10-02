import { internet, phone } from 'faker';
import { EmployeeRequestDTO } from '../../src/modules/employee/dto/employee.dto';

export class GenerateEmployee implements EmployeeRequestDTO {
  constructor(company: number) {
    this.company = company;
  }

  email: string = internet.email();
  firstName: string = internet.userName();
  lastName: string = internet.userName();
  phone: string = '+380995446020';
  company: number;
}

export class GenerateBadEmployee implements GenerateEmployee {
  constructor(company: number) {
    this.company = company;
  }

  email: any = 1111111111111;
  firstName: string = internet.userName();
  lastName: string = internet.userName();
  phone: string = phone.phoneNumber('0');
  company: number;
}
