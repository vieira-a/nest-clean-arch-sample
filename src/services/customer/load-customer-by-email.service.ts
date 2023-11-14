import { Injectable } from '@nestjs/common';
import {
  LoadCustomer,
  LoadCustomerByParams,
} from '../../domain/usecases/customer';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '../../domain/entities/customer/create-customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoadCustomerByEmailService implements LoadCustomer {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly loadCustomerByEmailRepository: Repository<CustomerEntity>,
  ) {}

  async load(
    params: LoadCustomerByParams.Params,
  ): Promise<LoadCustomerByParams.Result | null> {
    const customer = await this.loadCustomerByEmailRepository.findOne({
      where: { email: params.email },
    });

    if (customer) {
      return {
        id: customer.id,
        email: customer.email,
        name: customer.name,
      };
    } else {
      return null;
    }
  }
}
