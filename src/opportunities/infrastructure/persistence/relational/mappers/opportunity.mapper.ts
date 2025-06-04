import { Opportunity } from '@opportunities/domain/opportunity';
import { OpportunityEntity } from '@opportunities/infrastructure/persistence/relational/entities/opportunity.entity';
import { OpportunityCompany } from '@opportunities/domain/opportunity-company';
import { OpportunityCompanyEntity } from '@opportunities/infrastructure/persistence/relational/entities/opportunity-company.entity';
import { OpportunityLineEntity } from '@opportunities/infrastructure/persistence/relational/entities/opportunity-line.entity';
import {
  OpLine,
  ReverseFactoringLine,
  FactoringLine,
  CreditInsuranceLine,
} from '@opportunities/domain/op-line';
import { Commission } from '@opportunities/domain/commission';
import { CommissionEntity } from '../entities/commission.entity';

export class OpportunityMapper {
  static toDomain(entity: OpportunityEntity): Opportunity {
    const o = new Opportunity();
    o.id = entity.id;
    o.name = entity.name;
    o.type = entity.type as any;
    o.status = entity.status as any;
    o.createdAt = entity.createdAt;
    o.updatedAt = entity.updatedAt;
    o.signedAt = entity.signedAt ?? undefined;
    o.description = entity.description ?? undefined;
    o.totalEstimatedAmount = entity.totalEstimatedAmount ?? undefined;
    o.participants =
      entity.participants?.map((p) => this.companyToDomain(p)) ?? [];
    o.lines = entity.lines?.map((l) => this.lineToDomain(l)) ?? [];
    o.commissions =
      entity.commissions?.map((c) => this.commissionToDomain(c)) ?? [];
    return o;
  }

  static toPersistence(domain: Opportunity): OpportunityEntity {
    const e = new OpportunityEntity();
    if (domain.id) e.id = domain.id;
    e.name = domain.name;
    e.type = domain.type;
    e.status = domain.status;
    e.createdAt = domain.createdAt;
    e.updatedAt = domain.updatedAt;
    e.signedAt = domain.signedAt;
    e.description = domain.description;
    e.totalEstimatedAmount = domain.totalEstimatedAmount;
    e.participants = domain.participants?.map((p) =>
      this.companyToPersistence(p),
    );
    e.lines = domain.lines?.map((l) => this.lineToPersistence(l));
    e.commissions = domain.commissions?.map((c) =>
      this.commissionToPersistence(c),
    );
    return e;
  }

  private static companyToDomain(
    e: OpportunityCompanyEntity,
  ): OpportunityCompany {
    const c = new OpportunityCompany();
    c.id = e.id;
    c.opportunityId = e.opportunity?.id;
    c.companyId = e.companyId;
    c.role = e.role as any;
    c.addedAt = e.addedAt;
    c.participationStatus = e.participationStatus as any;
    c.contactIds = e.contactIds ?? undefined;
    return c;
  }

  private static companyToPersistence(
    d: OpportunityCompany,
  ): OpportunityCompanyEntity {
    const e = new OpportunityCompanyEntity();
    if (d.id) e.id = d.id;
    if (d.opportunityId) e.opportunity = { id: d.opportunityId } as any;
    e.companyId = d.companyId;
    e.role = d.role;
    e.addedAt = d.addedAt;
    e.participationStatus = d.participationStatus;
    e.contactIds = d.contactIds;
    return e;
  }

  private static lineToDomain(e: OpportunityLineEntity): OpLine {
    switch (e._type) {
      case 'ReverseFactoringLine':
        const r = new ReverseFactoringLine();
        r.id = e.id;
        r.opportunityId = e.opportunity?.id;
        r.buyerId = e.buyerId!;
        r.supplierId = e.supplierId!;
        return r;
      case 'CreditInsuranceLine':
        const c = new CreditInsuranceLine();
        c.id = e.id;
        c.opportunityId = e.opportunity?.id;
        c.insurerId = e.insurerId!;
        return c;
      default:
        const f = new FactoringLine();
        f.id = e.id;
        f.opportunityId = e.opportunity?.id;
        f.factorId = e.factorId!;
        return f;
    }
  }

  private static lineToPersistence(d: OpLine): OpportunityLineEntity {
    const e = new OpportunityLineEntity();
    if (d.id) e.id = d.id;
    if (d.opportunityId) e.opportunity = { id: d.opportunityId } as any;
    e._type = d._type;
    if ('buyerId' in d) e.buyerId = (d as any).buyerId;
    if ('supplierId' in d) e.supplierId = (d as any).supplierId;
    if ('factorId' in d) e.factorId = (d as any).factorId;
    if ('insurerId' in d) e.insurerId = (d as any).insurerId;
    return e;
  }

  private static commissionToDomain(e: CommissionEntity): Commission {
    const c = new Commission();
    c.id = e.id;
    c.opportunityId = e.opportunity?.id;
    c.introducerCompanyId = e.introducerCompanyId;
    c.payerCompanyId = e.payerCompanyId;
    c.amountFixed = e.amountFixed ?? undefined;
    c.percentage = e.percentage ?? undefined;
    c.conditions = e.conditions ?? undefined;
    c.createdAt = e.createdAt;
    c.paidAt = e.paidAt ?? undefined;
    c.status = e.status as any;
    return c;
  }

  private static commissionToPersistence(d: Commission): CommissionEntity {
    const e = new CommissionEntity();
    if (d.id) e.id = d.id;
    if (d.opportunityId) e.opportunity = { id: d.opportunityId } as any;
    e.introducerCompanyId = d.introducerCompanyId;
    e.payerCompanyId = d.payerCompanyId;
    e.amountFixed = d.amountFixed;
    e.percentage = d.percentage;
    e.conditions = d.conditions;
    e.createdAt = d.createdAt;
    e.paidAt = d.paidAt;
    e.status = d.status;
    return e;
  }
}
