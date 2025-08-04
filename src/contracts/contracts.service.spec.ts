import { ContractsService } from './contracts.service';
import { ContractRepository } from '@contracts/infrastructure/persistence/contract.repository';
import { CreateContractDto } from '@contracts/dto/create-contract.dto';
import { ContractStatus } from '@contracts/domain/contract';

describe('ContractsService', () => {
  let service: ContractsService;
  const repo: jest.Mocked<ContractRepository> = {
    create: jest.fn(),
    findManyWithPagination: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  } as any;

  beforeEach(() => {
    service = new ContractsService(repo);
  });

  it('should create contract', async () => {
    const dto: CreateContractDto = {
      companyId: '1',
      partnerId: '2',
      status: ContractStatus.ACTIVE,
      startDate: new Date().toISOString() as any,
    };
    repo.create.mockResolvedValue({ id: '1', ...dto } as any);
    const result = await service.create(dto);
    expect(result).toEqual({ id: '1', ...dto });
  });
});
