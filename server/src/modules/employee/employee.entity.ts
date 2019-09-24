import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { CompanyEntity } from '../company/company.entity';

@Entity('Employee')
export class EmployeeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'firstName',
  })
  firstName: string;

  @Column('varchar', {
    nullable: false,
    name: 'lastName',
  })
  lastName: string;

  @Column('varchar', {
    nullable: true,
    unique: true,
    name: 'email',
  })
  email: string;

  @Column('varchar', {
    nullable: true,
    unique: true,
    name: 'phone',
  })
  phone: string;

  @ManyToOne(_type => CompanyEntity, company => company.employees, {
    nullable: false,
  })
  company: CompanyEntity;

  @Column('datetime', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'createAt',
  })
  createAt: Date;

  @Column('datetime', {
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updateAt',
  })
  updateAt: Date;
}
