import { CustomerEntity } from '../../../domain/entities/customer/create-customer.entity';

export interface LoadAllCustomersUsecase {
  load: () => Promise<LoadAllCustomers.Result[] | null>;
}

export namespace LoadAllCustomers {
  export interface Params extends Partial<CustomerEntity> {
    uf?: string;
    city?: string;
    status?: string;
  }

  export interface Result extends Partial<CustomerEntity> {
    id: number;
    cpf: string;
    name: string;
    address: string;
    uf: string;
    city: string;
    cep: string;
    email: string;
    phone1: string;
    phone2: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }
}
