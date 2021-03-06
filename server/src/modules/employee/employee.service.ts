import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { PaginationRequestDTO } from './dto/pagination.dto';
import { EmployeeRequestDTO } from './dto/employee.dto';
import { EmployeeEntity } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async createOne(employee: EmployeeRequestDTO): Promise<EmployeeEntity> {
    return await this.employeeRepository.save(employee);
  }

  async selectAll(
    options: PaginationRequestDTO,
  ): Promise<[EmployeeEntity[], number]> {
    return await this.employeeRepository.findAndCount(options);
  }

  async selectOneByID(id: number): Promise<EmployeeEntity> {
    return await this.employeeRepository.findOneOrFail(id);
  }

  async updateOne(
    employee: EmployeeEntity,
    newEmployee: EmployeeRequestDTO,
  ): Promise<EmployeeEntity> {
    await this.employeeRepository.merge(employee, newEmployee);
    return await this.employeeRepository.save(employee);
  }

  async deleteOne(id: number): Promise<DeleteResult> {
    return await this.employeeRepository.delete(id);
  }
}
