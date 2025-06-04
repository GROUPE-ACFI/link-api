import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactRepository } from '../../contact.repository';
import { ContactEntity } from '@contacts/infrastructure/persistence/relational/entities/contact.entity';
import { Contact } from '@contacts/domain/contact';
import { ContactMapper } from '@contacts/infrastructure/persistence/relational/mappers/contact.mapper';
import { IPaginationOptions } from '@utils/types/pagination-options';
import { NullableType } from '@utils/types/nullable.type';

@Injectable()
export class ContactsRelationalRepository implements ContactRepository {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly repository: Repository<ContactEntity>,
  ) {}

  async create(data: Omit<Contact, 'id'>): Promise<Contact> {
    const entity = await this.repository.save(
      this.repository.create(ContactMapper.toPersistence(data as Contact)),
    );
    return ContactMapper.toDomain(entity);
  }

  async findManyWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Contact[]> {
    const entities = await this.repository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
    return entities.map((e) => ContactMapper.toDomain(e));
  }

  async findById(id: Contact['id']): Promise<NullableType<Contact>> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? ContactMapper.toDomain(entity) : null;
  }

  async update(
    id: Contact['id'],
    payload: Partial<Omit<Contact, 'id'>>,
  ): Promise<Contact | null> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) return null;
    const domain = ContactMapper.toDomain(entity);
    const updatedDomain: Contact = { ...domain, ...payload } as Contact;
    const updated = await this.repository.save(
      this.repository.create(ContactMapper.toPersistence(updatedDomain)),
    );
    return ContactMapper.toDomain(updated);
  }

  async remove(id: Contact['id']): Promise<void> {
    await this.repository.softDelete({ id });
  }
}
