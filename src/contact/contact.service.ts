import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CreateContactDto } from './create-contact.dto';
import { UpdateContactDto } from './update-contact.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  findAll(): Promise<Contact[]> {
    return this.contactRepository.find({ relations: ['companies'] });
  }

  findOne(id: string): Promise<Contact | null> {
    return this.contactRepository.findOne({ where: { id: Number(id) }, relations: ['companies'] });
  }

  create(createContactDto: CreateContactDto): Promise<Contact> {
    const contactEntity = plainToClass(Contact, createContactDto);
    return this.contactRepository.save(contactEntity);
  }

  async update(id: string, updateContactDto: UpdateContactDto): Promise<Contact | null> {
    await this.contactRepository.update(id, updateContactDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.contactRepository.delete(id);
  }
}
