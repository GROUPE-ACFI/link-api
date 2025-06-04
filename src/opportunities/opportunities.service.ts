import { Injectable } from '@nestjs/common';
import { OpportunityRepository } from '@opportunities/infrastructure/persistence/opportunity.repository';
import { CreateOpportunityDto } from '@opportunities/dto/create-opportunity.dto';
import { UpdateOpportunityDto } from '@opportunities/dto/update-opportunity.dto';
import { QueryOpportunityDto } from '@opportunities/dto/query-opportunity.dto';
import { Opportunity } from '@opportunities/domain/opportunity';
import { OpportunityCompany } from '@opportunities/domain/opportunity-company';
import { OpportunityLineDto } from '@opportunities/dto/opportunity-line.dto';
import { OpportunityCompanyDto } from '@opportunities/dto/opportunity-company.dto';
import {
  OpLine,
  FactoringLine,
  ReverseFactoringLine,
  CreditInsuranceLine,
} from '@opportunities//domain/op-line';

@Injectable()
export class OpportunitiesService {
  constructor(private readonly repository: OpportunityRepository) {}

  async create(dto: CreateOpportunityDto): Promise<Opportunity> {
    const payload: Omit<Opportunity, 'id'> = {
      name: dto.name,
      type: dto.type,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
      description: dto.description,
      totalEstimatedAmount: dto.totalEstimatedAmount,
      participants: this.mapParticipants(dto.participants),
      lines: this.mapLines(dto.lines),
      commissions: [],
      signedAt: undefined,
    };
    return this.repository.create(payload);
  }

  findAll(query: QueryOpportunityDto): Promise<[Opportunity[], number]> {
    return this.repository.findAll(query);
  }

  findOne(id: Opportunity['id']): Promise<Opportunity | null> {
    return this.repository.findById(id);
  }

  async update(
    id: Opportunity['id'],
    dto: UpdateOpportunityDto,
  ): Promise<Opportunity | null> {
    const payload: Partial<Omit<Opportunity, 'id'>> = {
      ...dto,
      participants: dto.participants
        ? this.mapParticipants(dto.participants)
        : undefined,
      lines: dto.lines ? this.mapLines(dto.lines) : undefined,
      updatedAt: new Date(),
    };
    return this.repository.update(id, payload);
  }

  remove(id: Opportunity['id']): Promise<void> {
    return this.repository.remove(id);
  }

  private mapLines(dtos: OpportunityLineDto[] = []): OpLine[] {
    return dtos.map((dto) => {
      switch (dto._type) {
        case 'ReverseFactoringLine':
          const r = new ReverseFactoringLine();
          r.buyerId = dto.buyerId!;
          r.supplierId = dto.supplierId!;
          return r;
        case 'CreditInsuranceLine':
          const c = new CreditInsuranceLine();
          c.insurerId = dto.insurerId!;
          return c;
        default:
          const f = new FactoringLine();
          f.factorId = dto.factorId!;
          return f;
      }
    });
  }

  private mapParticipants(
    dtos: OpportunityCompanyDto[] = [],
  ): OpportunityCompany[] {
    return dtos.map((dto) => {
      const p = new OpportunityCompany();
      p.companyId = dto.companyId;
      p.role = dto.role;
      p.participationStatus = dto.participationStatus;
      p.contactIds = dto.contactIds;
      p.addedAt = new Date();
      return p;
    });
  }
}
