import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { BcryptService } from '../../shared/criptography/bcrypt.service';

jest.mock('bcrypt', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
}));

describe('BcryptService', () => {
  let bcryptService: BcryptService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptService],
    }).compile();

    bcryptService = module.get<BcryptService>(BcryptService);
  });

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'P@ssword10';

      (bcrypt.genSalt as jest.Mock).mockResolvedValue(10);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');

      const hashedPassword = await bcryptService.hashPassword(password);

      expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(typeof hashedPassword).toBe('string');
    });
  });
});
