import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { CreateContactDto } from './create-contact.dto';
import { UpdateContactDto } from './update-contact.dto';

describe('ContactController', () => {
  let contactController: ContactController;
  let contactService: ContactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        {
          provide: ContactService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({ id: 1 }),
            create: jest.fn().mockResolvedValue({ id: 1 }),
            update: jest.fn().mockResolvedValue({ id: 1 }),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    contactController = module.get<ContactController>(ContactController);
    contactService = module.get<ContactService>(ContactService);
  });

  it('should return an array of contacts', async () => {
    await expect(contactController.findAll()).resolves.toEqual([]);
  });

  it('should return one contact', async () => {
    await expect(contactController.findOne('1')).resolves.toEqual({ id: 1 });
  });

  it('should create a contact', async () => {
    const dto: CreateContactDto = {
      email: 'a@b.com',
      phone: '123',
      firstname: 'A',
      lastname: 'B',
      birthdate: new Date(),
      job: 'Dev',
      companies: [],
    } as any;
    await expect(contactController.create(dto)).resolves.toEqual({ id: 1 });
  });

  it('should update a contact', async () => {
    const dto: UpdateContactDto = { phone: '456' } as any;
    await expect(contactController.update('1', dto)).resolves.toEqual({ id: 1 });
  });

  it('should delete a contact', async () => {
    await expect(contactController.remove('1')).resolves.toBeUndefined();
  });
});
