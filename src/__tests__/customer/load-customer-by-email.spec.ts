import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerEntity } from '../../domain/entities/customer/create-customer.entity';
import { LoadCustomerByEmailService } from '../../services/customer';
import { customerResolveMock } from '../../__mocks__/customer.mocks';

describe('LoadCustomerByEmailService', () => {
  let loadCustomerByEmailService: LoadCustomerByEmailService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        LoadCustomerByEmailService,
        {
          provide: getRepositoryToken(CustomerEntity),
          useValue: {
            load: jest.fn(),
          },
        },
      ],
    }).compile();

    loadCustomerByEmailService = app.get<LoadCustomerByEmailService>(
      LoadCustomerByEmailService,
    );
  });

  it('should return null if customer not found', async () => {
    const spy = jest
      .spyOn(loadCustomerByEmailService, 'load')
      .mockResolvedValue(null);

    const result = await loadCustomerByEmailService.load({
      email: 'john.doe@contoso.com',
    });
    expect(spy).toHaveBeenCalledWith({ email: 'john.doe@contoso.com' });
    expect(result).toBe(null);

    spy.mockRestore();
  });

  it('should load customer by email', async () => {
    const spy = jest
      .spyOn(loadCustomerByEmailService, 'load')
      .mockResolvedValue(customerResolveMock);

    const result = await loadCustomerByEmailService.load({
      email: 'john@contoso.com',
    });

    expect(result).toBe(customerResolveMock);

    spy.mockRestore();
  });
});
