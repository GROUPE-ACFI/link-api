import { Injectable } from '@nestjs/common';
import { ContractRepository } from '@contracts/infrastructure/persistence/contract.repository';
import { CreateContractDto } from '@contracts/dto/create-contract.dto';
import { UpdateContractDto } from '@contracts/dto/update-contract.dto';
import { Contract } from '@contracts/domain/contract';
import { IPaginationOptions } from '@utils/types/pagination-options';
import { NullableType } from '@utils/types/nullable.type';

@Injectable()
export class ContractsService {
  constructor(private readonly repository: ContractRepository) {}

  create(dto: CreateContractDto): Promise<Contract> {
    const payload: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'> = {
      companyId: dto.companyId,
      partnerId: dto.partnerId,
      status: dto.status,
      startDate: dto.startDate as any,
      endDate: dto.endDate,
      originalOpportunityId: dto.originalOpportunityId,
    };
    return this.repository.create(payload);
  }

  findManyWithPagination(options: {
    paginationOptions: IPaginationOptions;
  }): Promise<Contract[]> {
    return this.repository.findManyWithPagination(options);
  }

  findById(id: Contract['id']): Promise<NullableType<Contract>> {
    return this.repository.findById(id);
  }

  update(id: Contract['id'], dto: UpdateContractDto): Promise<Contract | null> {
    const payload: Partial<Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>> = {
      ...dto,
    };
    return this.repository.update(id, payload);
  }

  remove(id: Contract['id']): Promise<void> {
    return this.repository.remove(id);
  }
}
