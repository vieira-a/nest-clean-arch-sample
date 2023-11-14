import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BcryptService } from '../../shared/criptography/bcrypt.service';
import {
  CreateCustomerService,
  LoadCustomerByCpfService,
  LoadCustomerByEmailService,
  LoadCustomerByPhoneService,
} from '../../services/customer';
import { CustomerEntity } from '../../domain/entities/customer/create-customer.entity';
import {
  customerDtoMock,
  customerEntityMock,
  customerMappedMock,
  customerResolveMock,
} from '../../__mocks__/customer.mocks';
import { ConflictException } from '@nestjs/common';
import { customerMapper } from '../../shared/mappers/customer.mapper';

describe('CreateCustomerService', () => {
  let createCustomerService: CreateCustomerService;
  let loadCustomerByCpfService: LoadCustomerByCpfService;
  let loadCustomerByEmailService: LoadCustomerByEmailService;
  let loadCustomerByPhoneService: LoadCustomerByPhoneService;
  let bcryptService: BcryptService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        BcryptService,
        CreateCustomerService,
        LoadCustomerByCpfService,
        LoadCustomerByEmailService,
        LoadCustomerByPhoneService,
        {
          provide: getRepositoryToken(CustomerEntity),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    createCustomerService = moduleRef.get<CreateCustomerService>(
      CreateCustomerService,
    );

    loadCustomerByCpfService = moduleRef.get<LoadCustomerByCpfService>(
      LoadCustomerByCpfService,
    );

    loadCustomerByEmailService = moduleRef.get<LoadCustomerByEmailService>(
      LoadCustomerByEmailService,
    );

    loadCustomerByPhoneService = moduleRef.get<LoadCustomerByPhoneService>(
      LoadCustomerByPhoneService,
    );

    bcryptService = moduleRef.get<BcryptService>(BcryptService);
  });

  it('should return 409 if customer CPF already exists', async () => {
    jest
      .spyOn(loadCustomerByCpfService, 'load')
      .mockResolvedValue(customerResolveMock);

    await expect(createCustomerService.create(customerDtoMock)).rejects.toThrow(
      new ConflictException('CPF já cadastrado'),
    );
  });

  it('should return 409 if customer email already exists', async () => {
    jest.spyOn(loadCustomerByCpfService, 'load').mockResolvedValue(null);
    jest
      .spyOn(loadCustomerByEmailService, 'load')
      .mockResolvedValue(customerResolveMock);

    await expect(createCustomerService.create(customerDtoMock)).rejects.toThrow(
      new ConflictException('E-mail já cadastrado'),
    );
  });

  it('should return 409 if customer phone already exists', async () => {
    jest.spyOn(loadCustomerByCpfService, 'load').mockResolvedValue(null);
    jest.spyOn(loadCustomerByEmailService, 'load').mockResolvedValue(null);
    jest
      .spyOn(loadCustomerByPhoneService, 'load')
      .mockResolvedValue(customerResolveMock);

    await expect(createCustomerService.create(customerDtoMock)).rejects.toThrow(
      new ConflictException('Telefone já cadastrado'),
    );
  });

  it('should return an error if throws', () => {
    const spy = jest
      .spyOn(createCustomerService, 'create')
      .mockImplementation(() => {
        throw new Error();
      });
    expect(spy).toThrow();
  });

  it('should save customer with hashed password', async () => {
    jest.spyOn(loadCustomerByCpfService, 'load').mockResolvedValue(null);
    jest.spyOn(loadCustomerByEmailService, 'load').mockResolvedValue(null);
    jest.spyOn(loadCustomerByPhoneService, 'load').mockResolvedValue(null);

    const hashedPassword = await bcryptService.hashPassword('plainPassword');

    const mappedCustomer = {
      ...customerMappedMock,
      password: hashedPassword,
    };

    const spy = jest
      .spyOn(createCustomerService, 'create')
      .mockResolvedValue(mappedCustomer);
    await createCustomerService.create(mappedCustomer);
    expect(spy).toHaveBeenCalledWith(mappedCustomer);
  });

  it('should create a mapped customer object before save', () => {
    const result = customerMapper(customerDtoMock);
    expect(result).toBeInstanceOf(CustomerEntity);
    expect(result).toEqual(customerEntityMock);
  });

  it('should return customer on success', async () => {
    jest
      .spyOn(createCustomerService, 'create')
      .mockResolvedValue(customerResolveMock);

    const result = await createCustomerService.create(customerDtoMock);
    expect(result).toEqual({
      id: customerMappedMock.id,
      name: customerMappedMock.name,
      email: customerMappedMock.email,
    });
  });
});
