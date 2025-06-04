import { ContactsService } from './contacts.service';
import { ContactRepository } from './infrastructure/persistence/contact.repository';
import { CreateContactDto } from '@contacts/dto/create-contact.dto';

describe('ContactsService', () => {
  let service: ContactsService;
  const repo: jest.Mocked<ContactRepository> = {
    create: jest.fn(),
    findManyWithPagination: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  } as any;

  beforeEach(() => {
    service = new ContactsService(repo);
  });

  it('should create contact', async () => {
    const dto: CreateContactDto = {
      email: 'john@example.com',
      phone: '0123456789',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date().toISOString() as any,
      job: 'CEO',
    };
    repo.create.mockResolvedValue(dto as any);
    const result = await service.create(dto);
    expect(result).toEqual(dto);
  });
});
