import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { PaginationRequestDTO } from './dto/pagination.dto';
import { CompanyRequestDTO } from './dto/company.dto';
import { CompanyEntity } from './company.entity';

import { UserEntity } from '../user/user.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async createOne(
    company: CompanyRequestDTO,
    owner: UserEntity,
  ): Promise<CompanyEntity> {
    return await this.companyRepository.save({ ...company, owner });
  }

  async selectAll(
    options: PaginationRequestDTO,
  ): Promise<[CompanyEntity[], number]> {
    return await this.companyRepository.findAndCount(options);
  }

  async selectOneByID(id: number): Promise<CompanyEntity> {
    return await this.companyRepository.findOneOrFail(id);
  }

  async updateOne(
    company: CompanyEntity,
    newCompany: CompanyRequestDTO,
  ): Promise<CompanyEntity> {
    await this.companyRepository.merge(company, newCompany);
    return await this.companyRepository.save(company);
  }

  async deleteOne(id: number): Promise<DeleteResult> {
    return await this.companyRepository.delete(id);
  }
}
