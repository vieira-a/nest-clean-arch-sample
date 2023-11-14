import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { serverError } from '../../../shared/exceptions/server-error';
import { CreateCustomerDto } from '../../../domain/dtos/customer/create-customer.dto';
import { CreateCustomerService } from '../../../services/customer/create-customer.service';
import { Response } from 'express';

@Controller('/register')
export class CreateCustomerController {
  constructor(private readonly createCustomerService: CreateCustomerService) {}

  @Post()
  async create(
    @Body() customer: CreateCustomerDto,
    @Res() res: Response,
  ): Promise<Response | HttpException> {
    try {
      if (customer.password !== customer.passwordConfirmation) {
        throw new BadRequestException('As senhas não conferem');
      }

      const result = await this.createCustomerService.create(customer);
      if (!result) {
        throw new Error('Houve uma falha ao criar conta de usuário');
      } else {
        return res.json({
          status: HttpStatus.CREATED,
          message: 'Cadastrado com sucesso',
          data: result,
        });
      }
    } catch (error) {
      return serverError(
        error,
        res,
        'Houve uma falha ao criar conta de usuário',
      );
    }
  }
}
