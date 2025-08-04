import { Contract, ContractStatus } from '@contracts/domain/contract';
import { ContractEntity } from '../entities/contract.entity';

export class ContractMapper {
  static toDomain(entity: ContractEntity): Contract {
    const contract = new Contract();
    contract.id = entity.id;
    contract.companyId = entity.companyId;
    contract.partnerId = entity.partnerId;
    contract.status = entity.status as ContractStatus;
    contract.startDate = entity.startDate;
    contract.endDate = entity.endDate ?? undefined;
    contract.originalOpportunityId = entity.originalOpportunityId ?? undefined;
    contract.createdAt = entity.createdAt;
    contract.updatedAt = entity.updatedAt;
    return contract;
  }

  static toPersistence(domain: Contract): ContractEntity {
    const entity = new ContractEntity();
    if (domain.id) entity.id = domain.id;
    entity.companyId = domain.companyId;
    entity.partnerId = domain.partnerId;
    entity.status = domain.status;
    entity.startDate = domain.startDate;
    entity.endDate = domain.endDate;
    entity.originalOpportunityId = domain.originalOpportunityId;
    return entity;
  }
}
