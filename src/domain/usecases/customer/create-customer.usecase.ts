import { CreateCustomerDto } from '../../../domain/dtos/customer/create-customer.dto';

export interface CreateCustomer {
  create: (customer: CreateCustomerDto) => Promise<CreateCustomer.Result>;
}

export namespace CreateCustomer {
  export interface Result {
    id?: number;
    name: string;
    email: string;
  }
}
