import { PartnersService } from './partners.service';
import { PartnerRepository } from '@partners/infrastructure/persistence/partner.repository';
import { CreatePartnerDto } from '@partners/dto/create-partner.dto';
import { PartnerType } from '@partners/domain/partner';

describe('PartnersService', () => {
  let service: PartnersService;
  const repo: jest.Mocked<PartnerRepository> = {
    create: jest.fn(),
    findManyWithPagination: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  } as any;

  beforeEach(() => {
    service = new PartnersService(repo);
  });

  it('should create partner', async () => {
    const dto: CreatePartnerDto = {
      name: 'Coface',
      type: PartnerType.INSURER,
    };
    repo.create.mockResolvedValue({ id: '1', ...dto } as any);
    const result = await service.create(dto);
    expect(result).toEqual({ id: '1', ...dto });
  });
});
