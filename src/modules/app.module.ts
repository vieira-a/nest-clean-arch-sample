import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '../../db/data-source';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), CustomerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
