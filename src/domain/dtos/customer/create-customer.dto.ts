import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
  Length,
  Validate,
} from 'class-validator';
import { IsCPF } from '../../../shared/decorators/cpf-validator';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'CPF é obrigatório' })
  @Length(11, 11, { message: 'CPF deve conter 11 caracteres' })
  @Validate(IsCPF, { message: 'CPF inválido' })
  cpf: string;

  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @Length(3, 50, { message: 'Nome deve conter entre 3 e 50 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'Endereço é obrigatório' })
  @Length(3, 120, { message: 'Endereço deve conter entre 3 e 120 caracteres' })
  address: string;

  @IsNotEmpty({ message: 'Estado (UF) é obrigatório' })
  @Length(2, 2, { message: 'Estado (UF) deve conter 2 caracteres' })
  uf: string;

  @IsNotEmpty({ message: 'Cidade é obrigatório' })
  @Length(3, 50, { message: 'Cidade deve conter entre 3 e 50 caracteres' })
  city: string;

  @IsNotEmpty({ message: 'CEP é obrigatório' })
  @Length(8, 8, { message: 'CEP deve conter 8 caracteres' })
  cep: string;

  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  @IsEmail({}, { message: 'E-mail precisa ter um formato válido' })
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  @IsStrongPassword({}, { message: 'Por favor, crie uma senha forte' })
  password: string;

  @IsNotEmpty({ message: 'Confirmação de senha é obrigatória' })
  @IsStrongPassword(
    {},
    {
      message: 'Por favor, crie uma confirmação de senha forte',
    },
  )
  passwordConfirmation: string;

  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  @Length(13, 13, { message: 'Telefone deve conter 13 caracteres' })
  phone1: string;

  @IsOptional()
  phone2: string;

  status: string;

  createdAt: Date;

  updatedAt: Date;
}
