import { Test, TestingModule } from '@nestjs/testing';
import { LoadAllCustomersService } from '../../services/customer';
import { CustomerEntity } from '../../domain/entities/customer/create-customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { allCustomersMock, customerEntityMock } from '../../__mocks__';
import { allCustomersMapper } from '../../shared/mappers';

describe('LoadAllCustomersService', () => {
  let loadAllCustomersService: LoadAllCustomersService;
  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        LoadAllCustomersService,
        {
          provide: getRepositoryToken(CustomerEntity),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    loadAllCustomersService = moduleRef.get<LoadAllCustomersService>(
      LoadAllCustomersService,
    );
  });

  it('should return null if no customer was found', async () => {
    jest.spyOn(loadAllCustomersService, 'load').mockResolvedValue(null);

    const result = await loadAllCustomersService.load();
    expect(result).toBe(null);
  });

  it('should mapper all customers', async () => {
    const result = allCustomersMapper(allCustomersMock);
    expect(result).toEqual(allCustomersMock);
  });

  it('should return all customers on success', async () => {
    jest
      .spyOn(loadAllCustomersService, 'load')
      .mockResolvedValue([customerEntityMock]);

    const result = await loadAllCustomersService.load();
    expect(result).toEqual([customerEntityMock]);
  });
});
