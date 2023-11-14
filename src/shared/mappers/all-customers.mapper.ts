import { CustomerEntity } from '../../domain/entities/customer/create-customer.entity';

export const allCustomersMapper = (
  allCustomers: Partial<CustomerEntity>[],
): CustomerEntity[] => {
  const customers = allCustomers.map((data) => {
    const customer = new CustomerEntity();
    customer.id = data.id;
    customer.cpf = data.cpf;
    customer.name = data.name;
    customer.address = data.address;
    customer.uf = data.uf;
    customer.city = data.city;
    customer.cep = data.cep;
    customer.email = data.email;
    customer.phone1 = data.phone1;
    customer.phone2 = data.phone2;
    customer.status = data.status;
    customer.createdAt = data.createdAt;
    customer.updatedAt = data.updatedAt;
    return customer;
  });
  return customers;
};
