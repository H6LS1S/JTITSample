import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { EmployeeEntity } from '../employee/employee.entity';

@Entity('Company')
export class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
    unique: true,
    name: 'name',
  })
  name: string;

  @Column('varchar', {
    nullable: false,
    unique: true,
    name: 'email',
  })
  email: string;

  @Column('varchar', {
    nullable: true,
    name: 'logotype',
  })
  logotype: string;

  @Column('varchar', {
    nullable: true,
    name: 'website',
  })
  website: string;

  @ManyToOne(_type => UserEntity, user => user.companies, {
    nullable: false,
  })
  @JoinColumn({ name: 'owner' })
  owner: UserEntity;

  @JoinColumn()
  @OneToMany(_type => EmployeeEntity, employee => employee.company, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  employees: EmployeeEntity[];

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
