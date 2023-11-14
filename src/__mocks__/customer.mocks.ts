import { CustomerEntity } from '../domain/entities/customer/create-customer.entity';
import { CreateCustomerDto } from '../domain/dtos/customer/create-customer.dto';

const createDate = new Date();
const updateDate = new Date();

export const customerEntityMock = new CustomerEntity();
customerEntityMock.cpf = '05009539020';
customerEntityMock.name = 'John Doe';
customerEntityMock.address = 'Doe Stree';
customerEntityMock.uf = 'BA';
customerEntityMock.city = 'Salvador';
customerEntityMock.cep = '40000000';
customerEntityMock.email = 'john@contoso.com';
customerEntityMock.password = 'P@ssword10';
customerEntityMock.phone1 = '5571928343960';
customerEntityMock.phone2 = '5571985474182';
customerEntityMock.status = 'ativo';
customerEntityMock.createdAt = createDate;
customerEntityMock.updatedAt = updateDate;

export const customerDtoMock: CreateCustomerDto = {
  cpf: '05009539020',
  name: 'John Doe',
  address: 'Doe Stree',
  uf: 'BA',
  city: 'Salvador',
  cep: '40000000',
  email: 'john@contoso.com',
  password: 'P@ssword10',
  passwordConfirmation: 'P@ssword10',
  phone1: '5571928343960',
  phone2: '5571985474182',
  status: 'ativo',
  createdAt: createDate,
  updatedAt: updateDate,
};

export const customerMappedMock = {
  id: 1,
  cpf: '05009539020',
  name: 'John Doe',
  address: 'Doe Stree',
  uf: 'BA',
  city: 'Salvador',
  cep: '40000000',
  email: 'john@contoso.com',
  password: 'P@ssword10',
  passwordConfirmation: 'P@ssword10',
  phone1: '5571928343960',
  phone2: '5571985474182',
  status: 'ativo',
  createdAt: createDate,
  updatedAt: updateDate,
};

export const createCustomerMock = (
  field: keyof CreateCustomerDto,
): CreateCustomerDto => {
  return {
    ...customerDtoMock,
    [field]: '',
  };
};

export const customerResolveMock = {
  id: 1,
  name: 'John Doe',
  email: 'john@contoso.com',
};

export const customerResponseMock = {
  status: 201,
  message: 'Cadastrado com sucesso',
  data: {
    id: 1,
    name: 'John Doe',
    email: 'john@contoso.com',
  },
};

export const responseControllerMock = {
  json: jest.fn((response) => response),
  status: jest.fn(() => ({ json: jest.fn() })),
} as any;

export const allCustomersMock = [
  {
    id: 1,
    cpf: '05009539020',
    name: 'John Doe',
    address: 'Doe Stree',
    uf: 'BA',
    city: 'Salvador',
    cep: '40000000',
    email: 'john@contoso.com',
    phone1: '5571928343960',
    phone2: '5571985474182',
    status: 'ativo',
    createdAt: createDate,
    updatedAt: updateDate,
  },
  {
    id: 2,
    cpf: '53651867021',
    name: 'Darth Vader',
    address: 'Darth Street',
    uf: 'BA',
    city: 'Salvador',
    cep: '40000000',
    email: 'darth@contoso.com',
    phone1: '5571928343980',
    phone2: '5571985474152',
    status: 'ativo',
    createdAt: createDate,
    updatedAt: updateDate,
  },
];
