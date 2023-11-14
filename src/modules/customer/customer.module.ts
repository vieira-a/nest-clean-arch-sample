import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptService } from '../../shared/criptography/bcrypt.service';
import { CustomerEntity } from '../../domain/entities/customer/create-customer.entity';
import {
  CreateCustomerController,
  LoadAllCustomersController,
} from '../../presentation/controllers/customer';
import {
  CreateCustomerService,
  LoadAllCustomersService,
  LoadCustomerByCpfService,
  LoadCustomerByEmailService,
  LoadCustomerByPhoneService,
} from '../../services/customer';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity])],
  controllers: [CreateCustomerController, LoadAllCustomersController],
  providers: [
    CreateCustomerService,
    LoadCustomerByCpfService,
    LoadCustomerByEmailService,
    LoadCustomerByPhoneService,
    LoadAllCustomersService,
    BcryptService,
  ],
  exports: [
    CreateCustomerService,
    LoadCustomerByCpfService,
    LoadCustomerByEmailService,
    LoadCustomerByPhoneService,
  ],
})
export class CustomerModule {}
