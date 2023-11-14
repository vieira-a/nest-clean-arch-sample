import { Injectable } from '@nestjs/common';
import {
  LoadCustomer,
  LoadCustomerByParams,
} from '../../domain/usecases/customer/load-customer.usecase';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '../../domain/entities/customer/create-customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoadCustomerByCpfService implements LoadCustomer {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly loadCustomerByCpfRepository: Repository<CustomerEntity>,
  ) {}
  async load(
    params: LoadCustomerByParams.Params,
  ): Promise<LoadCustomerByParams.Result | null> {
    const customer = await this.loadCustomerByCpfRepository.findOne({
      where: { cpf: params.cpf },
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
