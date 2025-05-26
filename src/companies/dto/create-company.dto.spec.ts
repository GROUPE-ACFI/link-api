import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateCompanyDto } from './create-company.dto';

describe('CreateCompanyDto Validation', () => {
  it('should fail for invalid siren', async () => {
    const dto = plainToInstance(CreateCompanyDto, {
      name: 'ACME',
      legalForm: 'SARL',
      siren: '123',
      siret: '12345678901234',
      tvaNumber: 'FRXX999999999',
      creationDate: new Date().toISOString(),
      isActive: true,
      email: 'test@example.com',
      phone: '0123456789',
    });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should succeed for valid data', async () => {
    const dto = plainToInstance(CreateCompanyDto, {
      name: 'ACME',
      legalForm: 'SARL',
      siren: '123456789',
      siret: '12345678901234',
      tvaNumber: 'FRXX999999999',
      creationDate: new Date().toISOString(),
      isActive: true,
      email: 'test@example.com',
      phone: '0123456789',
    });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
