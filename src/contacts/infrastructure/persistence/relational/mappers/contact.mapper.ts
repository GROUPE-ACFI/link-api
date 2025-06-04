import { Contact } from '@contacts/domain/contact';
import { ContactEntity } from '@contacts/infrastructure/persistence/relational/entities/contact.entity';
import { CompanyEntity } from '@companies/infrastructure/persistence/relational/entities/company.entity';
import { CompanyMapper } from '@companies/infrastructure/persistence/relational/mappers/company.mapper';

export class ContactMapper {
  static toDomain(entity: ContactEntity): Contact {
    const domain = new Contact();
    domain.id = entity.id;
    domain.email = entity.email;
    domain.phone = entity.phone;
    domain.firstname = entity.firstname;
    domain.lastname = entity.lastname;
    domain.birthdate = entity.birthdate ?? undefined;
    domain.job = entity.job;
    domain.companies =
      entity.companies?.map((c) => CompanyMapper.toDomain(c)) ?? null;
    return domain;
  }

  static toPersistence(domain: Contact): ContactEntity {
    const entity = new ContactEntity();
    if (domain.id) entity.id = domain.id;
    entity.email = domain.email;
    entity.phone = domain.phone;
    entity.firstname = domain.firstname;
    entity.lastname = domain.lastname;
    entity.birthdate = domain.birthdate;
    entity.job = domain.job;
    entity.companies = domain.companies?.map((c) => {
      const ce = new CompanyEntity();
      if (c.id) ce.id = c.id;
      return ce;
    });
    return entity;
  }
}
