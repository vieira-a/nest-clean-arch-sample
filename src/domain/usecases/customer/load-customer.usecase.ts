import { CustomerEntity } from '../../../domain/entities/customer/create-customer.entity';

export interface LoadCustomer {
  load: (
    params: LoadCustomerByParams.Params,
  ) => Promise<LoadCustomerByParams.Result | null>;
}

export namespace LoadCustomerByParams {
  export interface Params extends Partial<CustomerEntity> {
    cpf?: string;
    email?: string;
    phone?: string;
  }

  export interface Result
    extends Pick<CustomerEntity, 'id' | 'name' | 'email'> {
    id: number;
    name: string;
    email: string;
  }
}
