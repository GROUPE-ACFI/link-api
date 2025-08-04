import { ContractProductsService } from './contract-products.service';
import { ContractProductRepository } from '@contract-products/infrastructure/persistence/contract-product.repository';
import { CreateContractProductDto } from '@contract-products/dto/create-contract-product.dto';
import { ContractProductType } from '@contract-products/domain/contract-product';

describe('ContractProductsService', () => {
  let service: ContractProductsService;
  const repo: jest.Mocked<ContractProductRepository> = {
    create: jest.fn(),
    findManyWithPagination: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  } as any;

  beforeEach(() => {
    service = new ContractProductsService(repo);
  });

  it('should create contract product', async () => {
    const dto: CreateContractProductDto = {
      contractId: '1',
      productType: ContractProductType.FACTOR,
      limitAmount: 1000,
      currency: 'EUR',
      feesPercentage: 1.5,
    };
    repo.create.mockResolvedValue({ id: '1', ...dto } as any);
    const result = await service.create(dto);
    expect(result).toEqual({ id: '1', ...dto });
  });
});
