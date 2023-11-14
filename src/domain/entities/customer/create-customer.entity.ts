import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'customers' })
@Unique(['cpf'])
@Unique(['email'])
@Unique(['phone1'])
@Unique(['phone2'])
export class CustomerEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'cpf', length: 11, nullable: false })
  cpf: string;

  @Column({ name: 'name', length: 50, nullable: false })
  name: string;

  @Column({ name: 'address', length: 120, nullable: false })
  address: string;

  @Column({ name: 'state', length: 2, nullable: false })
  uf: string;

  @Column({ name: 'city', length: 50, nullable: false })
  city: string;

  @Column({ name: 'cep', length: 8, nullable: false })
  cep: string;

  @Column({ name: 'email', length: 30, nullable: false })
  email: string;

  @Column({ name: 'password', length: 255, nullable: false })
  password: string;

  @Column({ name: 'phone_1', length: 13, nullable: false })
  phone1: string;

  @Column({ name: 'phone_2', length: 13, nullable: false })
  phone2: string;

  @Column({ name: 'status', length: 8, nullable: false })
  status: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  updatedAt: Date;
}
