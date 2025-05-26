import { Company } from '../../../../domain/company';
import { Address } from '../../../../domain/address';
import { CompanyEntity } from '../entities/company.entity';
import { AddressEntity } from '../entities/address.entity';

export class CompanyMapper {
  static toDomain(entity: CompanyEntity): Company {
    const domain = new Company();
    domain.id = entity.id;
    domain.name = entity.name;
    domain.legalForm = entity.legalForm;
    domain.siren = entity.siren;
    domain.siret = entity.siret;
    domain.tvaNumber = entity.tvaNumber;
    domain.creationDate = entity.creationDate;
    domain.isActive = entity.isActive;
    domain.email = entity.email;
    domain.phone = entity.phone;
    domain.website = entity.website ?? null;
    domain.addresses =
      entity.addresses?.map((addr) => {
        const a = new Address();
        a.id = addr.id;
        a.street = addr.street;
        a.postalCode = addr.postalCode;
        a.city = addr.city;
        a.country = addr.country;
        a.type = addr.type;
        return a;
      }) ?? null;
    return domain;
  }

  static toPersistence(domain: Company): CompanyEntity {
    const entity = new CompanyEntity();
    if (domain.id) entity.id = domain.id;
    entity.name = domain.name;
    entity.legalForm = domain.legalForm;
    entity.siren = domain.siren;
    entity.siret = domain.siret;
    entity.tvaNumber = domain.tvaNumber;
    entity.creationDate = domain.creationDate;
    entity.isActive = domain.isActive;
    entity.email = domain.email;
    entity.phone = domain.phone;
    entity.website = domain.website ?? null;
    entity.addresses = domain.addresses?.map((addr) => {
      const a = new AddressEntity();
      if (addr.id) a.id = addr.id;
      a.street = addr.street;
      a.postalCode = addr.postalCode;
      a.city = addr.city;
      a.country = addr.country;
      a.type = addr.type;
      return a;
    });
    return entity;
  }
}
