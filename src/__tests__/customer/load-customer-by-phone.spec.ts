/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerEntity } from '../../domain/entities/customer/create-customer.entity';
import { LoadCustomerByPhoneService } from '../../services/customer';
import {
  customerDtoMock,
  customerEntityMock,
  customerResolveMock,
} from '../../__mocks__/customer.mocks';

describe('LoadCustomerByPhoneService', () => {
  let loadCustomerByPhoneService: LoadCustomerByPhoneService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        LoadCustomerByPhoneService,
        {
          provide: getRepositoryToken(CustomerEntity),
          useValue: {
            load: jest.fn(),
          },
        },
      ],
    }).compile();

    loadCustomerByPhoneService = app.get<LoadCustomerByPhoneService>(
      LoadCustomerByPhoneService,
    );
  });

  it('should return null if customer not found', async () => {
    const spy = jest
      .spyOn(loadCustomerByPhoneService, 'load')
      .mockResolvedValue(null);

    const result = await loadCustomerByPhoneService.load({
      phone1: '5571928343960',
    });
    expect(spy).toHaveBeenCalledWith({ phone1: '5571928343960' });
    expect(result).toBe(null);

    spy.mockRestore();
  });

  it('should load customer by phone', async () => {
    jest
      .spyOn(loadCustomerByPhoneService, 'load')
      .mockResolvedValue(customerResolveMock);

    const result = await loadCustomerByPhoneService.load({
      phone1: '5571928343960',
    });

    expect(result).toBe(customerResolveMock);
  });
});
