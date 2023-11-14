import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptService } from '../../shared/criptography/bcrypt.service';
import { customerMapper } from '../../shared/mappers/customer.mapper';
import { CustomerEntity } from '../../domain/entities/customer/create-customer.entity';
import { CreateCustomer } from '../../domain/usecases/customer/create-customer.usecase';
import { LoadCustomerByCpfService } from './load-customer-by-cpf.service';
import { LoadCustomerByEmailService } from './load-customer-by-email.service';
import { LoadCustomerByPhoneService } from './load-customer-by-phone.service';
import { CreateCustomerDto } from '../../domain/dtos/customer/create-customer.dto';

@Injectable()
export class CreateCustomerService implements CreateCustomer {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly createCustomerRepository: Repository<CustomerEntity>,
    private readonly bcryptService: BcryptService,
    private readonly loadCustomerByCpfService: LoadCustomerByCpfService,
    private readonly loadCustomerByEmailService: LoadCustomerByEmailService,
    private readonly loadCustomerByPhoneService: LoadCustomerByPhoneService,
  ) {}

  async create(customer: CreateCustomerDto): Promise<CreateCustomer.Result> {
    const customerCpfAlreadyExists = await this.loadCustomerByCpfService.load({
      cpf: customer.cpf,
    });

    if (customerCpfAlreadyExists) {
      throw new ConflictException('CPF já cadastrado');
    }

    const customerEmailAlreadyExists =
      await this.loadCustomerByEmailService.load({ email: customer.email });

    if (customerEmailAlreadyExists) {
      throw new ConflictException('E-mail já cadastrado');
    }

    const customerPhoneAlreadyExists =
      await this.loadCustomerByPhoneService.load({
        phone1: customer.phone1,
      });

    if (customerPhoneAlreadyExists) {
      throw new ConflictException('Telefone já cadastrado');
    }

    const mappedCustomer = customerMapper(customer);

    const hashedPassword = await this.bcryptService.hashPassword(
      customer.password,
    );

    const createdCustomer = await this.createCustomerRepository.save({
      ...mappedCustomer,
      password: hashedPassword,
    });

    if (!createdCustomer) {
      throw new Error('Houve uma falha ao criar conta de usuário');
    } else {
      return {
        id: createdCustomer.id,
        name: createdCustomer.name,
        email: createdCustomer.email,
      };
    }
  }
}
