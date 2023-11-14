/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../modules/app.module';
import { CreateCustomerDto } from '../../domain/dtos/customer/create-customer.dto';
import {
  customerDtoMock,
  createCustomerMock,
  responseControllerMock,
} from '../../__mocks__';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerEntity } from '../../domain/entities/customer/create-customer.entity';
import {
  CreateCustomerService,
  LoadCustomerByCpfService,
  LoadCustomerByEmailService,
  LoadCustomerByPhoneService,
} from '../../services/customer';
import { BcryptService } from '../../shared/criptography/bcrypt.service';
import { CreateCustomerController } from '../../presentation/controllers/customer';

describe('CreateCustomerController DTO validations', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should return 400 if CPF is not provided', async () => {
    const customer = createCustomerMock('cpf');
    return await request(app.getHttpServer())
      .post('/register')
      .send(customer)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('CPF é obrigatório');
        expect(res.body.message).toContain('CPF deve conter 11 caracteres');
        expect(res.body.message).toContain('CPF inválido');
      });
  });

  it('should return 400 if name is not provided', async () => {
    const customer = createCustomerMock('name');
    return await request(app.getHttpServer())
      .post('/register')
      .send(customer)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('Nome é obrigatório');
        expect(res.body.message).toContain(
          'Nome deve conter entre 3 e 50 caracteres',
        );
      });
  });

  it('should return 400 if address is not provided', async () => {
    const customer = createCustomerMock('address');
    return await request(app.getHttpServer())
      .post('/register')
      .send(customer)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('Endereço é obrigatório');
        expect(res.body.message).toContain(
          'Endereço deve conter entre 3 e 120 caracteres',
        );
      });
  });

  it('should return 400 if UF(state) is not provided', async () => {
    const customer = createCustomerMock('uf');
    return await request(app.getHttpServer())
      .post('/register')
      .send(customer)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('Estado (UF) é obrigatório');
        expect(res.body.message).toContain(
          'Estado (UF) deve conter 2 caracteres',
        );
      });
  });

  it('should return 400 if city is not provided', async () => {
    const customer = createCustomerMock('city');
    return await request(app.getHttpServer())
      .post('/register')
      .send(customer)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('Cidade é obrigatório');
        expect(res.body.message).toContain(
          'Cidade deve conter entre 3 e 50 caracteres',
        );
      });
  });

  it('should return 400 if CEP is not provided', async () => {
    const customer = createCustomerMock('cep');
    return await request(app.getHttpServer())
      .post('/register')
      .send(customer)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('CEP é obrigatório');
        expect(res.body.message).toContain('CEP deve conter 8 caracteres');
      });
  });

  it('should return 400 if email is not provided', async () => {
    const customer = createCustomerMock('email');
    return await request(app.getHttpServer())
      .post('/register')
      .send(customer)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('E-mail é obrigatório');
        expect(res.body.message).toContain(
          'E-mail precisa ter um formato válido',
        );
      });
  });

  it('should return 400 if password is not provided', async () => {
    const customer = createCustomerMock('password');
    return await request(app.getHttpServer())
      .post('/register')
      .send(customer)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('Senha é obrigatória');
        expect(res.body.message).toContain('Por favor, crie uma senha forte');
      });
  });

  it('should return 400 if passwordConfirmation is not provided', async () => {
    const customer = createCustomerMock('passwordConfirmation');
    return await request(app.getHttpServer())
      .post('/register')
      .send(customer)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain(
          'Confirmação de senha é obrigatória',
        );
        expect(res.body.message).toContain(
          'Por favor, crie uma confirmação de senha forte',
        );
      });
  });

  it('should return 400 if password and passwordConfirmation not match', async () => {
    const customer: CreateCustomerDto = {
      ...customerDtoMock,
      password: 'P@ssword10',
      passwordConfirmation: 'p@ssworD11',
    };

    return await request(app.getHttpServer())
      .post('/register')
      .send(customer)
      .expect(400)
      .expect((res) => {
        expect(res.body.error.message).toContain('As senhas não conferem');
      });
  });

  it('should return 400 if phone1 is not provided', async () => {
    const customer = createCustomerMock('phone1');
    return await request(app.getHttpServer())
      .post('/register')
      .send(customer)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('Telefone é obrigatório');
        expect(res.body.message).toContain(
          'Telefone deve conter 13 caracteres',
        );
      });
  });

  afterAll(async () => {
    await app.close();
  });
});

describe('CreateCustomerController usecases', () => {
  let createCustomerController: CreateCustomerController;
  let createCustomerService: CreateCustomerService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CreateCustomerController],
      providers: [
        BcryptService,
        CreateCustomerService,
        LoadCustomerByCpfService,
        LoadCustomerByEmailService,
        LoadCustomerByPhoneService,
        {
          provide: getRepositoryToken(CustomerEntity),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    createCustomerController = app.get<CreateCustomerController>(
      CreateCustomerController,
    );
    createCustomerService = app.get<CreateCustomerService>(
      CreateCustomerService,
    );
  });

  it('should return an error if throws', async () => {
    const spy = jest
      .spyOn(createCustomerController, 'create')
      .mockImplementation(async () => {
        throw new Error();
      });

    await expect(
      createCustomerController.create(customerDtoMock, responseControllerMock),
    ).rejects.toThrow();

    spy.mockRestore();
  });

  it('should return customer on success', async () => {
    const spy = jest.spyOn(createCustomerService, 'create').mockResolvedValue({
      id: 1,
      name: 'John Doe',
      email: 'john@contoso.com',
    });

    const result = await createCustomerController.create(
      customerDtoMock,
      responseControllerMock,
    );
    expect(result).toEqual({
      status: 201,
      message: 'Cadastrado com sucesso',
      data: {
        id: 1,
        name: 'John Doe',
        email: 'john@contoso.com',
      },
    });

    spy.mockRestore();
  });
});
