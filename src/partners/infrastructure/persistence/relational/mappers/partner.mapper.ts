import { Partner, PartnerType } from '@partners/domain/partner';
import { PartnerEntity } from '../entities/partner.entity';

export class PartnerMapper {
  static toDomain(entity: PartnerEntity): Partner {
    const domain = new Partner();
    domain.id = entity.id;
    domain.name = entity.name;
    domain.type = entity.type as PartnerType;
    domain.settings = entity.settings ?? undefined;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;
    return domain;
  }

  static toPersistence(domain: Partner): PartnerEntity {
    const entity = new PartnerEntity();
    if (domain.id) entity.id = domain.id;
    entity.name = domain.name;
    entity.type = domain.type;
    entity.settings = domain.settings;
    return entity;
  }
}
