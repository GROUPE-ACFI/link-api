import {
  ContractProduct,
  ContractProductType,
} from '@contract-products/domain/contract-product';
import { ContractProductEntity } from '../entities/contract-product.entity';

export class ContractProductMapper {
  static toDomain(entity: ContractProductEntity): ContractProduct {
    const domain = new ContractProduct();
    domain.id = entity.id;
    domain.contractId = entity.contractId;
    domain.productType = entity.productType as ContractProductType;
    domain.limitAmount = Number(entity.limitAmount);
    domain.currency = entity.currency;
    domain.feesPercentage = Number(entity.feesPercentage);
    domain.metadata = entity.metadata ?? undefined;
    domain.createdAt = entity.createdAt;
    domain.updatedAt = entity.updatedAt;
    return domain;
  }

  static toPersistence(domain: ContractProduct): ContractProductEntity {
    const entity = new ContractProductEntity();
    if (domain.id) entity.id = domain.id;
    entity.contractId = domain.contractId;
    entity.productType = domain.productType;
    entity.limitAmount = domain.limitAmount;
    entity.currency = domain.currency;
    entity.feesPercentage = domain.feesPercentage;
    entity.metadata = domain.metadata;
    return entity;
  }
}
