import { CreateCustomerDto } from '../../domain/dtos/customer/create-customer.dto';
import { CustomerEntity } from '../../domain/entities/customer/create-customer.entity';

export const customerMapper = (
  createCustomerDto: CreateCustomerDto,
): CustomerEntity => {
  const customer = new CustomerEntity();
  customer.cpf = createCustomerDto.cpf;
  customer.name = createCustomerDto.name;
  customer.address = createCustomerDto.address;
  customer.uf = createCustomerDto.uf;
  customer.city = createCustomerDto.city;
  customer.cep = createCustomerDto.cep;
  customer.email = createCustomerDto.email;
  customer.password = createCustomerDto.password;
  customer.phone1 = createCustomerDto.phone1;
  customer.phone2 = createCustomerDto.phone2;
  customer.status = createCustomerDto.status;
  customer.createdAt = createCustomerDto.createdAt;
  customer.updatedAt = createCustomerDto.updatedAt;

  return customer;
};
