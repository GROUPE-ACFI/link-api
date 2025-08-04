import { Injectable } from '@nestjs/common';
import { PartnerRepository } from '@partners/infrastructure/persistence/partner.repository';
import { CreatePartnerDto } from '@partners/dto/create-partner.dto';
import { UpdatePartnerDto } from '@partners/dto/update-partner.dto';
import { Partner } from '@partners/domain/partner';
import { IPaginationOptions } from '@utils/types/pagination-options';
import { NullableType } from '@utils/types/nullable.type';

@Injectable()
export class PartnersService {
  constructor(private readonly repository: PartnerRepository) {}

  create(dto: CreatePartnerDto): Promise<Partner> {
    const payload: Omit<Partner, 'id' | 'createdAt' | 'updatedAt'> = {
      name: dto.name,
      type: dto.type,
      settings: dto.settings,
    };
    return this.repository.create(payload);
  }

  findManyWithPagination(options: {
    paginationOptions: IPaginationOptions;
  }): Promise<Partner[]> {
    return this.repository.findManyWithPagination(options);
  }

  findById(id: Partner['id']): Promise<NullableType<Partner>> {
    return this.repository.findById(id);
  }

  update(id: Partner['id'], dto: UpdatePartnerDto): Promise<Partner | null> {
    const payload: Partial<Omit<Partner, 'id' | 'createdAt' | 'updatedAt'>> = {
      ...dto,
    };
    return this.repository.update(id, payload);
  }

  remove(id: Partner['id']): Promise<void> {
    return this.repository.remove(id);
  }
}
