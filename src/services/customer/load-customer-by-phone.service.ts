import { Injectable } from '@nestjs/common';
import {
  LoadCustomer,
  LoadCustomerByParams,
} from '../../domain/usecases/customer';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '../../domain/entities/customer/create-customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoadCustomerByPhoneService implements LoadCustomer {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly loadCustomerByPhoneRepository: Repository<CustomerEntity>,
  ) {}
  async load(
    params: LoadCustomerByParams.Params,
  ): Promise<LoadCustomerByParams.Result> {
    const customer = await this.loadCustomerByPhoneRepository.findOne({
      where: { phone1: params.phone1 },
    });

    if (!customer) {
      return null;
    } else {
      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
      };
    }
  }
}
