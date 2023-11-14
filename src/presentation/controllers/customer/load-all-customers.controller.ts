import { Controller, Get } from '@nestjs/common';
import { LoadAllCustomersService } from '../../../services/customer';

@Controller('/customers')
export class LoadAllCustomersController {
  constructor(
    private readonly loadAllCustomersService: LoadAllCustomersService,
  ) {}

  @Get()
  async load() {
    return this.loadAllCustomersService.load();
  }
}
