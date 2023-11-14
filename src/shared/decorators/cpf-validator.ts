import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'cpf', async: true })
@Injectable()
export class IsCPF implements ValidatorConstraintInterface {
  async validate(value: any): Promise<boolean> {
    if (typeof value !== 'string') return false;
    value = value.replace(/[^\d]+/g, '');

    if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) return false;
    value = value.split('');

    const validator = value
      .filter(
        (digit: any, index: number, array: string | any[]) =>
          index >= array.length - 2 && digit,
      )
      .map((el: string | number) => +el);
    const toValidate = (pop: number) =>
      value
        .filter(
          (digit: any, index: number, array: string | any[]) =>
            index < array.length - pop && digit,
        )
        .map((el: string | number) => +el);
    const rest = (count: number, pop: number) =>
      ((toValidate(pop).reduce(
        (soma: number, el: number, i: number) => soma + el * (count - i),
        0,
      ) *
        10) %
        11) %
      10;
    return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
  }
}
