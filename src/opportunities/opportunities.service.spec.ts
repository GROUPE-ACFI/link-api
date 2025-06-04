import { OpportunitiesService } from './opportunities.service';
import { OpportunityRepository } from './infrastructure/persistence/opportunity.repository';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';

describe('OpportunitiesService', () => {
  let service: OpportunitiesService;
  const repo: jest.Mocked<OpportunityRepository> = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  } as any;

  beforeEach(() => {
    service = new OpportunitiesService(repo);
  });

  it('should create opportunity', async () => {
    const dto: CreateOpportunityDto = {
      name: 'Opp1',
      type: 'factoring',
    } as any;
    repo.create.mockResolvedValue(dto as any);
    const result = await service.create(dto);
    expect(result).toEqual(dto);
    expect(repo.create).toHaveBeenCalled();
  });
});
