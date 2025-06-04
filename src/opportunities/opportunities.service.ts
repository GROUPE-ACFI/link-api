import { Injectable } from '@nestjs/common';
import { OpportunityRepository } from './infrastructure/persistence/opportunity.repository';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { QueryOpportunityDto } from './dto/query-opportunity.dto';
import { Opportunity } from './domain/opportunity';
import { OpportunityCompany } from './domain/opportunity-company';
import { OpportunityLineDto } from './dto/opportunity-line.dto';
import { OpportunityCompanyDto } from './dto/opportunity-company.dto';
import { OpLine, FactoringLine, ReverseFactoringLine, CreditInsuranceLine } from './domain/op-line';

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

  async update(id: Opportunity['id'], dto: UpdateOpportunityDto): Promise<Opportunity | null> {
    const payload: Partial<Omit<Opportunity, 'id'>> = {
      ...dto,
      participants: dto.participants ? this.mapParticipants(dto.participants) : undefined,
      lines: dto.lines ? this.mapLines(dto.lines) : undefined,
      updatedAt: new Date(),
    };
    return this.repository.update(id, payload);
  }

  remove(id: Opportunity['id']): Promise<void> {
    return this.repository.remove(id);
  }

  private mapLines(dtos?: OpportunityLineDto[]): OpLine[] | undefined {
    if (!dtos) return undefined;
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

  private mapParticipants(dtos?: OpportunityCompanyDto[]): OpportunityCompany[] | undefined {
    if (!dtos) return undefined;
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
