/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerEntity } from '../../domain/entities/customer/create-customer.entity';
import { LoadCustomerByCpfService } from '../../services/customer';
import { customerEntityMock } from '../../__mocks__/customer.mocks';

describe('LoadCustomerByCpfService', () => {
  let loadCustomerByCpfService: LoadCustomerByCpfService;
  let loadCustomerByCpfRepository: Repository<CustomerEntity>;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        LoadCustomerByCpfService,
        {
          provide: getRepositoryToken(CustomerEntity),
          useValue: {
            load: jest.fn(),
          },
        },
      ],
    }).compile();

    loadCustomerByCpfService = moduleRef.get<LoadCustomerByCpfService>(
      LoadCustomerByCpfService,
    );
  });

  it('should return null if customer not found', async () => {
    const spy = jest
      .spyOn(loadCustomerByCpfService, 'load')
      .mockResolvedValue(null);

    const result = await loadCustomerByCpfService.load({ cpf: '02514578931' });
    expect(result).toBe(null);

    spy.mockRestore();
  });

  it('should load customer by CPF', async () => {
    const spy = jest
      .spyOn(loadCustomerByCpfService, 'load')
      .mockResolvedValue(customerEntityMock);

    const result = await loadCustomerByCpfService.load({ cpf: '05009539020' });
    expect(spy).toHaveBeenCalledWith({ cpf: '05009539020' });
    expect(result).toBe(customerEntityMock);

    spy.mockRestore();
  });
});
