import { Repository } from 'typeorm';
import {
  LoadAllCustomers,
  LoadAllCustomersUsecase,
} from '../../domain/usecases/customer/load-all-customers.usecase';
import { CustomerEntity } from '../../domain/entities/customer/create-customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { allCustomersMapper } from '../../shared/mappers';

export class LoadAllCustomersService implements LoadAllCustomersUsecase {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly loadAllCustomersRepository: Repository<CustomerEntity>,
  ) {}
  async load(): Promise<LoadAllCustomers.Result[]> {
    const customers = await this.loadAllCustomersRepository.find();
    if (!customers) {
      return null;
    } else {
      const allCustomers = allCustomersMapper(customers);
      return allCustomers;
    }
  }
}
