import { internet, phone } from 'faker';
import { EmployeeRequestDTO } from '../../src/modules/employee/dto/employee.dto';

export class GenerateEmployee implements EmployeeRequestDTO {
  constructor(company: number) {}

  email: string = internet.email();
  firstName: string = internet.userName()
  lastName: string = internet.userName()
  phone: string = phone.phoneNumber('1')
  company: number
}

export class GenerateBadEmployee implements GenerateEmployee {
  constructor(company: number) {}
  
  email: any = 1111111111111;
  firstName: string = internet.userName()
  lastName: string = internet.userName()
  phone: string = phone.phoneNumber('1')
  company: number
}
