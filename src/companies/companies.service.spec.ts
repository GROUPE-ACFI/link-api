import { CompaniesService } from './companies.service';
import { CompanyRepository } from './infrastructure/persistence/company.repository';
import { CreateCompanyDto } from './dto/create-company.dto';

describe('CompaniesService', () => {
  let service: CompaniesService;
  const repo: jest.Mocked<CompanyRepository> = {
    create: jest.fn(),
    findManyWithPagination: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  } as any;

  beforeEach(() => {
    service = new CompaniesService(repo);
  });

  it('should create company', async () => {
    const dto: CreateCompanyDto = {
      name: 'ACME',
      legalForm: 'SARL',
      siren: '123456789',
      siret: '12345678901234',
      tvaNumber: 'FRXX999999999',
      creationDate: new Date(),
      isActive: true,
      email: 'test@example.com',
      phone: '0123456789',
    };
    repo.create.mockResolvedValue(dto as any);
    const result = await service.create(dto);
    expect(result).toEqual(dto);
  });
});
